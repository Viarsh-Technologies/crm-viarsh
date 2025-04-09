import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, Text } from 'recharts';
import dashboardData  from '../../data/dashboard-data.json';

const transformData = () => {
    // Extract the required `topProjects` format
    const data = dashboardData.topProjects.map(project => ({
      name: project.name,
      value: project.value,
    }));
  
    console.log(data);
    return data;
  };
  
const CustomizedXAxisTick = ({ x, y, payload }) => {


    const words = payload.value.split(" ");
    return (
       
      <g transform={`translate(${x},${y+10})`}>
        {words.map((word, index) => (
          <Text
            key={index}
            x={0}
            y={index * 12}
            textAnchor="middle"
            fontSize={10}
            fill="#A2A29F"
          >
            {word}
          </Text>
        ))}
      </g>
    
    );
  };
const BarChartComponent = () => {
   
      const transformedData = transformData();

  return (
    <>     

    
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
       data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
         <XAxis
        dataKey="name"
        tick={<CustomizedXAxisTick />}
        interval={0}
        pos
      />
        <YAxis tick={{ fill: '#A2A29F' }}
          tickFormatter={(value) => `$${value / 1000}k`} // Format Y-axis labels as $Xk
        />
        <Tooltip
          formatter={(value) => `$${value.toLocaleString()}`} // Format tooltip values as $X,XXX
        />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#32D583" name="Revenue"  radius={[10, 10, 0, 0]} // Smooth corners for top edges
        barSize={50}  />
      </BarChart>
    </ResponsiveContainer>
    </>
  )
}

export default BarChartComponent