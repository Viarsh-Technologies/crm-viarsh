import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomDot from './CustomDot';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 3398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 2000, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
];

const StackedLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: '#A2A29F' }} />
        <YAxis tick={{ fill: '#A2A29F' }} />
        <Tooltip />
        <Legend />
        <Line type="basic" dataKey="pv" stroke="#32D583"  strokeWidth={2}  dot={<CustomDot />}/>
        <Line type="basic" dataKey="uv" stroke="#32D583"  strokeDasharray={'4 2'}  dot={<CustomDot />}/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default StackedLineChart