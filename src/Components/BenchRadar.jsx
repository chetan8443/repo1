import React, { useEffect } from 'react'
import ReactECharts from 'echarts-for-react';

import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'



function RadarEx() {

  const [cpu_ut, setCpu_ut] = React.useState([])
  const [memory_ut, setMemory_ut] = useState([])
  const [disk_ut, setDisk_ut] = useState([])
  const [diskw_ut, setDiskw_ut] = useState([])

  const [go_button, setGo_button] = useState({});

  // const maskSetter=useSelector((state)=> state.masking.ab)



  useEffect(() => {
    const set_go_button = async () => {




      const url = "http://127.0.0.1:5000/get_workload";

      

      console.log(typeof h1);

      const ob={
        "workload":"specjbb-c2d-2vcpu8g_mm",
        "Disk":"sda",
        "nics":"ens4",
        "percentile":98
      }
      console.log(ob);
      // const h5=localStorage.getItem('hostname');
      // console.log(h1);

      const response = await axios.post(url, ob)

      alert(response.data.Output)
      console.log(response.data.Output)
      const cp = [response.data.Output.Cpu_utilization.cpu_utilization,
            
      response.data.Output.Cpu_utilization.memory_utilization, response.data.Output.Cpu_utilization.disk_busy, response.data.Output.Cpu_utilization.disk_weighted, response.data.Output.Cpu_utilization.cached, response.data.Output.Cpu_utilization.dirty, response.data.Output.Cpu_utilization.txbytes, response.data.Output.Cpu_utilization.rxbytes]
      // console.log(cp);
      setCpu_ut(cp);
      console.log(cpu_ut);

      const mp=[response.data.Output.Memory_utilization.cpu_utilization,
            
        response.data.Output.Memory_utilization.memory_utilization, response.data.Output.Memory_utilization.disk_busy, response.data.Output.Memory_utilization.disk_weighted, response.data.Output.Memory_utilization.cached, response.data.Output.Memory_utilization.dirty, response.data.Output.Memory_utilization.txbytes, response.data.Output.Memory_utilization.rxbytes]
        setMemory_ut(mp);

        const dbp=[response.data.Output.DiskBusy.cpu_utilization,response.data.Output.DiskBusy.memory_utilization,
          response.data.Output.DiskBusy.disk_busy,response.data.Output.DiskBusy.disk_weighted,
          response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted, 
          response.data.Output.DiskBusy.cached,response.data.Output.DiskBusy.txbytes,
          response.data.Output.DiskBusy.rxbytes
        ]
        setDisk_ut(dbp);

        const dwp=[response.data.Output.DiskWeighted.cpu_utilization,response.data.Output.DiskWeighted.memory_utilization,
          response.data.Output.DiskWeighted.disk_busy,response.data.Output.DiskWeighted.disk_weighted,
          response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted, 
          response.data.Output.DiskWeighted.cached,response.data.Output.DiskWeighted.txbytes,
          response.data.Output.DiskWeighted.rxbytes]
          setDiskw_ut(dwp)

      //  alert(go_button)
    }
    set_go_button();
  }, [])

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
      data: ['CPU Utilization', 'Memory Utilization','Disk Busy','Disk Weighted'],
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
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: cpu_ut,
            name: 'CPU Utilization'
          },
          {
            value: memory_ut,
            name: 'Memory Utilization'
          },
          {
            value: disk_ut,
            name: 'Disk Busy'
          },
          {
            value: diskw_ut,
            name: 'Disk Weighted'
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

export default RadarEx