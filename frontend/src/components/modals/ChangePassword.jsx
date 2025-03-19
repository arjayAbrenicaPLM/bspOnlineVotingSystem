import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false)

  const handleChangePassword = async () => {
    const old_password = document.getElementById("old_password")
    const new_password = document.getElementById("new_password")
    const confirm_password = document.getElementById("confirm_password")

    const oldPass = old_password.value
    const newPass = new_password.value
    const confirmPass = confirm_password.value

    const data = {oldPass, newPass, confirmPass}

    try {
      const response = await axios.post(`http://localhost:5000/auth/changePassword`, data,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
  
      if (response.status >= 201){
        const message = response.data.message
        toast.success(message, { duration: 2500 })
      }
    } catch (error) {
      const err = error.response.data.message
      toast.error(err, { duration: 2500 })
    }
  } 

  return (
    <>
      <Toaster />
      <dialog id="passwordModal" className="modal gap-2">
      <div className="bg-white rounded-2xl p-4 border border-black">
        <fieldset className="fieldset w-xs p-4 rounded-box pt-2">
          
          <h1 className='font-bold text-2xl text-black'>Change Password</h1>

          <label className="fieldset-label">Old Password</label>
          <input type={showPassword ? "text" : "password"} id='old_password' className="input text-black bg-base-200" placeholder="Old Password" />

          <label className="fieldset-label">New Password</label>
          <input type={showPassword ? "text" : "password"} id='new_password' className="input text-black bg-base-200" placeholder="New Password" />

          <label className="fieldset-label">Confirm Password</label>
          <input type={showPassword ? "text" : "password"} id='confirm_password' className="input text-black bg-base-200" placeholder="Confirm Password" />

          <label className="fieldset-label mt-2">
            <input type="checkbox" className="checkbox rounded-none" onChange={() => setShowPassword(!showPassword)}/>
            Show Password
          </label>
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-success mr-2" onClick={() => handleChangePassword()}>Submit</button>
            <button className="btn btn-error">Close</button>
          </form>
        </div>
        </div>
      </dialog>
    </>
  )
}

export default ChangePassword