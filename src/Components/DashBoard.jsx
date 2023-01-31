
import { createTheme, ThemeProvider, Grid, CardActionArea, Card, Box } from '@mui/material';

import React from 'react'
import Muidash from './Muidash';
import RadarEx from './RadarEx';
import "./style.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'
import PercenRadar from './PercenRadar';
import CombineBars from './CombineBars';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BrandingWatermark } from '@material-ui/icons';
import { addMaxDiskW,addMaxCpu,addMaxMemory,addMaxDiskB } from '../features/CounterSlice';

function DashBoard() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [main, setMain] = useState([])

  const dispatch=useDispatch()

  const [open,setOpen] = useState(false);

  const [cpu_ut, setCpu_ut] = React.useState([0,0,0,0,0,0,0,0])
  const [memory_ut, setMemory_ut] = useState([0,0,0,0,0,0,0,0])
  const [disk_ut, setDisk_ut] = useState([0,0,0,0,0,0,0,0])
  const [diskw_ut, setDiskw_ut] = useState([0,0,0,0,0,0,0,0])

  const [dikhao, setDikhao] = useState(false);

  const maskSetter = useSelector((state) => state.masking.count)

  const host = useSelector((state) => state.masking.Hostname)
  const disk = useSelector((state) => state.masking.DiskName)
  const nics = useSelector((state) => state.masking.nicsName)
  const percentile = useSelector((state) => state.masking.percentile)
  const start_d = useSelector((state) => state.masking.start_d)
  const end_d = useSelector((state) => state.masking.end_d)

  const cpu_checkbox_redux = useSelector((state) => state.masking.cpu_checkbox)
  const memory_checkox_redux = useSelector((state) => state.masking.memory_checkbox)
  const diskbusy_checkbox_redux = useSelector((state) => state.masking.diskbusy_checkbox)
  const diskweight_checkbox_redux = useSelector((state) => state.masking.diskweight_checkbox)

  const arr = []
  if (cpu_checkbox_redux.length > 0) {
    arr.push(cpu_checkbox_redux)
  }
  if (memory_checkox_redux.length > 0) {
    arr.push(memory_checkox_redux)
  }
  if (diskbusy_checkbox_redux.length > 0) {
    arr.push(diskbusy_checkbox_redux)
  }
  if (diskweight_checkbox_redux.length > 0) {
    arr.push(diskweight_checkbox_redux)
  }
  // console.log(arr)


  useEffect(() => {
    if (maskSetter) {
      setMask(true)
      const set_go_button = async () => {

        setCpu_ut([0,0,0,0,0,0,0,0]);
        setMemory_ut([0,0,0,0,0,0,0,0]);
        setDisk_ut([0,0,0,0,0,0,0,0]);
        setDiskw_ut([0,0,0,0,0,0,0,0]);

        const url = "http://127.0.0.1:5000/workload_comparison";


        // console.log(typeof h1);

        const ob = {
          Host: host,
          Disk: disk,
          nics: nics,
          percentile: percentile,
          start_date: start_d,
          end_date: end_d,
          Data_focus: arr
        }
        // console.log(ob);
        // const h5=localStorage.getItem('hostname');
        // console.log(h1);

        setOpen(true);
        const response = await axios.post(url, ob).then(response => {
          
     
          const arp = []

        // alert(response.data.Output)
        // console.log(response.data.Output)

        if (response.data.Output.Cpu_utilization) {
          const cp = [response.data.Output.Cpu_utilization.cpu_utilization,

          response.data.Output.Cpu_utilization.memory_utilization, response.data.Output.Cpu_utilization.disk_busy, response.data.Output.Cpu_utilization.disk_weighted, response.data.Output.Cpu_utilization.cached, response.data.Output.Cpu_utilization.dirty, response.data.Output.Cpu_utilization.txbytes, response.data.Output.Cpu_utilization.rxbytes]
          // console.log(cp);
          setCpu_ut(cp);

          var ab = {
            value: cp,
            name: 'Cpu_utilization'
          }

          arp.push(ab)
        }
        // console.log(cpu_ut);

        if (response.data.Output.Memory_utilization) {
          const mp = [response.data.Output.Memory_utilization.cpu_utilization,

          response.data.Output.Memory_utilization.memory_utilization, response.data.Output.Memory_utilization.disk_busy, response.data.Output.Memory_utilization.disk_weighted, response.data.Output.Memory_utilization.cached, response.data.Output.Memory_utilization.dirty, response.data.Output.Memory_utilization.txbytes, response.data.Output.Memory_utilization.rxbytes]
          setMemory_ut(mp);

          var cd = {
            value: mp,
            name: 'Memory_utilization'
          }
          arp.push(cd)
        }

        if (response.data.Output.DiskBusy) {
          const dbp = [response.data.Output.DiskBusy.cpu_utilization, response.data.Output.DiskBusy.memory_utilization,
          response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted,
          response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted,
          response.data.Output.DiskBusy.cached, response.data.Output.DiskBusy.txbytes,
          response.data.Output.DiskBusy.rxbytes
          ]
          setDisk_ut(dbp);

          var ef = {
            value: dbp,
            name: 'DiskBusy'
          }

          arp.push(ef)
        }

        if (response.data.Output.DiskWeighted) {

          const dwp = [response.data.Output.DiskWeighted.cpu_utilization, response.data.Output.DiskWeighted.memory_utilization,
          response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted,
          response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted,
          response.data.Output.DiskWeighted.cached, response.data.Output.DiskWeighted.txbytes,
          response.data.Output.DiskWeighted.rxbytes]

          setDiskw_ut(dwp)

          var gh = {
            value: dwp,
            name: 'DiskWeighted'
          }
          arp.push(gh)
        }
      
        if(response.data.Output.max_values){
          const diff_value=[response.data.Output.max_values.cpu_utilization_max,response.data.Output.max_values.memory_utilization_max,
            response.data.Output.max_values.disk_busy_max,response.data.Output.max_values.disk_weighted_max]

            console.log(diff_value)
            dispatch(addMaxCpu(response.data.Output.max_values.cpu_utilization_max))
            dispatch(addMaxMemory(response.data.Output.max_values.memory_utilization_max))
            dispatch(addMaxDiskB(response.data.Output.max_values.disk_busy_max))
            dispatch(addMaxDiskW(response.data.Output.max_values.disk_weighted_max))
        }


        // console.log(arp)
        setMain(arp);
        // console.log(main)
         }).catch(error => {
        // handle the error
    }).finally(() => setOpen(false));
        setDikhao(true);


        setDikhao(false)
      }
      set_go_button();
    }
  }, [useSelector((state) => state.masking.temp)])


  const [mask, setMask] = React.useState(false);

  const bench_cpu = useSelector((state) => state.masking.bench_cpuUt)
  const bench_memoty = useSelector((state) => state.masking.bench_memUt)
  const bench_diskB = useSelector((state) => state.masking.bench_diskBusy)
  const bench_diskW = useSelector((state) => state.masking.bench_diskWeight)

  if(bench_cpu.length>0)
  {
    var xy=main
    
    var bench_mark=[]
    
    for(var i=0;i<xy.length;i++)
    {
      bench_mark.push(xy[i])
    }


    
  var  a1= {
       value:bench_cpu,
       name: 'b_Cpu_utilisation',lineStyle: {
         normal: {
           color: 'green',
           width: 0,
           type: 'dashed'
         }
       }
     }
     bench_mark.push(a1)
    var a2={
       value:bench_memoty,
       name: 'b_Memory_utilization',lineStyle: {
         normal: {
           color: 'green',
           width: 0,
           type: 'dashed'
         }
       }
     } 
     bench_mark.push(a2)
   var a3= {
       value:bench_diskB,
       name: 'b_DiskBusy',lineStyle: {
         normal: {
           color: 'green',
           width: 0,
           type: 'dashed'
         }
       }
     }
     bench_mark.push(a3)
   var  a4={
       value:bench_diskW,
       name: 'b_DiskWeighted',lineStyle: {
         normal: {
           color: 'green',
           width: 0,
           type: 'dashed'
         }
       }
       
     }
     bench_mark.push(a4)
    
     console.log(bench_mark)
     
  //  setMain(main=>[...main,bench_mark])
  // setMain(bench_mark)
  }

  // console.log(main)

  // console.log(bench_cpu)
  // console.log(bench_memoty)

  return (
    <Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <Grid className="content">
        <ThemeProvider theme={darkTheme} >

          <Muidash />
        </ThemeProvider>
      </Grid>
      <Grid id='echart'>
        <ThemeProvider theme={darkTheme} >{mask && <CombineBars names={arr} radar_value={
          [
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
              value: bench_cpu,
              name: 'b_CPU utilisation', lineStyle: {
                normal: {
                  color: 'green',
                  width: 0,
                  type: 'dashed'
                }
              }
            },
            {
              value: bench_memoty,
              name: 'b_Memory utilisation', lineStyle: {
                normal: {
                  color: 'green',
                  width: 0,
                  type: 'dashed'
                }
              }
            },
            {
              value: bench_diskB,
              name: 'b_Disk Busy', lineStyle: {
                normal: {
                  color: 'green',
                  width: 0,
                  type: 'dashed'
                }
              }
            },
            {
              value: bench_diskW,
              name: 'b_Disk Weight', lineStyle: {
                normal: {
                  color: 'green',
                  width: 0,
                  type: 'dashed'
                }
              }
            },
  
          ]
        } />}
          {/* {
          !mask && <PercenRadar/>
        } */}
        </ThemeProvider>
      </Grid>



    </Box>

  )
}
export default DashBoard;