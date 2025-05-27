import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import { FaCalendar } from "react-icons/fa"
import { BsBuildingsFill } from "react-icons/bs"
import VotingStats from '../utilities/VotingStats'
import RenderList from '../utilities/RenderList'

function Marshall({setAuth}) {

  const role  = window.localStorage.getItem("role").toUpperCase()
  
  const [top4, setTop4] = useState([])
  const [candidateCount, setCandidateCount] = useState([])
  const [candidates1Data, setCandidates1Data] = useState(null)
  const [candidates2Data, setCandidates2Data] = useState(null)
  const [voters1Data, setVoters1Data] = useState(null)
  const [voters2Data, setVoters2Data] = useState(null)
  const [totalVoters, setTotalVoters] = useState()
  const [currentTime, setCurrentTime] = useState(new Date());


  const getTop4 = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/top4`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      setTop4(response.data.top4)
    } catch (error) {
      console.log(error.message)
      if (error.message === "jwt expired"){
        logOut(setAuth)
      }
    }
  }

  const getCandidatesByRegion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/candidate/region`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      const { col1, col2 } = generateColumns(response.data.result)
      setCandidates1Data(col1)
      setCandidates2Data(col2)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getTotalCandidates = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/candidate/total`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      setCandidateCount(response.data.result[0].count)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getTotal = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ratio`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )

      const total = response.data.total
      
      setTotalVoters(total)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getByRegion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/region`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
      
      const {col1, col2} = generateColumns(response.data.results)
      setVoters1Data(col1)
      setVoters2Data(col2)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  const generateColumns = (data) => {
    const chunk = Math.ceil(data.length / 2)
    const col1 = data.slice(0, chunk)
    const col2 = data.slice(chunk)
    
    return { col1, col2 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getTop4()
    getCandidatesByRegion()
    getTotalCandidates()
    getTotal()
    getByRegion()
  }, [])

  return (
    <div className='p-5 relative h-screen ml-64'>
      <Toaster />
      <div className="absolute inset-0 bg-[url('/bspLogo.png')] bg-center bg-auto opacity-30 bg-no-repeat -z-10"></div>
      <div className='grid grid-rows-[10%_30%_60%] h-full gap-2'>
        {/* Role & Clock */}
        <div>
          <h1 className='text-green-900 font-bold text-2xl'>{role === "ADMIN" ? "SYSTEM ADMINISTRATOR" : role}</h1>
          <div className='bg-green-900 font-bold rounded-md w-fit text-white p-1 px-2 flex items-center gap-2'><FaCalendar />
            {currentTime.toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Voting Stats */}
        <div className='bg-bspgreen/20 rounded-md p-2 flex w-full shadow-sm shadow-black/50'>
          <VotingStats />
        </div>

        <div className='grid grid-cols-[60%_40%] gap-2'>
          <div className='mb-4 grid grid-rows-[35%_65%] gap-2'>

            {/* Election Status */}
            <div className='bg-bspgreen/20 rounded-md p-2 shadow-sm shadow-black/50'>
              <h1 className='text-accentgreen font-bold'>ELECTION STATUS</h1>
              
              <div className='grid h-full place-content-center pb-4'>
                <div className="flex w-full p-2">
                  <div className="w-1/2 p-1">
                    <h1 className='text-darkred text-7xl font-bold'>CLOSED</h1>
                  </div>
                  <div className="divider divider-horizontal before:bg-accentgreen/50 before:rounded-t-md after:bg-accentgreen/50 after:rounded-b-md"/>
                  <div className="w-1/2 p-1">
                    <h1 className='text-accentgreen font-bold'>AS OF</h1>
                    <h1 className='text-darkgreen self-end font-bold text-5xl'>
                      {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </h1>
                  </div>
                </div>
              </div>
              

            </div>

            {/* List of Candidates */}
            <div className='bg-bspgreen/20 rounded-md p-2 shadow-sm shadow-black/50'>
              <h1 className='text-accentgreen font-bold mb-6'>OFFICIAL CANDIDATES</h1>
              <div className='grid grid-cols-[40%_60%]'>
                <img src='/icons/candidate.png' className='size-54 justify-self-center'/>
                <div className='items-start'>
                  <span className='text-darkgreen self-end font-bold text-7xl'>{candidateCount}</span>
                  <span className='text-darkgreen self-end font-bold text-4xl ml-5 grow'>CANDIDATES</span>
                  <div className='w-fit h-fit grid grid-cols-2'>
                    <ul className="list gap-2 p-4 w-full"> <RenderList data={candidates1Data} type="candidate" /> </ul>
                    <ul className="list gap-2 p-4 w-full"> <RenderList data={candidates2Data} type="candidate" /> </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leading Candidates / Registered Voters*/}
          <div className='bg-bspgreen/20 rounded-md p-2 mb-2 mr-2 shadow-sm shadow-black/50'>
          { role === "ADMIN" ?
          <>
          <h1 className='text-accentgreen font-bold'>VOTERS BY REGION</h1>
          <div className='grid grid-cols-[40%_60%] h-full pb-4'>
            <BsBuildingsFill className='size-44 place-self-center text-green-900'/>
            <div className='items-start py-14 ml-4'>
              <span className='text-darkgreen self-end font-bold text-7xl'>{totalVoters}</span>
              <span className='text-darkgreen self-end font-bold text-4xl ml-5 grow'>VOTERS</span>
              <div className='w-fit h-fit grid grid-cols-2'>
                <ul className="list gap-2 p-4 w-full"> <RenderList data={voters1Data} /> </ul>
                <ul className="list gap-2 p-4 w-full"> <RenderList data={voters2Data} /> </ul>
              </div>
            </div>
          </div>
          </>
          :
          <>
          <h1 className='text-accentgreen font-bold'>LEADING CANDIDATES</h1>
              <ul className="list gap-2 p-4">
              {top4 && top4.length > 0 ? (
                top4.map((person, index) => (
                  <li key={index} className='grid w-full bg-white rounded-md py-2 px-4 shadow-sm shadow-black/50 border-darkgreen border-1'>
                      <div className='w-full'>
                        <div className='grid grid-cols-[30%_70%] gap-2'>
                          <div className="avatar justify-self-end">
                            <div className="w-20 rounded-full border-black border-1">
                              <img src={`/candidatepictures/${person.candidate_name}.jpg`}/>
                            </div>
                          </div>
                          <div className='grid text-center'>
                            <div className='font-bold self-end text-green-900'>{person.candidate_name}</div>
                            <div className='font-bold text-green-900'>{`${person.candidate_region} CO`}</div>
                          </div>
                        </div>
                      </div>
                  </li>
                ))
                ) : ( <></> )}
              </ul>
          </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marshall