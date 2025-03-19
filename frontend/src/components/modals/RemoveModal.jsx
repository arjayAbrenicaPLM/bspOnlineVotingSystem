import React from 'react'

function RemoveModal({type, removeFromList}) {
  return (
    <dialog id="removeModal" className="modal gap-2">
      <div className="bg-white rounded-2xl p-4">
        <div>
          <p className='text-black font-bold text-2xl mb-4'>Confirm Removal</p>
          <p>Are you sure you want to remove this {type.toLowerCase()}?</p>
        </div>
        
        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-transparent mr-2 rounded-none border-0 text-xl text-darkred font-bold hover:text-white hover:bg-darkred">CANCEL</button>
            <button className="btn bg-transparent rounded-none border-0 text-xl text-darkred font-bold hover:text-white hover:bg-darkred " onClick={()=> removeFromList()}>OK</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default RemoveModal