import React from 'react'
import clsx from 'clsx'

function BallotList({ballot, voteStatus, type, stubNum, region}) {

  let finalBallot
  if(voteStatus){
    finalBallot = ballot[0]
  } else {
    finalBallot = ballot[4]
  }
  
  return (
    <div className='p-2'>
      <h1 className={clsx('font-bold text-3xl h-fit justify-self-center my-4',
        {
          'underline' : type === "Official"
        }
      )}>
        {type === "Official" ? "Official Ballot" : "Ballot"}
      </h1>
      {
        type === "Official" ?
        <div className='px-5'>
          <div>
            <span className='text-black'> Stub No.: </span>
            <span className='text-red-500'> {stubNum} </span>
          </div>
          <p className='text-black font-bold'>REGION: {region}</p>
          <p className='text-black'>Number of Vote: 1</p>
        </div>
        : <></>
      }
      <ul className={clsx('list bg-base-100 rounded-box shadow-md gap-2 px-5 h-fit border-bspgreen border-1',
        {
          'border-white shadow-none' : type === "Official",

        })}>
        <li className='list-row font-bold'>
          <div className='list-col-grow'>Candidate Name</div>
          <div>Candidate Region</div>
        </li>
        {finalBallot && Object.keys(finalBallot).length > 0 ? (
          Object.keys(finalBallot).map((key) => {
            const votes = finalBallot[key]
            return(
            <li key={key} className="list-row">
              <div className='list-col-grow'>{votes.candidate_name}</div>
              <div>{votes.candidate_region}</div>
            </li>)
          })
        ) : (
          <li className='text-center list-row'>
            <div className='list-col-grow'>No Votes</div>
          </li>
        )}
      </ul> 
    </div>
  )
}

export default BallotList