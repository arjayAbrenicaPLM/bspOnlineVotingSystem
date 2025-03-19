import React from 'react'

function RenderList({data, type}) {
  return (
    <>
    {data && data.length > 0 ? (
      data.map((person, index) => (
        <li key={index} className=''>
        <div className='w-full'>
          <div className='grid text-center'>
            <div className='font-semibold text-xl self-end text-green-900'>
              {type === "candidate" 
                ? `${person.candidate_region} CO: ${person.count}` 
                : `${person.region} CO: ${person.total_votes}`}
            </div>
          </div>
        </div>
      </li>
      ))
      ) : ( <></> )}
    </>
  )
}

export default RenderList