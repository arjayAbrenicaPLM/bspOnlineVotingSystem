import React, { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import toast, {Toaster} from 'react-hot-toast'
import { FaCalendar } from "react-icons/fa"
import { IoSearchSharp } from "react-icons/io5"
import { GrPowerReset } from "react-icons/gr"

function Voters({setAuth}) {

  const [chartData, setChartData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [confirmRemove, setConfirmRemove] = useState(false)

  const getVoters = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/voters`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      setChartData(response.data)
    } catch (error) {
      console.log(error.message)
      if (error.message === "jwt expired"){
        logOut(setAuth)
      }
    }
  }

  const resetVote = async (uid) => {
    try {
      const response = await axios.put(`http://localhost:5000/reset_vote`, {uid},
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
      
      if (response.status === 200){
        getVoters()
        getRatio()
      }

    } catch (error) {
      console.log(error.message)
    }
  } 
  
  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value)
  }

  const fetchFilteredData = async () => {
    try {
      if (!searchTerm) {
        getVoters()
      } else {
        const response = await axios.get(
          `http://localhost:5000/voter/search?q=${searchTerm}`,
          {headers:{
            token: localStorage.getItem("token")
          }}
        )
        setChartData(response.data)
      }
    } catch (error) {
      console.error('Error fetching filtered data:', error)
    }
  }
  
  const removeVoter = async (uid) => {
    document.getElementById("removeModal").showModal()
    if(confirmRemove){
      try {
        const response = await axios.delete(`http://localhost:5000/remove_vote`, 
          { data: {uid},
            headers:{
            token: localStorage.getItem("token")
          }}
        )
      
        if (response.status === 201){
          try {
            const response = await axios.delete(`http://localhost:5000/remove_vote`, 
            { data: {uid},
              headers:{
              token: localStorage.getItem("token")
            }})
          } catch (error) {
            const err = error.response.data.message
            toast.error(err, {duration: 2500})
          }
          toast.success(response.data.message, {duration: 2500})
          getVoters()
        }
  
      } catch (error) {
        const err = error.response.data.message
        toast.error(err, {duration: 2500})
      }
    }
  }

  useEffect(() => {
    getVoters()
  }, [])
  
  useEffect(() => {
    fetchFilteredData()
  }, [searchTerm])
  
  return (
    <div className='p-5 h-screen relative ml-64'>
      <Toaster />
      <div className="absolute inset-0 bg-[url('/bspLogo.png')] bg-center bg-auto opacity-30 bg-no-repeat -z-10"></div>
      <div className='grid grid-rows-[10%_90%] h-full gap-2'>
        {/* Role & Clock */}
        <div>
          <h1 className='text-green-900 font-bold text-2xl'>VOTERS LIST</h1>
          <div className='grid grid-cols-2'>
            <div className='bg-green-900 font-bold rounded-md w-fit text-white p-1 px-2 flex items-center gap-2'><FaCalendar />12 March 2025</div>
            
            <div className='flex gap-2 justify-end'>
              <label className='input input-bordered border-green-900 text-green-900 shadow-black/50 shadow-sm focus-within:outline-green-900
                                flex items-center gap-2'>
                <input type="search" className="grow" placeholder="Search" onChange={e => handleSearchChange(e)}/> <IoSearchSharp />
              </label>
            </div>
          </div>
        </div>

        {/* Voting Stats */}
        <div className='p-2 w-full overflow-y-auto'>
          <table className="table">
            <thead className='shadow-black/50 text-lg bg-darkgreen text-white text-center sticky'>
              <tr>
                <th className='rounded-tl-xl'>Name</th>
                <th>Email</th>
                <th>Council</th>
                <th className='rounded-tr-xl'>Reset Vote</th>
              </tr>
            </thead>
            <tbody>
              {chartData && Object.keys(chartData).length > 0 ? (
              Object.keys(chartData).map((key) => {
                return chartData[key].map((person, index) => {
                  return (
                      <tr key={`${key}-${index}`} className='text-center text-xl font-bold text-darkgreen bg-bspgreen/20'>
                        <td className='h-auto'>{person.voter_name}</td>
                        <td className='h-auto w-200'>{person.user_email}</td>
                        <td className='h-auto'>{person.region}CO</td>
                        <td className='h-auto place-items-center'>
                          <button className={clsx('btn btn-outline rounded-sm h-auto text-2xl border-darkred border-3 text-darkred hover:bg-darkred hover:text-white',
                            {
                              'btn-disabled border-none btn-ghost text-gray-600' :!person.has_voted
                            }
                            )} onClick={() => resetVote(person.user_id)}>
                            <GrPowerReset />
                          </button>
                        </td>
                      </tr>
                  )
                })
              })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="removeModal" className="modal gap-2">
        <div className="bg-white p-4 border border-black">
          <h1 className='font-bold text-xl mb-4'>Confirm Removal</h1>
          <p>Are you sure you want to remove this voter?</p>
          <div className="modal-action">
            <form method="dialog">
            <button className="btn btn-outline border-0 rounded-none text-red-500 mr-2 hover:bg-red-500 hover:border-1 hover:text-white">CANCEL</button>
              <button className="btn btn-outline border-0 rounded-none text-red-500 hover:bg-red-500 hover:border-1 hover:text-white" onClick={() => setConfirmRemove(true)}>CONFIRM</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Voters