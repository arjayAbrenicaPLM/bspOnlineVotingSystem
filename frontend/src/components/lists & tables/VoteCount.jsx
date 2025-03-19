import React from 'react'

function VoteCount({ratio}) {
  return (
  <div>
    <h1 className='font-bold text-2xl justify-self-center h-fit my-4'>
      % of Finished Voters
    </h1>
    <div className='grid'>
      <div
        className="radial-progress bg-bspgreen text-white border-bspgreen font-bold text-2xl
        border-4 justify-self-center"
        style={{ "--value": ratio, "--size": "11rem", "--thickness": "1rem"}} aria-valuenow={ratio} role="progressbar">
        {ratio}%
      </div>
    </div>
  </div>
  )
}

export default VoteCount