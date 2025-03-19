import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell} from 'recharts'

function ResultsGraph({results}) {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  return (
    <div>
      <h1 className='font-bold text-2xl justify-self-center h-fit mb-4'>
        All Results
      </h1>
      <ResponsiveContainer width="100%" height="50%" className='justify-self-center'>
        <BarChart width={1000} height={250} data={results}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="candidate_name" />
          <YAxis allowDecimals={false} domain={[0, 'dataMax']}/>
          <Tooltip />
          <Bar dataKey="total_votes" fill="#8884d8" name="Vote Count">
            {results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ResultsGraph