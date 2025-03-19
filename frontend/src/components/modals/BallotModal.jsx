import React from 'react'

function BallotModal({ballot1Data, ballot2Data, postBallot}) {
  return (
    <dialog id="ballotModal" className="modal">
        <div className="modal-box bg-white rounded-sm max-w-fit">
          <h3 className="font-bold text-2xl text-center text-green-900 mb-4">REVIEW VOTE</h3>
          <div className='grid grid-cols-2 gap-4'>
          <ul className="list gap-2">
            {ballot1Data && ballot1Data.length > 0 ? (
              ballot1Data.map((person, index) => (
                <li key={index} className='grid w-85'>
                  <div className='relative bg-white rounded-none h-fit p-2 border-green-900 border-1'>
                    <div className='grid grid-cols-[30%_70%] '>
                      <div className="avatar w-fit justify-content-center">
                        <div className="w-20 rounded-full border-black border-1">
                          <img src={`/candidatepictures/${person.name}.jpg`}/>
                        </div>
                      </div>
                      <div className='grid'>
                        <div className='font-semibold self-end text-green-900'>{person.name}</div>
                        <div className='font-normal text-green-900'>{`${person.region} CO`}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
              ) : ( <></> )}
          </ul> 
          <ul className="list gap-2">
            {ballot2Data && ballot2Data.length > 0 ? (
              ballot2Data.map((person, index) => (
                <li key={index} className='grid w-85'>
                  <div className='relative bg-white rounded-none h-fit p-2 border-green-900 border-1'>
                    <div className='grid grid-cols-[30%_70%] '>
                      <div className="avatar w-fit justify-content-center">
                        <div className="w-20 rounded-full border-black border-1">
                          <img src={`/candidatepictures/${person.name}.jpg`}/>
                        </div>
                      </div>
                      <div className='grid'>
                        <div className='font-semibold self-end text-green-900'>{person.name}</div>
                        <div className='font-normal text-green-900'>{`${person.region} CO`}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
              ) : ( <></> )}
          </ul> 
          </div>
          
          <div className="modal-action">
            <form method="dialog" className='grid grid-cols-2 gap-2 w-full'>
              <button className="btn place-self-end rounded-none w-50 border-green-900 bg-white border-1 text-green-900 hover:bg-green-900 hover:text-white">Return</button>
              <button className="btn rounded-none w-50 border-green-900 bg-white border-1 text-green-900 hover:bg-green-900 hover:text-white" onClick={() => postBallot()}>Confirm</button>
            </form>
          </div>
        </div>
      </dialog>
  )
}

export default BallotModal