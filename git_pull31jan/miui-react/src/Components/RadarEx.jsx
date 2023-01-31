import React from 'react'
import ReactECharts from 'echarts-for-react';



function RadarEx() {
  const option = {

    legend: {
      data: ['Allocated Budget', 'Actual Spending'],
      orient: 'vertical',
      right: 300,
      top: 10,
      textStyle: {
        color: '#ccc'
      }

    },
    grid: {
      backgroundColor: "#0F0D0F",
      show: true,
      borderColor: "#0F0D0F",
      shadowColor: "#0F0D0F",
      shadowBlur: 10,
    },




    radar: {
      axisLine: {
        color: "black",
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },



      // shape: 'circle',
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
 
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }
    ]
  };
  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
    />
  )
}

export default RadarEx