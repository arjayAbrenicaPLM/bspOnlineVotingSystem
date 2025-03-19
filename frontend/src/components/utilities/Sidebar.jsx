import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdOutlineBarChart, MdPeopleAlt, MdSettings, MdManageAccounts } from "react-icons/md"
import { BsClipboard2CheckFill } from "react-icons/bs"
import logOut from '../functions/Logout.js'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

function Sidebar() {

  const [name, setName] = useState()

  const role  = window.localStorage.getItem("role")

  useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      setName(response.data.user[0].user_name)
    } catch (error) {
      console.log(error.response.data.message)
      if (error.response.status === 403){
        logOut(setAuth)
        toast.error("Session Expired. Logging Out...", {duration: 2500})
      }
    }
  }

  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 mt-18 z-20 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="w-full bg-[url('/voter.jpg')] bg-green-900/50 bg-blend-soft-light bg-center bg-cover p-4">
        <div className="avatar">
          <div className="w-20 rounded-full skeleton">
          </div>
        </div>
        <h1 className='text-white font-bold text-xl -tracking-[0.0125em]'>{name}</h1>
        <h1 className='text-white  tracking-tight'>{role}</h1>
      </div>
      <div className="h-full py-4 overflow-y-auto bg-green-900">
          <ul className="grid gap-1">
            <li>
              <NavLink to="/dashboard" className={({isActive}) =>`flex items-center p-2 pl-4 gap-2 mr-2 rounded-r-box
                ${isActive ? 'bg-white text-green-900 shadow-md shadow-black/50' : 'bg-none text-white hover:text-green-900 hover:bg-white/90'}`}>
                  <MdDashboard />Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/statistics" className={({isActive}) =>`flex items-center p-2 pl-4 gap-2 mr-2 rounded-r-box
                ${isActive ? 'bg-white text-green-900 shadow-md shadow-black/50' : 'bg-none text-white hover:text-green-900 hover:bg-white/90'}`}>
                  <MdOutlineBarChart />Voting Statistics
              </NavLink>
            </li>
            {
                role === "Admin" ?  
                <li>
                  <NavLink to="/voters" className={({isActive}) =>`flex items-center p-2 pl-4 gap-2 mr-2 rounded-r-box
                    ${isActive ? 'bg-white text-green-900 shadow-md shadow-black/50' : 'bg-none text-white hover:text-green-900 hover:bg-white/90'}`}>
                      <MdManageAccounts />Voter Management
                  </NavLink>
                </li>
                :
                <></>
            }
            <li>
              <NavLink to="/candidates" className={({isActive}) =>`flex items-center p-2 pl-4 gap-2 mr-2 rounded-r-box
                ${isActive ? 'bg-white text-green-900 shadow-md shadow-black/50' : 'bg-none text-white hover:text-green-900 hover:bg-white/90'}`}>
                  <MdPeopleAlt />Candidate {role === "Admin" ? "Management" : "List"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/results" className={({isActive}) =>`flex items-center p-2 pl-4 gap-2 mr-2 rounded-r-box
                ${isActive ? 'bg-white text-green-900 shadow-md shadow-black/50' : 'bg-none text-white hover:text-green-900 hover:bg-white/90'}`}>
                  <BsClipboard2CheckFill />Election Results
              </NavLink>
            </li>
            {
                role === "Admin" ?  
                <li>
                  <NavLink to="/settings" className={({isActive}) =>`flex items-center p-2 pl-4 gap-2 mr-2 rounded-r-box
                    ${isActive ? 'bg-white text-green-900 shadow-md shadow-black/50' : 'bg-none text-white hover:text-green-900 hover:bg-white/90'}`}>
                      <MdSettings  />System Settings
                  </NavLink>
                </li>
                :
                <></>
            }
          </ul>
      </div>
    </aside>
  )
}

export default Sidebar