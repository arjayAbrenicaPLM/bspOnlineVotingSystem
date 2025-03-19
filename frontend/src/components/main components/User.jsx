import React, { useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const User = ({setAuth, setName}) => {

  useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      setName(response.data.user[0].user_name)
    } catch (error) {
      console.log(error.message)
      if (error.message === "jwt expired"){
        logOut(setAuth)
      }
    }
  }

  return (
    <div className='grid'>
      <Toaster />
      <div className="bg-bspgreen/20 bg-[url('/login.jpg')] bg-blend-soft-light bg-center bg-cover h-screen w-full">
        <div className='grid h-screen'>
          <div className='px-8 py-2 grid place-self-center w-fit bg-white/70 rounded-sm'>
            <p className='justify-self-center font-bold text-2xl text-black'> 68th Annual National Council Meeting </p>
            <p className='justify-self-center text-center font-bold text-lg mt-2 text-black'> Election of Four (4) Regular Members <br />
            of the National Executive Board <br /> 2025-2029</p>

            <div className='grid justify-self-center p-3 pt-3 pl-7 w-115'>
              <span className='italic text-black font-bold justify-self-center'>Instructions</span>
              <ol className='list-decimal italic text-black text-justify'>
                <li>Each Council represented is entitled to four (4) votes plus one (1) vote for every 10,000 of their Scout membership.</li>
                <li>Check four (4) names in the boxes before the name of the candidate of your choice.</li>
                <li>Ballot with more or less than four (4) names voted shall be considered null and void.</li>
                <li>Indicate the number of votes opposite the names of your chosen candidates based on your vote allocation, if in case the number of
               votes is not indicated, it is understood that each candidate voted upon shall get the corresponding number of vote allocation.</li>
              </ol>
            </div>

            <p className='justify-self-center font-bold text-2xl text-black mt-2'> Voting will begin on <span 
            className='italic underline text-green-900'>June 1, 2025 12:00 am</span> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User