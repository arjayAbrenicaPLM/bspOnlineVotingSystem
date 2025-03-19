import React from 'react'

function AddCandidateModal({handleSubmitCandidate}) {
  return (
    <dialog id="candidatesModal" className="modal gap-2">
      <div className="bg-white rounded-2xl p-4 border border-black">
        <fieldset className="fieldset w-xs p-4 rounded-box pt-2">
          
          <h1 className='font-bold text-2xl'>Add Candidate</h1>

          <label className="fieldset-label">First Name</label>
          <input type="text" id='first_name' className="input text-black bg-base-200" placeholder="First Name" />

          <label className="fieldset-label">Last Name</label>
          <input type="text" id='last_name' className="input text-black bg-base-200" placeholder="Last Name" />

          <label className="fieldset-label">Middle Name</label>
          <input type="text" id='middle_name' className="input text-black bg-base-200" placeholder="Middle Name" />
          
          <label className="fieldset-label">Candidate Region</label>
          <select defaultValue="NCR" className="select bg-base-200" id='candidate_region'>
            <option>NCR</option>
            <option>NELR</option>
            <option>WMR</option>
          </select>
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-success mr-2" onClick={()=> handleSubmitCandidate()}>Submit</button>
            <button className="btn btn-error">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default AddCandidateModal