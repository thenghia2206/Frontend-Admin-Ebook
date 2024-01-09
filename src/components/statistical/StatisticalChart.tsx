import React, { Component } from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './StatisticalChart.styles.scss'

interface StatisticalChartProps {
    data: any,
}

const StatisticalChart = (props: StatisticalChartProps) => {



    return(
        <div>
        <LineChart 
         width={600} 
         height={300} 
         data={props.data}
         margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis dataKey="day" />
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" activeDot={{r: 8}} name='Tổng doanh thu'/>
        </LineChart>
        </div>
    )

}

export default StatisticalChart