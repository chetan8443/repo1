import React from 'react'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {add_benchCpu, add_benchDiskBusy, add_benchMemUt,add_benchDiskWeight} from '../features/CounterSlice'
import RadarEx from './RadarEx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {

  const [age, setAge] = React.useState('');

  const [bench_host,setBench_host]=useState("");

  
  const dispatch=useDispatch();
  const handleChange = (event) => {
    setBench_host(event.target.value);
    get_bench_disk(event.target.value);
    
    

    // get_daterange();
  };

  const [bench,setBench]=useState([]);
  const [bench_disk,setBench_disk]=useState([]);
  const [bench_nics,setBench_nics]=useState([]);


  const[bench_cpu_ut,setBench_cpu_ut]=useState([]);
  const[bench_memory_ut,setBench_memory_ut]=useState([]);
  const[bench_diskbusy,setBench_diskbusy]=useState([]);
  const[bench_diskweight,setBench_diskweight]=useState([]);

  localStorage.setItem('bench',bench_cpu_ut);

  const [isError, setIsError] = React.useState(false);
  // const [percen,setPercent]=useState(localStorage.getItem('percentile'));
  const percen=JSON.parse(localStorage.getItem('percentile'));
  if(percen!==JSON.parse(localStorage.getItem('percentile'))){
  localStorage.removeItem('percentile');}

    const benchComp=async()=>{
    
    
      // const Cpu_utilization= [
      //   9.4,19.510897536,9.80
      //   ,9.273810571,
      //   2.760,0,0,0
      // ]

      const obj={
          workload:bench_host,
          Disk:selected_disk,
          nics:selected_nics,
          percentile:percen 
      }

    //   const obj={
    //     workload:"specjbb-c2d-2vcpu8g_mm",
    //     Disk:"sda",
    //     "nics":"ens4",
    //     "percentile":98 
    // }

    const url="http://127.0.0.1:5000/benchmark_comparison"
    const response=await axios.post(url,obj)


      const Cpu_utilization=[response.data.Output.Cpu_utilization.cpu_utilization,

        response.data.Output.Cpu_utilization.memory_utilization, response.data.Output.Cpu_utilization.disk_busy,
         response.data.Output.Cpu_utilization.disk_weighted, response.data.Output.Cpu_utilization.cached, response.data.Output.Cpu_utilization.dirty,
         response.data.Output.Cpu_utilization.txbytes, response.data.Output.Cpu_utilization.rxbytes]

      setBench_cpu_ut(Cpu_utilization);

      const Memory_utilization=[response.data.Output.Memory_utilization.cpu_utilization,

        response.data.Output.Memory_utilization.memory_utilization, response.data.Output.Memory_utilization.disk_busy,
         response.data.Output.Memory_utilization.disk_weighted, response.data.Output.Memory_utilization.cached, response.data.Output.Memory_utilization.dirty,
         response.data.Output.Memory_utilization.txbytes, response.data.Output.Memory_utilization.rxbytes]

         setBench_memory_ut(Memory_utilization);

         const Disk_busy=[response.data.Output.DiskBusy.cpu_utilization, response.data.Output.DiskBusy.memory_utilization,
          response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted,
          response.data.Output.DiskBusy.disk_busy, response.data.Output.DiskBusy.disk_weighted,
          response.data.Output.DiskBusy.cached, response.data.Output.DiskBusy.txbytes,
          response.data.Output.DiskBusy.rxbytes]

          setBench_diskbusy(Disk_busy);

          const Disk_weight=[response.data.Output.DiskWeighted.cpu_utilization, response.data.Output.DiskWeighted.memory_utilization,
            response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted,
            response.data.Output.DiskWeighted.disk_busy, response.data.Output.DiskWeighted.disk_weighted,
            response.data.Output.DiskWeighted.cached, response.data.Output.DiskWeighted.txbytes,
            response.data.Output.DiskWeighted.rxbytes]

            setBench_diskweight(Disk_weight);
    // alert(bench_cpu_ut)
    dispatch(add_benchCpu(bench_cpu_ut));
    dispatch(add_benchMemUt());
    dispatch(add_benchDiskBusy());
    dispatch(add_benchDiskWeight());
    }


   
  useEffect(()=>{



    const getbench=async ()=>{
      const url="http://127.0.0.1:5000/workload";
      const response= await axios.get(url)
      const res=response.data.workload
      setBench(res);
      // console.log(bench)
    
    }
    getbench();
  },[])

  const get_bench_disk = async (e)=>{
    const url=`http://127.0.0.1:5000/workload_disk?workload=${e}`;
     const response= await axios.get(url)
     const res=response.data.disk
     setBench_disk(res);
     get_bench_nics(e);
  }

  const get_bench_nics = async (e1)=>{
    const url=`http://127.0.0.1:5000/workload_nics?workload=${e1}`;
    const response=await axios.get(url)
    const res=response.data.nics
    setBench_nics(res)
  }

  const [selected_disk,setSelected_disk]=useState("");
   const [selected_nics,setSelected_nics]=useState("");




  return (
    <>
    
   
      
      <Grid container spacing={1}>

        <Grid item  md={2}>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, minWidth: 150 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Percentile" variant="outlined" 
      defaultValue={percen} 
       error={isError}

       onChange={(e)=>{
          if (e.target.value < 0 || e.target.value > 100) {
            setIsError(true);
          }
          else{
            setIsError(false)
          }
       }}
      />
    </Box>
        </Grid>
        
        <Grid item  md={2}>
        <FormControl sx={{ m: 2, minWidth: 150,maxWidth:150 }}>
        <InputLabel id="demo-simple-select-label">Benchmark</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bench_host}
          label="Benchmark"
          onChange={handleChange}
          MenuProps={{
            style: {
               maxHeight: 250,
               maxWidth:250
                  },
            }}
        >
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {bench.map((index)=>
              <MenuItem value={index} >{index}</MenuItem>
              )}
        </Select>
      </FormControl>
        </Grid>

        
        <Grid item md={2}>
        <FormControl sx={{ m: 2, minWidth: 155 }}>
        <InputLabel id="demo-simple-select-label">Benchmark Disk</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected_disk}
          label="Benchmark Disk"
          onChange={
            (e)=>{
              setSelected_disk(e.target.value);
          }}
          
        >
          {bench_disk.map((index1)=>
              <MenuItem value={index1} >{index1}</MenuItem>
              )}
        </Select>
      </FormControl>
        </Grid>

        
        <Grid item xs={0} md={2}>
        <FormControl sx={{ m: 2, minWidth: 155 }}>
        <InputLabel id="demo-simple-select-label">Benchmark nics</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected_nics}
          
          onChange={(e)=>{
            setSelected_nics(e.target.value)
            console.log(selected_nics);
          }}
          label="Benchmark nics"
          
        >
          {bench_nics.map((index2)=>
              <MenuItem value={index2} >{index2}</MenuItem>
              )}
        </Select>
      </FormControl>
        </Grid>

        <Grid item  md={1.5}>
        <Stack spacing={0} direction="row" style={{ padding: "11px 0px" ,margin:'15px' }}>
          <Button variant="contained" onClick={benchComp} >Go</Button>
          </Stack>


        </Grid>
        </Grid>
        <RadarEx />

        </>
    
   
  );
}
