import React, { useState } from 'react'

function AddUserModal({handleSubmitUser}) {
  const [showPassword, setShowPassword] = useState(false)
  const [userRole, setUserRole] = useState(true)

  const userRoleChange = () => {
    const role_field = document.getElementById("user_role")
    const role = role_field.value

    role !== "Admin" ? setUserRole(true) : setUserRole(false)
  }
  return (
    <dialog id="usersModal" className="modal gap-2">
      <div className="bg-white rounded-2xl p-4 border border-black">
        <fieldset className="fieldset w-xs p-4 rounded-box pt-2">
          
          <h1 className='font-bold text-2xl'>Add User</h1>

          <label className="fieldset-label">Name</label>
          <input type="text" id='user_name' className="input text-black bg-base-200" placeholder="Name" />

          <label className="fieldset-label">Email</label>
          <input type="email" id='user_email' className="input validator text-black bg-base-200" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type={showPassword ? "text" : "password"} id='user_password' className="input text-black bg-base-200" placeholder="Password" />

          <label className="fieldset-label mt-2">
            <input type="checkbox" className="checkbox rounded-none" onChange={() => setShowPassword(!showPassword)}/>
            Show Password
          </label>
          
          <label className="fieldset-label">Role</label>
          <select defaultValue="Voting Delegate" className="select bg-base-200" id='user_role' onChange={() => userRoleChange()}>
            <option>Voting Delegate</option>
            <option>Admin</option>
            <option>Election Committee</option>
          </select>
          
          <div className={!userRole ? 'hidden' : ''}>
            <label className="fieldset-label">Region</label>
            <select defaultValue="NCR" className="select bg-base-200" id='region'>
              <option>NCR</option>
              <option>NELR</option>
              <option>EMR</option>
            </select>
          </div>
          
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-success mr-2" onClick={()=> handleSubmitUser()}>Submit</button>
            <button className="btn btn-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default AddUserModal