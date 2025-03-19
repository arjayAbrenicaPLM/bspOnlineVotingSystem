import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaCalendar } from "react-icons/fa"
import VotingStats from '../utilities/VotingStats'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import logOut from '../functions/Logout'

function Stats({setAuth}) {

  const [chartData, setChartData] = useState([])
  const [doneVote, setDoneVote] = useState([])
  const [top4, setTop4] = useState([])

  const getChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/region/stats`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      setChartData(response.data.result)
    } catch (error) {
      console.log(error.message)
      if (error.message === "jwt expired"){
        logOut(setAuth)
      }
    }
  }
  
  const getDoneVoting = async () => {
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

  const getTop4 = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/top4`,
        {headers:{
          token: localStorage.getItem("token")
        }}
      )
    
      
      const formattedTop4 = response.data.top4.map(item => ({
        ...item,
        candidate_name: item.candidate_name.split(",")[0], 
      }))

      setTop4(formattedTop4)
    } catch (error) {
      console.log(error.message)
    }
  }

  const colors = ["#33623C", "#4E955B", "#5BAF6B", "#68C87A"]

  useEffect(() => {
    getChartData()
    getDoneVoting()
    getTop4()
  },[])

  return (
    <div className='p-5 relative h-screen ml-64'>
       <div className="absolute inset-0 bg-[url('/bspLogo.png')] bg-center bg-auto opacity-30 bg-no-repeat -z-10 h-full"></div>
        <div className='grid grid-rows-[10%_30%_60%] h-full gap-2'>

          {/* Page &  Clock */}
          <div>
            <h1 className='text-green-900 font-bold text-2xl'>VOTING STATISTICS</h1>
            <div className='bg-green-900 font-bold rounded-md w-fit text-white p-1 px-2 flex items-center gap-2'><FaCalendar />12 March 2025</div>
          </div>
          
          {/* Voting Stats */}
          <div className='bg-bspgreen/20 rounded-md p-2 flex w-full shadow-sm shadow-black/50'>
            <VotingStats />
          </div>
          
          <div className="grid grid-cols-[65%_35%] gap-2 pr-2 pb-4">

            {/* Votes by Council */}
            <div className="bg-bspgreen/20 rounded-md p-3 w-full shadow-sm shadow-black/50">
              <h1 className='text-accentgreen font-bold'>VOTES CAST PER COUNCIL</h1>
              <div className='overflow-y-auto'>
                <table className="table table-pin-rows w-full">
                  <thead>
                    <tr className='text-xs text-darkgreen bg-transparent border-b-2 border-b-accentgreen text-center sticky'>
                      <th>Council</th>
                      <th>Registered Voters</th>
                      <th>Votes Cast</th>
                      <th>Turnout %</th>
                      <th>% of Total Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData && Object.keys(chartData).length > 0 ? (
                      Object.keys(chartData).map((key) => {
                        return (
                          <tr key={key} className='text-center text-sm font-bold text-darkgreen bg-transparent'>
                            <td>{chartData[key].region}</td>
                            <td>{chartData[key].registered_voters}</td>
                            <td>{chartData[key].votes_cast}</td>
                            <td>{((chartData[key].votes_cast / chartData[key].registered_voters) * 100).toFixed(2)} %</td>
                            <td>{chartData[key].votes_cast != 0 ? ((chartData[key].votes_cast / doneVote) * 100).toFixed(2) : "0"}%</td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-darkgreen">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
                
            </div>
            
            {/* Top Four */}
            <div className="bg-bspgreen/20 rounded-md p-3 shadow-sm shadow-black/50">
              <h1 className='text-accentgreen font-bold'>LEADING CANDIDATES</h1>
                <div className='overflow-x-auto h-80'>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical" 
                      width={500}
                      height={300}
                      data={top4}
                      margin={{
                        top: 5,
                        right: -20,
                        left: 50,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      
                      <XAxis type="number" hide domain={[0, 'dataMax']}/>  
                      <YAxis dataKey="candidate_name" type="category" yAxisId={0}/> 

                      <YAxis orientation="right" yAxisId={1} dataKey="total_votes" type="category" axisLine={false} tickLine={false} />

                      <Bar
                        dataKey="total_votes"
                        shape={(props) => {
                          const { x, y, width, height, index } = props
                          return (
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              fill={colors[index % colors.length]}
                            />
                          )
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
          </div>

        </div>
      </div>
  )
}

export default Stats