import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../lists & tables/Table'
import AddUserModal from '../modals/AddUserModal'
import toast, { Toaster } from 'react-hot-toast'
import { IoSearchSharp } from "react-icons/io5"

function Users({setAuth}) {

  const [searchTerm, setSearchTerm] = useState('')
  const [chartData, setChartData] = useState(null)
  const [votingStart, setVotingStart] = useState(false)

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/all_data`,
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

  const openUsersModal = () => {
    document.getElementById('usersModal').showModal()
  }

  const handleSubmitUser = async () => {
    const name_field = document.getElementById("user_name")
    const email_field = document.getElementById("user_email")
    const password_field = document.getElementById("user_password")
    const role_field = document.getElementById("user_role")

    const name = name_field.value
    const email = email_field.value
    const password = password_field.value
    const role = role_field.value
    let region
    if (role !== "Admin"){
      const region_field = document.getElementById("region")
      region = region_field.value
    } else {
      region = null
    }

    const data = {name, email, password, role, region}

    try {
      const response = await axios.post(`http://localhost:5000/auth/register`, data,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      if (response.status === 201){
        toast.success(response.data.message, {duration: 2500})
      }
    
      getUsers()
    } catch (error) {
      const err = error.response.data.message
      console.log(error.response.data.error)
      toast.error(err, {duration: 2500})
    }
  } 

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value)
  }

  const fetchFilteredData = async () => {
    try {
      if (!searchTerm) {
        getUsers()
      } else {
        const response = await axios.get(
          `http://localhost:5000/user/search?q=${searchTerm}`,
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
    getUsers()
  },[])
  
  useEffect(() => {
    fetchFilteredData()
  }, [searchTerm])


  return (
    <div className='p-5 relative h-screen ml-64'>
    <Toaster />
    <div className="absolute inset-0 bg-[url('/bspLogo.png')] bg-center bg-auto opacity-30 bg-no-repeat -z-10 h-full"></div>
    <div className='grid grid-rows-[5%_13%_82%] h-full gap-2'>

      {/* Page, Clock, Search, & Add */}
      <h1 className='text-green-900 font-bold text-2xl'>SYSTEM SETTINGS</h1>

      <div className='grid grid-cols-2 self-end h-full'>
        <div className='bg-bspgreen/20 font-bold rounded-md w-[60%] text-white flex-col items-center gap-2'>
          <div className='bg-darkgreen w-full h-fit rounded-t-md pl-2' > ELECTION STATUS </div>
          <div>
            <div className="flex w-full items-center pb-3 mt-3 px-2">
              <div className="w-1/2 text-center">
                <h1 className='text-darkred text-4xl tracking-wider font-bold'>{votingStart ? "OPEN" : "CLOSED"}</h1>
              </div>
              <div className="divider divider-horizontal mx-0 before:bg-accentgreen/50 before:rounded-t-md after:bg-accentgreen/50 after:rounded-b-md"/>
              <div className="w-1/2">
                <button className='btn btn-block rounded-sm bg-white font-bold border-darkgreen border-1 text-2xl text-darkgreen hover:text-white hover:bg-darkgreen' onClick={() => setVotingStart(!votingStart)}>
                  {!votingStart ? "START" : "CLOSE"}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className='flex gap-2 justify-end self-end'>
          <label className='input input-bordered border-green-900 text-green-900 shadow-black/50 shadow-sm focus-within:outline-green-900
                            flex items-center gap-2'>
            <input type="search" className="grow" placeholder="Search" onChange={e => handleSearchChange(e)}/> <IoSearchSharp />
          </label>
          <button className='btn btn-outline border-green-900 bg-green-900 text-white rounded-md shadow-black/50 shadow-sm
                            hover:bg-white hover:text-green-900' onClick={()=> openUsersModal()}>
                              Add User</button>
        </div>
      </div>

      <div>
        <Table tableData={chartData} type="User" getData={fetchFilteredData} className='mt-7' />
      </div>
    
      <AddUserModal handleSubmitUser={handleSubmitUser} /> 
    </div>
  </div>
  )
}

export default Users