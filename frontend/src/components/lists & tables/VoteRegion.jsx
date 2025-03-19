import React, { useState } from 'react'
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from 'recharts'

function VoteRegion({region}) {

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div>
      <h1 className='font-bold text-2xl justify-self-center h-fit my-4'>
        Voters by Region
      </h1>
      <ResponsiveContainer width="70%" height="50%" className='justify-self-center'>
        <PieChart width={730} height={250}>
          <Tooltip />
          <Legend />
          <Pie data={region} dataKey="total_votes" nameKey="region" cx="50%" cy="50%" outerRadius={80} innerRadius={50} fill="#009000">
            {/*region.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))*/}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VoteRegion