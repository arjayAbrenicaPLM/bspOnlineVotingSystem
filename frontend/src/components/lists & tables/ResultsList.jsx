import React from 'react'

function ResultsList({results, doneVoting}) {

  return (
    <div>
      <ul className="list">
        <li className='list-row font-bold bg-darkgreen rounded-t-md rounded-b-none text-white sticky z-10'>
          <div className='w-10 text-center'>Rank</div>
          <div className='w-25 text-center'>Photo</div>
          <div className='list-col-grow text-center'>Candidate Name</div>
          <div className='w-35 text-center'>Council</div>
          <div className='w-25 text-center'>Total Votes</div>
          <div className='w-25 text-center'>Percentage</div>
        </li>
        {results && Object.keys(results).length > 0 ? (
          Object.keys(results).map((key, index) => {
            const data = results[key]
              return (
                  <li key={key} className="list-row bg-bspgreen/20 rounded-none">
                    <div className='w-10 text-center content-center font-bold text-lg text-darkgreen'>{index + 1}</div>
                    <div className='w-25'>
                              <div className="avatar w-fit justify-content-center">
                                <div className="w-24 rounded-full border-darkgreen border-1">
                                  <img src={`/candidatepictures/${data.candidate_name}.jpg`}/>
                                </div>
                              </div></div>
                    <div className='list-col-grow text-center content-center font-bold text-lg text-darkgreen'>{data.candidate_name}</div>
                    <div className='w-35 text-center content-center font-bold text-lg text-darkgreen'>{data.candidate_region}</div>
                    <div className='w-25 text-center content-center font-bold text-lg text-darkgreen'>{data.total_votes}</div>
                    <div className='w-25 text-center content-center font-bold text-lg text-darkgreen'>{data.total_votes != 0 ? ((data.total_votes / doneVoting) * 100).toFixed(2) : "0"}%</div>
                  </li>
              )
          })
        ) : (
          <li className='text-center list-row'>
            <div className='list-col-grow'>No Results</div>
          </li>
        )}
      </ul> 
    </div>
  )
}

export default ResultsList