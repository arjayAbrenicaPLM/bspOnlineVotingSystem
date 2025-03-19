import React from 'react'
import { IoSaveSharp } from "react-icons/io5"
import BallotList from '../lists & tables/BallotList'

function PrintingModal({printRef, ballot, voteStatus, stubNum, region, donePrint}) {
  return (
    <dialog id="printModal" className="modal">
        <div className="modal-box p-3 grid">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div ref={printRef} className='px-3'>
            <div>
              <BallotList ballot={ballot} voteStatus={voteStatus} type="Official" stubNum={stubNum} region={region}/>
            </div>
            <hr className='border-t-1 border-dashed px-5'/>
            <div className='grid'>
              <h1 className='font-bold text-3xl h-fit justify-self-center mt-3'>
                Official Ballot
              </h1>
              <div className='justify-self-center'>
                <span className='text-black'> Stub No.: </span>
                <span className='text-red-500'> {stubNum} </span>
              </div>
            </div>
          </div>
          <button className='btn btn-outline mt-5 border-bspgreen border-1 justify-self-end hover:bg-bspgreen hover:text-white' onClick={() => donePrint()}> <IoSaveSharp /> Save as PDF</button>
        </div>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </dialog>
  )
}

export default PrintingModal