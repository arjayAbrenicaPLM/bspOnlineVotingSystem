import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../lists & tables/Table'
import AddCandidateModal from '../modals/AddCandidateModal'
import toast, { Toaster } from 'react-hot-toast'
import { IoSearchSharp } from "react-icons/io5"
import { FaCalendar } from "react-icons/fa"

function Candidates({setAuth}) {

  const role  = window.localStorage.getItem("role")

  const [searchTerm, setSearchTerm] = useState('')
  const [chartData, setChartData] = useState(null)

  const openCandidateModal = () => {
    document.getElementById('candidatesModal').showModal()
  }

  const getCandidates = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/candidates`,
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

  const handleSubmitCandidate = async () => {
    const first_name_field = document.getElementById("first_name")
    const last_name_field = document.getElementById("last_name")
    const middle_name_field = document.getElementById("middle_name")
    const region_field = document.getElementById("candidate_region")

    const first_name = first_name_field.value
    const last_name = last_name_field.value
    const middle_name = middle_name_field.value
    const region = region_field.value

    const name = last_name.toUpperCase() + ", " + first_name.toUpperCase() + 
                 (middle_name ? " " + middle_name.charAt(0).toUpperCase() + "." : "")

    const data = {name, region}
    
    try {
      const response = await axios.post(`http://localhost:5000/new_candidate`, data,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      if (response.status === 201){
        toast.success(response.data.message, {duration: 2500})
      }

      getCandidates()
    } catch (error) {
      const err = error.response.data.message
      toast.error(err, {duration: 2500})
    }
  }

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value)
  }

  const fetchFilteredData = async () => {
    try {
      if (!searchTerm) {
        getCandidates()
      } else {
        const response = await axios.get(
          `http://localhost:5000/candidate/search?q=${searchTerm}`,
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

  useEffect(() => {
    getCandidates()
  },[])

  useEffect(() => {
    fetchFilteredData()
  }, [searchTerm])

  
  return (
    <div className='p-5 relative h-screen ml-64'>
      <Toaster />
      <div className="absolute inset-0 bg-[url('/bspLogo.png')] bg-center bg-auto opacity-30 bg-no-repeat -z-10 h-full"></div>
      <div className='grid grid-rows-[10%_90%] h-full gap-2'>

        {/* Page, Clock, Search, & Add */}
        <div>
          <h1 className='text-green-900 font-bold text-2xl'>OFFICIAL CANDIDATES LIST</h1>
          <div className='grid grid-cols-2'>
            <div className='bg-green-900 font-bold rounded-md w-fit text-white p-1 px-2 flex items-center gap-2'><FaCalendar />12 March 2025</div>
            
            <div className='flex gap-2 justify-end'>
              <label className='input input-bordered border-green-900 text-green-900 shadow-black/50 shadow-sm focus-within:outline-green-900
                                flex items-center gap-2'>
                <input type="search" className="grow" placeholder="Search" onChange={e => handleSearchChange(e)}/> <IoSearchSharp />
              </label>
              { role === "Admin" ? <button className='btn btn-outline border-green-900 bg-green-900 text-white rounded-md shadow-black/50 shadow-sm
                                                hover:bg-white hover:text-green-900'onClick={()=> openCandidateModal()}>Add Candidate</button> : <> </> }
            </div>
          </div>
        </div>

        <div>
          <Table tableData={chartData} type="candidate" getData={fetchFilteredData} className='mt-7' />
        </div>
      
      <AddCandidateModal handleSubmitCandidate={handleSubmitCandidate} /> 
      </div>
    </div>
  )
}

export default Candidates