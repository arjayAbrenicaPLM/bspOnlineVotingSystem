import React from 'react'
import clsx from 'clsx'

function VoterList({voters, resetVote}) {

  const sentenceCase = (voteStatus) => {
    return voteStatus.charAt(0).toUpperCase() + voteStatus.slice(1)
  }

  return (
    <div className='p-5'>
      <ul className="list bg-base-100 rounded-box shadow-md gap-2 p-5 h-fit border-bspgreen border-1">
        <li className='list-row font-bold'>
          <div className='list-col-grow self-center text-center'>Voter Name</div>
          <div className='w-25 text-center self-center'>Voter Region</div>
          <div className='w-40 text-center self-center'>Email</div>
          <div className='w-25 text-center self-center'>Voting Status</div>
          <div className='w-25 text-center self-center'>Remove Vote</div>
        </li>
        {voters && Object.keys(voters).length > 0 ? (
          Object.keys(voters).map((key) => {
            return voters[key].map((person, index) => {
              return (
                  <li key={`${key}-${index}`} className="list-row">
                    <div className='list-col-grow self-center text-center'>{person.voter_name}</div>
                    <div className='w-25 text-center self-center'>{person.region}</div>
                    <div className='w-40 text-center self-center'>{person.user_email}</div>
                    <div className='w-25 text-center self-center'>{sentenceCase(person.has_voted.toString())}</div>
                    <button className={clsx('btn btn-outline border-bspgreen w-25 rounded-none hover:bg-bspgreen hover:text-white',
                      {
                        'btn-disabled' : !person.has_voted
                      }
                    )} onClick={(e) => resetVote(person.user_id)}>Reset Vote</button>
                  </li>
              )
            })
          })
        ) : (
          <li className='text-center list-row'>
            <div className='list-col-grow'>No Voters</div>
          </li>
        )}
      </ul> 
    </div>
  )
}

export default VoterList