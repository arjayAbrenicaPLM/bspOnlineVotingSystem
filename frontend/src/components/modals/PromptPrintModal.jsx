import React from 'react'
import logOut from '../functions/Logout.js'
import { LiaVoteYeaSolid } from "react-icons/lia"

function PromptPrintModal({showPrint, setAuth}) {
  return (
    <dialog id="promptPrintModal" className="modal">
        <div className="modal-box grid bg-white rounded-sm ">
          <LiaVoteYeaSolid className='text-[5rem] place-self-center text-green-900'/>
          <h3 className="font-bold text-2xl text-center text-green-900 mb-4">THANK YOU FOR VOTING!</h3>
          <p className='text-center text-green-900'>Lorem ipsum dolor sit amet consectetur. Fermentum quam commodo proin nunc porttitor sed molestie porttitor. Quam diam phasellus pretium sed eget et quisque. Dolor sed commodo commodo suscipit at ac tellus metus. Scelerisque vitae feugiat magna enim fermentum.</p>
          <div className="modal-action">
            <form method="dialog" className='grid grid-cols-2 gap-2 w-full'>
              <button className="btn place-self-end rounded-none w-50 border-green-900 bg-white border-1 text-green-900 hover:bg-green-900 hover:text-white"  onClick={() => showPrint()}>Download PDF</button>
              <button className="btn rounded-none w-50 border-green-900 bg-white border-1 text-green-900 hover:bg-green-900 hover:text-white" onClick={() => logOut(setAuth, "Logging Out...")}>Logout</button>
            </form>
          </div>
        </div>
      </dialog>
  )
}

export default PromptPrintModal