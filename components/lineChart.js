import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const UserChart = ({data}) => {

  return (

        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="errorsCount" stroke="#8884d8" />
          <Line type="monotone" dataKey="score" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      );
}

export default UserChart