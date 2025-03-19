import React from 'react'
import { Link } from 'react-router-dom'
import ChangePassword from '../modals/ChangePassword'
import logOut from '../functions/Logout.js'
import clsx from 'clsx'
//import { useName } from './NameContext'

function Navbar({setAuth, name}) {

  const role  = window.localStorage.getItem("role")

//  const [selectedName] = useName()

  const changePassword = () => {
    document.getElementById('passwordModal').showModal()
  }

  return (
    <div className={clsx('navbar sticky top-0 z-10 shadow-black/50 shadow-lg ',{
      'bg-green-900 text-white' : role === "Voting Delegate",
      'bg-white text-green-900' : role !== "Voting Delegate",
    })}>
      <div className="navbar-start pl-4">
        <img src='bspLogo.png' className='h-14'/>
        <span className='font-bold text-2xl'> BSP Online Voting System </span>
      </div>

      <div className="navbar-end gap-2">
        {/* Voting Page */}
        { role === "Voting Delegate" ? 
          <Link to='/ballot' className="btn rounded-none btn-outline hover:bg-white hover:text-green-900 hover:border-green-900"> Voting </Link>
          :
          <></>
        }
        <button onClick={() => logOut(setAuth, "Logging Out...")} className={clsx('btn rounded-none btn-outline',
          {
            'hover:bg-green-900 hover:text-white' : role !== "Voting Delegate",
            'hover:bg-white hover:text-green-900' : role === "Voting Delegate"
          }
        )}>Logout</button>
      </div>

      <ChangePassword />
      

    </div>
  )
}

export default Navbar