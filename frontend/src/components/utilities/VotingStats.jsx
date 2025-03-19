import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { GiVote } from "react-icons/gi"

function VotingStats() {
  const [voteRatio, setVoteRatio] = useState([])
  const [totalVote, setTotalVote] = useState([])
  const [doneVote, setDoneVote] = useState([])
  
  const getRatio = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ratio`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      const total = response.data.total
      const done = response.data.done
      const data = (done / total) * 100

      setVoteRatio(data.toFixed(0))
      setTotalVote(total)
      setDoneVote(done)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getRatio()
  }, [])

  return (
    <div className='flex w-full'>
      
      <div className="w-1/3">
        <h1 className='text-accentgreen font-bold'>REGISTERED VOTERS</h1>
        <div className='grid grid-cols-2 items-center p-2'>
          <img src='/icons/voter.png' className='size-36 justify-self-end'/>
          <div className='grid text-center w-full text-darkgreen justify-self-start'>
            <span className='self-end font-bold text-7xl'>{totalVote}</span>
            <span className='text-2xl font-bold'>{totalVote > 1 ? "Voters" : "Voter"}</span>
          </div>
        </div>
      </div>

      <div className="divider divider-horizontal before:bg-accentgreen/50 before:rounded-t-md after:bg-accentgreen/50 after:rounded-b-md"/>

      <div className="grid w-1/3">
        <h1 className='text-accentgreen font-bold'>VOTES CAST</h1>
        <div className='grid grid-cols-2 items-center p-2'>
          <GiVote className='size-40 text-darkgreen justify-self-end'/>
          <div className='grid text-center w-full text-darkgreen justify-self-start'>
            <span className='self-end font-bold text-7xl'>{doneVote}</span>
            <span className='text-2xl font-bold'>{doneVote > 1 ? "Votes Cast" : "Vote Cast"}</span>
          </div>
        </div>
      </div>

      <div className="divider divider-horizontal before:bg-accentgreen/50 before:rounded-t-md after:bg-accentgreen/50 after:rounded-b-md"/>

      <div className="grid w-1/3">
        <h1 className='text-accentgreen font-bold'>TURNOUT PERCENTAGE</h1>
        <div className='grid grid-cols-2 items-center p-2'>
          <img src='/icons/pie.png' className='size-36 justify-self-end'/>
          <div className='grid text-center w-full text-darkgreen justify-self-start'>
            <span className='self-end font-bold text-7xl'>{voteRatio}%</span>
            <span className='font-bold text-accentgreen'>Remaining Votes:</span>
            <span className='font-bold text-accentgreen ml-8'>{totalVote - doneVote} Uncast {totalVote - doneVote > 1 ? "Votes" : "Vote"}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default VotingStats