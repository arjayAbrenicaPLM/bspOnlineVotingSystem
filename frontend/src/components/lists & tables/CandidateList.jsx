import React, {useState} from 'react'
import { FaRegCheckCircle } from "react-icons/fa"

function CandidateList({candidates, clickCheckbox, voteStatus}) {

  const [status, setStatus] = useState({})

  const clickCandidate = (name, region) => {
    const full = clickCheckbox(name, region)
    if (!full){
      setStatus((prev) => ({
        ...prev,
        [name]: !prev[name],
      }))
    }
  }

  return (
    <>
      <ul className="list gap-2">
      {candidates && candidates.length > 0 ? (
        candidates.map((person, index) => (
          <li key={index} className='grid w-85'>
            {
            status[person.candidate_name] ? 
            <button className={`btn relative bg-white rounded-none h-fit py-2 border-green-900 border-1 
              ${voteStatus ? "btn-disabled opacity-40" : ""}`} onClick={() => clickCandidate(person.candidate_name, person.candidate_region)}>
              <div className='absolute z-10'>
                <FaRegCheckCircle className='justify-self-center font-bold text-5xl'/> SELECTED
              </div>
              <div className='opacity-20 w-full'>
                <div className='grid grid-cols-[30%_70%] '>
                  <div className="avatar w-fit justify-content-center">
                    <div className="w-20 rounded-full border-black border-1">
                      <img src={`/candidatepictures/${person.candidate_name}.jpg`}/>
                    </div>
                  </div>
                  <div className='grid'>
                    <div className='font-semibold self-end text-green-900'>{person.candidate_name}</div>
                    <div className='font-normal text-green-900'>{`${person.candidate_region} CO`}</div>
                  </div>
                </div>
              </div>
            </button>:
            <button className={`btn bg-white rounded-none h-fit grid grid-cols-[30%_70%] py-2 
              ${voteStatus ? "btn-disabled opacity-40" : ""}`} onClick={() => clickCandidate(person.candidate_name, person.candidate_region)}>
              <div className="avatar w-fit justify-content-center">
                <div className="w-20 rounded-full border-black border-1">
                  <img src={`/candidatepictures/${person.candidate_name}.jpg`}/>
                </div>
              </div>
              <div className='grid justify-center'>
                <div className='font-semibold'>{person.candidate_name}</div>
                <div className='font-normal'>{`${person.candidate_region} CO`}</div>
              </div>
            </button>
            }
          </li>
        ))
        ) : ( <></> )}
      </ul> 
    </>
    
  )
}

export default CandidateList