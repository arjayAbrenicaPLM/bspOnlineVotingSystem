import React, { useState, useEffect} from 'react'
import axios from 'axios'
import ResultsList from '../lists & tables/ResultsList'
import { FaCalendar } from "react-icons/fa"
import logOut from '../functions/Logout'

function Results({setAuth}) {

  const [results, setResults] = useState([])
  const [doneVote, setDoneVote] = useState([])

  const getResults = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/results`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
  
      setResults(response.data.result)
    } catch (error) {
      console.log(error.message)
      if (error.message === "jwt expired"){
        logOut(setAuth)
      }
    }
  }
  
  const getDone = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ratio`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )

      const done = response.data.done
      
      setDoneVote(done)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(() => {
    getResults()
    getDone()
  }, [])
  
    
  return (
    <div className='p-5 relative h-screen ml-64'>
       <div className="absolute inset-0 bg-[url('/bspLogo.png')] bg-center bg-auto opacity-30 bg-no-repeat -z-10 h-full"></div>
        <div className='grid grid-rows-[10%_90%] h-full gap-2'>

          {/* Page &  Clock */}
          <div>
            <h1 className='text-green-900 font-bold text-2xl'>ELECTION RESULTS</h1>
            <div className='bg-green-900 font-bold rounded-md w-fit text-white p-1 px-2 flex items-center gap-2'><FaCalendar />12 March 2025</div>
          </div>
          
          {
            results.length > 0 ? 
            <>
              <div className='shadow-black/50 shadow-md rounded-md overflow-y-auto'>
                <ResultsList results={results} doneVoting={doneVote}/>
              </div>
            </>
            :
            <>
              <div className='shadow-black/50 shadow-md rounded-md'>
                <h1 className='font-bold text-2xl justify-self-center h-fit mb-4'>
                  All Results
                </h1>
                <div className='justify-self-center'> No Votes Casted </div>
              </div>
            </>
          }
            
        </div>
      </div>
  )
}

export default Results