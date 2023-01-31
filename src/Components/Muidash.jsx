import React, { useState } from 'react';
import {Box, Checkbox, FormControlLabel, Grid} from '@mui/material';
import Drops from './Drops';
import Cal from "./Cal";
import { useDispatch } from 'react-redux';
import { cpu_checkbox_func, memory_checkbox_func,diskbusy_checkbox_func,diskweight_checkbox_func } from '../features/CounterSlice';


const Muidash = () => {

    const[cpu_checked,setCpu_checked]=useState(false);
    const[memory_checked,setMemory_checked]=useState(false);
    const[disk_busy_checked,setDisk_busy_checked]=useState(false);
    const[disk_weight_checked,setDisk_weight_checked]=useState(false);

    const dispatch=useDispatch();

    const handleCpu = (event) => {
      
      setCpu_checked(event.target.checked);
      // console.log(event.target.checked);
      dispatch(cpu_checkbox_func())
      localStorage.setItem('cpu',event.target.checked);
      // console.log(cpu_checked)
    };
  
    const handleMemory = (event) => {
      setMemory_checked(event.target.checked);
      dispatch(memory_checkbox_func())
      localStorage.setItem('memory',event.target.checked);
      // console.log(memory_checked)
    };

    const handleDiskBusy = (event) => {
      setDisk_busy_checked(event.target.checked);
      dispatch(diskbusy_checkbox_func())
      localStorage.setItem('disk_busy',event.target.checked);
      // console.log(disk_busy_checked)
    };

    const handleDiskWeight = (event) => {
      setDisk_weight_checked(event.target.checked);
      dispatch(diskweight_checkbox_func())
      localStorage.setItem('disk_weight',event.target.checked);
      // console.log(disk_weight_checked)
    };


  return (
    <>
      <Grid  container spacing={2}>
        <Grid item md={3}>
          <FormControlLabel
            label='CPU utilization'
            control={<Checkbox checked={cpu_checked} onChange={handleCpu}/>}
            />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label='Memory utilization'
            control={<Checkbox checked={memory_checked} onChange={handleMemory} />}
            />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label='Disk Busy'
            control={<Checkbox checked={disk_busy_checked} onChange={handleDiskBusy}/>}
            />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label='Disk Weighted'
            control={<Checkbox checked={disk_weight_checked} onChange={handleDiskWeight}/>}
            />
            
        </Grid>
      
    
        <Drops />
      
      </Grid>
      {/* <div>
       
        
      </div> */}
    </>
    
  )
}

export default Muidash
