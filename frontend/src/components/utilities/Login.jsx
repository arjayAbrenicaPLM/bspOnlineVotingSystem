import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async(e) => {
    e.preventDefault()
    try {

      const body = { email, password }

      const response = await axios.post(`http://localhost:5000/auth/login`, body)

      if (response.status === 201){
        const user = response.data
        window.localStorage.setItem("token", user.token)
        window.localStorage.setItem("role", user.role)
        if(user.role !== "Voting Delegate"){
          window.location.href = "/dashboard";
        }
        else if(user.role === "Voting Delegate"){
          window.location.href = "/voting";
        }
      }

    } catch (error) {
      const err = error.response.data.message
      toast.error(err, { duration: 2500 })
      localStorage.removeItem("role")
      localStorage.removeItem("token")
    }
  }

  return (
    <div>
      <Toaster />
      <div className="bg-bspgreen/20 bg-[url('/login.jpg')] bg-blend-soft-light bg-center bg-cover h-screen w-full">
        <div className='grid h-screen'>
          <div className='px-8 py-2 grid place-self-center bg-white/70 rounded-sm'>
            <img src='bspLogo.png' className='h-64 place-self-center'/>
            <h1 className='font-bold text-3xl text-green-900 justify-self-center'>BSP Online Voting System</h1>
            <form className='fieldset p-4 rounded-box'>
              
              <input type="email" name='email' className="input validator rounded-none border-green-900 border-2" placeholder="Email"
              value={email} onChange={e => onChange(e)} />
              
              <input type={showPassword ? "text" : "password"} name="password" required className="input rounded-none border-green-900 border-2" placeholder="Password"
              value={password} onChange={e => onChange(e)}/>

              <label className="fieldset-label mt-2 text-black hover:text-green-900">
                <input type="checkbox" className="checkbox rounded-none border-green-900" onChange={() => setShowPassword(!showPassword)}/>
                Show Password
              </label>

              <span className='text-black italic mt-2 hover:text-green-900 hover:cursor-pointer'>Forgot Password? Reset Here</span>

              <button className='btn w-80 rounded-none border-green-900 bg-white border-1 mt-2 hover:bg-green-900 hover:text-white' onClick={e => onSubmitForm(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login