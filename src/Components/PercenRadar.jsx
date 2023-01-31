import React, { useEffect } from 'react'
import ReactECharts from 'echarts-for-react';

import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'



function PercenRadar() {

  const [cpu_ut, setCpu_ut] = React.useState([])
  const [memory_ut, setMemory_ut] = useState([])
  const [disk_ut, setDisk_ut] = useState([])
  const [diskw_ut, setDiskw_ut] = useState([])

  const [go_button, setGo_button] = useState({});

  // const maskSetter=useSelector((state)=> state.masking.ab)



  const [dataVarSet, SetdataVarSet] = React.useState([{
    value: cpu_ut,
    name: 'CPU Utilization'
  },
  {
    value: [0.250501002, 12.25824154, 0.08, 0.02, 12.76672618, 92.0, 1218.0, 11328.0],
    name: 'Memory Utilization'
  }
  ])

  // const cpu_utilisation=go_button.push[dataVarSet];

  const percen_arr1=useSelector((state)=>state.masking.arrP1)
  const percen_arr2=useSelector((state)=>state.masking.arrP2)

  function setDataVar() {
    const dataVar = [
      {
        value: go_button.Cpu_utilization,
        name: 'CPU Utilization'
      },
      {
        value: [200, 200],
        name: 'b_CPU Utilization'
      },
      {
        value: go_button.Memory_utilization,
        name: 'b_memory Utilization'
      },
      {
        value: [0, 0, 4000],
        name: 'b_diskbusy Utilization'
      },
      {
        value: [0, 0, 0, 3000],
        name: 'b_dirty Utilization'
      },


    ]

    SetdataVarSet(dataVar);
  }

  const db = [
    { name: 'Cpu Utilization', max: 2 },
    { name: 'memory utilization', max: 30 },
    { name: 'disk busy', max: 2 },
    { name: 'disk weighted', max: 1 },
    { name: 'cached', max: 30 },
    { name: 'dirty', max: 130 },
    { name: 'tx bytes', max: 1500 },
    { name: 'rx bytes', max: 12000 }
  ]
  const abc = `tooltip : {}`

  const option = {


    tooltip: { show: true },

    legend: {
      data: ['Percentile1','Percentile2'],
      orient: 'vertical',
      right: 200,
      top: 5,
      textStyle: {
        color: '#ccc'
      }

    },
    grid: {
      backgroundColor: "#060706",
      show: true,
      borderColor: "#060706",
      shadowColor: "#060706",
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
      indicator: db
    },

    series: [
      {
        name: 'Percentile1 vs Percentile2',
        type: 'radar',
        data: [
          {
            value: percen_arr1,
            name: 'Percentile 1'
          },
          {
            value: percen_arr2,
            name: 'Percentile 2'
          }
        ]
      }
    ]
  };
  return (
    <div>
      <ReactECharts
        option={option}
        style={{ height: 400 }}
      /></div>
  )
}

export default PercenRadar