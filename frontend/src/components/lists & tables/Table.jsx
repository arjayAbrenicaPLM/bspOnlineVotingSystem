import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import RemoveModal from '../modals/RemoveModal'

function Table({tableData, type, getData}) {

  const role  = window.localStorage.getItem("role")
  const [removeID, setRemoveID] = useState()

  const openModal = (uid) => {
    setRemoveID(uid)
    document.getElementById("removeModal").showModal()
  }

  const removeFromList = async() => {
    try {
      const uid = removeID
      const response = await axios.delete(`http://localhost:5000/remove_${type}`, 
        { data: {uid},
          headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      if (response.status === 201){
        toast.success(response.data.message, {duration: 2500})
        getData()
      }

    } catch (error) {
      const err = error.response.data.message
      toast.error(err, {duration: 2500})
    }
  }

  return (
    <>
      <Toaster />
      <div className='h-screen overflow-y-auto mt-4'>
        <table className="table table-pin-rows">
          <thead>
            <tr className='text-lg bg-darkgreen text-white text-center sticky'>
            {
              type === "candidate" ?
              <>
                <th className='w-fit rounded-tl-xl'>Photo</th>
                <th className='w-200'>Candidate Name</th>
                <th className={`${role !== "Admin" ? 'rounded-tr-xl' : ''}`}>Candidate Region</th>
                {
                  role === "Admin" ? <th className='rounded-tr-xl'>Remove Candidate</th>
                  : <></>
                }
                
              </>
              :
              <>
                <th className='rounded-tl-xl'>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Region</th>
                <th className='rounded-tr-xl'>Remove User</th>
              </>
            }
            </tr>
          </thead>
          <tbody>
            {tableData && Object.keys(tableData).length > 0 ? (
              Object.keys(tableData).map((key) => {
                return tableData[key].map((person, index) => {
                  return (
                      <tr key={`${key}-${index}`} className='text-center text-xl font-bold text-darkgreen bg-bspgreen/20'>
                        {
                          type === "candidate" ?
                          <>
                            <td className='w-fit'>
                              <div className="avatar w-fit justify-content-center">
                                <div className="w-24 rounded-full border-darkgreen border-1">
                                  <img src={`/candidatepictures/${person.candidate_name}.jpg`}/>
                                </div>
                              </div>
                            </td>
                            <td className='w-200'>{person.candidate_name}</td>
                            <td>{person.candidate_region}CO</td>
                            {
                              role === "Admin" ? 
                              <td>
                                <button className='btn btn-outline rounded-sm text-2xl border-darkred border-3 text-darkred hover:bg-darkred hover:text-white' onClick={() => openModal(person.candidate_id)}>
                                  X
                                </button>
                              </td>
                              : <></>
                            }
                            
                          </>
                          :
                          <>
                            <td>{person.user_name}</td>
                            <td>{person.user_email}</td>
                            <td>{person.user_role}</td>
                            <td>{person.region ? person.region : "-"}</td>
                            <td>
                              <button className='btn btn-outline rounded-sm text-2xl border-darkred border-3 text-darkred hover:bg-darkred hover:text-white' onClick={() => openModal(person.user_id)}>
                                X
                              </button>
                            </td>
                          </>
                        }
                      </tr>
                  )
                })
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RemoveModal type={type} removeFromList={removeFromList} />
    </>
  )
}

export default Table