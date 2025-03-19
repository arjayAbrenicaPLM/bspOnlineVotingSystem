import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CandidateList from '../lists & tables/CandidateList'
import BallotModal from '../modals/BallotModal'
import toast, { Toaster } from 'react-hot-toast'
import { IoSearchSharp  } from "react-icons/io5"
import html2canvas from 'html2canvas-pro'
import PrintingModal from '../modals/PrintingModal'
import { jsPDF } from 'jspdf'
import PromptPrintModal from '../modals/PromptPrintModal'

function Voting({setAuth}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [stubNum, setStubNum] = useState()
  const [region, setRegion] = useState()
  const [chartData, setChartData] = useState(null)
  const [column1Data, setColumn1Data] = useState(null)
  const [column2Data, setColumn2Data] = useState(null)
  const [ballot1Data, setBallot1Data] = useState(null)
  const [ballot2Data, setBallot2Data] = useState(null)
  const [ballot, setBallot] = useState([])
  const [ballotData, setBallotData] = useState()
  const [voteStatus, setVoteStatus] = useState(false)
  const printRef = useRef(null)

  const hasVoted = async (skip) => {
    try {
      const response = await axios.get(`http://localhost:5000/voted`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
      const status = response.data.voteStatus[0].has_voted
    
      if (!skip){
        setVoteStatus(status)
      }

      if (status){
        getVoterInfo()
        getVotes()
        document.getElementById("promptPrintModal").showModal()
      }

    } catch (error) {
      toast.error(error.response.data.message, {duration: 2500})
    }
  }

  const getVotes = async () => {
    const newBallot = []
    try {
    const response = await axios.get(`http://localhost:5000/existing_vote`,
      {headers:{
        token: localStorage.getItem("token")
      }}
    )
    const ballot = response.data.result
    
    Object.keys(ballot).forEach((key) => {
      const vote = ballot[key]
      newBallot.push(vote)
    })
    setBallot(prev => [...prev, newBallot])
  } catch (error) {
    toast.error(error.response.data.message, {duration: 2500})
  }
  }

  const getCandidates = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/candidates`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )

      setChartData(response.data)
    } catch (error) {
      toast.error(error.response.data.message, {duration: 2500})
      if (error.message === "jwt expired"){
        logOut(setAuth)
      }
    }
  }

  const postBallot = async () => {
    try {
      const ballotNames = getBallotNames()
      const stubNumber = Math. floor(Math. random() * (9999 - 1000 + 1)) + 1000
      ballotNames.push(stubNumber)
      const response = await axios.put(`http://localhost:5000/ballot`, ballotNames,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
      if (response.status === 200){
        toast.success("Ballot Passed", {duration: 2500})
        hasVoted(true)
        document.getElementById("promptPrintModal").showModal()
      } else{
        toast.error("Error Occured", {duration: 2500})
      }
    } catch (error) {
      console.log(error.response.data.message)
      toast.error("Error Occured", {duration: 2500})
    }
  }

  const fetchFilteredData = async () => {
    try {
      if (!searchTerm) {
        getCandidates()
      } else {
        const response = await axios.get(
          `http://localhost:5000/candidate/search?q=${searchTerm}`,
          {headers:{
            token: localStorage.getItem("token")
          }}
        )
        setChartData(response.data)
      }
    } catch (error) {
      console.error('Error fetching filtered data:', error)
    }
  }

  const getVoterInfo =async () => {
    try {
      const response = await axios.get(`http://localhost:5000/stub_num`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )

      setStubNum(response.data.result[0].stub_number)
      setRegion(response.data.result[0].region)
    } catch (error) {
      toast.error(error.response.data.message, {duration: 2500})
    }
  }

  const donePrint = async() => {
    const element = printRef.current
    
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: 'a6'
    })

    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = ((imgProperties.height * pdfWidth) / imgProperties.width) * 1.25

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)

    pdf.save(`OfficialBallot-${stubNum}.pdf`)
    document.getElementById('printModal').close()
  }

  const openModal = () => {
    if (voteStatus){
      toast.error("Already Voted" , {duration: 2500})
    } else {
      if (ballotData.length < 4){
        toast.error("Incomplete Ballot" , {duration: 2500})
      } else if(ballotData.length > 0){
       document.getElementById('ballotModal').showModal()
       generateColumns(ballotData, "ballot")
      } else {
        toast.error("No Candidates in Ballot" , {duration: 2500})
      }
    }
  }

  const getBallotNames = () => {
    const newData = []
    Object.keys(ballotData).forEach((key) => {
      const votes = ballotData[key]
      
      newData.push(votes.name)
    })

    return newData
  }

  const getBallotData = () => {
    const newData = []
    Object.keys(ballot).forEach((key) => {
      const votes = ballot[key]
      newData.push(votes)
    })

    setBallotData(newData)
  }
  
  const clickCheckbox = (candidate_name, candidate_region) => {
    const data = {
      name: candidate_name,
      region: candidate_region
    }

    const alreadyExists = ballot.some(
      (entry) => entry.name === data.name && entry.region === data.region
    )

    if (!alreadyExists){
      if (ballot.length <= 3){
        setBallot(prev => [...prev, data])
      } else {
        toast.error("Ballot Full", {duration: 2500})
        return true
      }
    } else {
      setBallot(prev => prev.filter(
        entry => !(entry.name === candidate_name && entry.region === candidate_region)))
    }
  }

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value)
  }

  const showPrint = () => {
    getVoterInfo()
    document.getElementById('printModal').showModal()
  }

  const generateColumns = (data, type) => {
    const chunk = Math.ceil(data.length / 2)
    const col1 = data.slice(0, chunk)
    const col2 = data.slice(chunk)
    
    if (type !== "ballot"){
      setColumn1Data(col1)
      setColumn2Data(col2)
    } else {
      setBallot1Data(col1)
      setBallot2Data(col2)
    }
  }

  useEffect(() => {
    getCandidates()
    hasVoted(false)    
  }, [])

  useEffect(() =>{
    getBallotData()
  }, [ballot])
  
  useEffect(() => {
    fetchFilteredData()
  }, [searchTerm])

  useEffect(() => {
    chartData ? generateColumns(chartData.candidates, "column") : generateColumns([])
  }, [chartData])

  return (
    <div className='grid'>
      <Toaster />
      <label className='input input-bordered border-bspgreen text-black bg-background shadow-black/50 shadow-sm focus-within:outline-bspgreen
                              flex items-center gap-2 absolute top-20 right-5 w-50'>
        <input type="search" className="grow" placeholder="Search" onChange={e => handleSearchChange(e)}/> <IoSearchSharp />
      </label>
      <div className="bg-bspgreen/20 bg-[url('/login.jpg')] bg-blend-soft-light bg-center bg-cover h-screen w-full">
        <div className='grid h-screen'>
          <div className='px-4 py-4 grid place-self-center w-fit bg-white/70 rounded-sm h-150'>
            <h1 className='font-bold text-3xl mb-4 justify-self-center text-green-900'>
              e-Ballot Form
            </h1>
            <div className='grid grid-cols-2 gap-4 w-fit overflow-y-scroll'>
              <CandidateList candidates={column1Data} clickCheckbox={clickCheckbox} voteStatus={voteStatus}/>
              <CandidateList candidates={column2Data} clickCheckbox={clickCheckbox} voteStatus={voteStatus}/>
            </div>
            <button className='btn w-80 place-self-center rounded-none border-green-900 bg-white border-1 mt-2 hover:bg-green-900 hover:text-white'
            onClick={() => openModal()}>
              SUBMIT
            </button>
          </div>
          
        </div>
      </div>

      <PrintingModal printRef={printRef} ballot={ballot} voteStatus={voteStatus} stubNum={stubNum} region={region} donePrint={donePrint} />

      <BallotModal ballot1Data={ballot1Data} ballot2Data={ballot2Data} postBallot={postBallot}/>

      <PromptPrintModal setAuth={setAuth} showPrint={showPrint} />
    </div>
  )
}

export default Voting