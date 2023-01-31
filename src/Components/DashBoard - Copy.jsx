
import { createTheme, ThemeProvider, Grid, CardActionArea, Card, Box } from '@mui/material';

import React from 'react'
import Muidash from './Muidash';
import RadarEx from './RadarEx';
import "./style.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {ColorRing} from 'react-loader-spinner'
import PercenRadar from './PercenRadar';
import CombineBars from './CombineBars';

function DashBoard() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [cpu_ut, setCpu_ut] = React.useState([])
  const [memory_ut, setMemory_ut] = useState([])
  const [disk_ut, setDisk_ut] = useState([])
  const [diskw_ut, setDiskw_ut] = useState([])

  const [dikhao,setDikhao]=useState(false);


  // const temp=useSelector((state)=>state.masking.temp)

  // const [newVar,setNewVar]=useState(false)

  // setNewVar(useSelector((state)=>state.masking.showPercentile));


  const maskSetter = useSelector((state) => state.masking.count)


  // console.log(localStorage.getItem('bench'));

  const host=useSelector((state)=>state.masking.Hostname)
        const disk=useSelector((state)=>state.masking.DiskName)
        const nics=useSelector((state)=>state.masking.nicsName)
        const percentile=useSelector((state)=>state.masking.percentile)
        const start_d=useSelector((state)=>state.masking.start_d)
        const end_d=useSelector((state)=>state.masking.end_d)

        const cpu_checkbox_redux=useSelector((state)=>state.masking.cpu_checkbox)
        const memory_checkox_redux=useSelector((state)=>state.masking.memory_checkbox)
        const diskbusy_checkbox_redux=useSelector((state)=>state.masking.diskbusy_checkbox)
        const diskweight_checkbox_redux=useSelector((state)=>state.masking.diskweight_checkbox)

        const arr=[]
        if(cpu_checkbox_redux.length>0){
          arr.push(cpu_checkbox_redux)
        }
        if(memory_checkox_redux.length>0){
          arr.push(memory_checkox_redux)
        }
        if(diskbusy_checkbox_redux.length>0){
          arr.push(diskbusy_checkbox_redux)
        }
        if(diskweight_checkbox_redux.length>0){
          arr.push(diskweight_checkbox_redux)
        }
        console.log(arr)


  useEffect(() => {
    if (maskSetter) {
      setMask(true)
      const set_go_button = async () => {

        const url = "http://127.0.0.1:5000/workload_comparison";


        console.log(typeof h1);

        const ob = {
          Host: host,
          Disk: disk,
          nics: nics,
          percentile:percentile,
          start_date: start_d,
          end_date: end_d,
          Data_focus: arr
        }
        console.log(ob);
        // const h5=localStorage.getItem('hostname');
        // console.log(h1);

        const response = await axios.post(url, ob)
        setDikhao(true);

        // alert(response.data.Output)
        // console.log(response.data.Output)

        if(response.data.Output.Cpu_utilization){
        const cp = [response.data.Output.Cpu_utilization.cpu_utilization,

        response.data.Output.Cpu_utilization.memory_utilization, response.data.Output.Cpu_utilization.disk_busy, response.data.Output.Cpu_utilization.disk_weighted, response.data.Output.Cpu_utilization.cached, response.data.Output.Cpu_utilization.dirty, response.data.Output.Cpu_utilization.txbytes, response.data.Output.Cpu_utilization.rxbytes]
        // console.log(cp);
        setCpu_ut(cp);
        }
        // console.log(cpu_ut);

        if(response.data.Output.Memory_utilization){
        const mp = [response.data.Output.Memory_utilization.cpu_utilization,

        response.data.Output.Memory_utilization.memory_utilization, response.data.Output.Memory_utilization.disk_busy, response.data.Output.Memory_utilization.disk_weighted, response.data.Output.Memory_utilization.cached, response.data.Output.Memory_utilization.dirty, response.data.Output.Memory_utilization.txbytes, response.data.Output.Memory_utilization.rxbytes]
        setMemory_ut(mp);
        }

        if(response.data.Output.DiskBusy){
        const dbp = [response.data.Output.DiskBusy.cpu_utilization, response.data.Output.DiskBusy.memory_utilization,
        response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted,
        response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted,
        response.data.Output.DiskBusy.cached, response.data.Output.DiskBusy.txbytes,
        response.data.Output.DiskBusy.rxbytes
        ]
        setDisk_ut(dbp);
      }

        if(response.data.Output.DiskWeighted){
          
          const dwp = [response.data.Output.DiskWeighted.cpu_utilization, response.data.Output.DiskWeighted.memory_utilization,
            response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted,
            response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted,
            response.data.Output.DiskWeighted.cached, response.data.Output.DiskWeighted.txbytes,
            response.data.Output.DiskWeighted.rxbytes]

            setDiskw_ut(dwp)
        }

        
        

        setDikhao(false)
      }
      set_go_button();
    }
  }, [useSelector((state) => state.masking.temp)])


  const [mask, setMask] = React.useState(false);

  const bench_cpu=useSelector((state)=>state.masking.bench_cpuUt)
  const bench_memoty=useSelector((state)=>state.masking.bench_memUt)
  const bench_diskB=useSelector((state)=>state.masking.bench_diskBusy)
  const bench_diskW=useSelector((state)=>state.masking.bench_diskWeight)


  return (
    <Box>


      <Grid className="content">
        <ThemeProvider theme={darkTheme} >

          <Muidash />
        </ThemeProvider>
      </Grid>
      <Grid id='echart'>
        <ThemeProvider theme={darkTheme} > {<ColorRing
          visible={dikhao}
          height="80"
          width="80"
          
          ariaLabel="blocks-loading"
          wrapperStyle={{ 
            position: "fixed", top: "70%", left: "50%", transform: "translate(-50%, -50%)"}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />}{mask && <CombineBars names={arr} guru={[
          {
            value: cpu_ut,
            name: 'Cpu_utilization'
          },
          {
            value: memory_ut,
            name: 'Memory_utilization'
          },
          {
            value: disk_ut,
            name: 'DiskBusy'
          },
          {
            value: diskw_ut,
            name: 'DiskWeighted'
          },
          {
            value:bench_cpu,
            name: 'b_CPU utilisation',lineStyle: {
              normal: {
                color: 'green',
                width: 0,
                type: 'dashed'
              }
            }
          },
          {
            value:bench_memoty,
            name: 'b_Memory utilisation',lineStyle: {
              normal: {
                color: 'green',
                width: 0,
                type: 'dashed'
              }
            }
          },
          {
            value:bench_diskB,
            name: 'b_Disk Busy',lineStyle: {
              normal: {
                color: 'green',
                width: 0,
                type: 'dashed'
              }
            }
          },
          {
            value:bench_diskW,
            name: 'b_Disk Weight',lineStyle: {
              normal: {
                color: 'green',
                width: 0,
                type: 'dashed'
              }
            }
          },

        ]} />}
        {/* {
          !mask && <PercenRadar/>
        } */}
        </ThemeProvider>
      </Grid>


    </Box>

  )
}
export default DashBoard;