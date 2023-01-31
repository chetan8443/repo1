import React from 'react'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./style.css"



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
import { useDispatch, useSelector } from 'react-redux'
import { seT1,seT2,seT3,seT4,setgovalue, add_benchCpu, add_benchDiskBusy, add_benchMemUt, add_benchDiskWeight, set_benchmark_host } from '../features/CounterSlice'
import RadarEx from './RadarEx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid(props) {

  const [age, setAge] = React.useState('');

  const [show, setShow] = useState(false);

  const [bench_host, setBench_host] = useState("");



  const dispatch = useDispatch();
  const handleChange = (event) => {
    setBench_host(event.target.value);
    get_bench_disk(event.target.value);

    dispatch(set_benchmark_host(event.target.value));



    // get_daterange();
  };
  const gov = useDispatch();

  const setvalue = () => {
    gov(setgovalue())
  }

  const [bench, setBench] = useState([]);
  const [bench_disk, setBench_disk] = useState([]);
  const [bench_nics, setBench_nics] = useState([]);


  const [bench_cpu_ut, setBench_cpu_ut] = useState([]);
  const [bench_memory_ut, setBench_memory_ut] = useState([]);
  const [bench_diskbusy, setBench_diskbusy] = useState([]);
  const [bench_diskweight, setBench_diskweight] = useState([]);



  const [isError, setIsError] = React.useState(false);


  const percen = useSelector((state) => state.masking.percentile)

  const cpuMax = useSelector((state) => state.masking.CpuUtMax);
  const memoryMax = useSelector((state) => state.masking.MemoryMax);
  const diskBusyMax = useSelector((state) => state.masking.DiskBusyMax);
  const diskWeightMax = useSelector((state) => state.masking.DiskWMax);
  const [cpu_difference,setCpudiff]=useState(0);
    const [disk_busy_difference,setDbsyiff]=useState(0);
    const [memory_difference,setMemdiff]=useState(0);
    const [disk_weighted_difference,setDskwetdiff]=useState(0);
  const benchComp = async () => {
    const obj = {
      workload: bench_host,
      Disk: selected_disk,
      nics: selected_nics,
      percentile: percen,
      cpu_utilization_max: cpuMax,
      memory_utilization_max: memoryMax,
      disk_busy_max: diskBusyMax,
      disk_weighted_max: diskWeightMax
    }
  
    const url = "http://127.0.0.1:5000/benchmark_comparison"
    setShow(true);
    const response = await axios.post(url, obj).then(response => {

      setCpudiff(response.data.Difference_values.cpu_difference)
      setDbsyiff(response.data.Difference_values.disk_busy_difference)
      setMemdiff(response.data.Difference_values.disk_weighted_difference)
      setDskwetdiff(response.data.Difference_values.memory_difference)


      const Cpu_utilization = [response.data.Cpu_utilization[0].cpu_utilization, 0, 0, 0, 0, 0, 0, 0]
     

      setBench_cpu_ut(response.data.Cpu_utilization[0].cpu_utilization);
      dispatch(add_benchCpu(Cpu_utilization));

      const Memory_utilization = [0, response.data.Memory_utilization[0].memory_utilization, 0, 0, 0, 0, 0, 0]

      setBench_memory_ut(response.data.Memory_utilization[0].memory_utilization);
      dispatch(add_benchMemUt(Memory_utilization));
      

      const Disk_busy = [0, 0,
        response.data.DiskBusy[0].disk_busy, 0, 0, 0, 0, 0]

      console.log(Disk_busy)

      setBench_diskbusy(response.data.DiskBusy[0].disk_busy);
      dispatch(add_benchDiskBusy(Disk_busy));

      const Disk_weight = [0, 0, 0, response.data.DiskWeighted[0].disk_weighted, 0, 0, 0, 0
      ]

      console.log(Disk_weight)
      setBench_diskweight(response.data.DiskWeighted[0].disk_weighted);
      dispatch(add_benchDiskWeight(Disk_weight));


      var ab = {
        value: Cpu_utilization,
        name: 'b_Cpu_utilization', lineStyle: {
          normal: {
            color: 'green',
            width: 0,
            type: 'dashed'
          }
        }
      }
      // bench_arr2.push(ab);
      // console.log(bench_arr2)

      // bench_arr=bench_arr.concat(bench_arr2);

      // console.log(bench_arr);

      // alert(bench_cpu_ut)






    }).catch(error => {
      alert(error)
      console.log(error)
    }).finally(() => setShow(false));
  }
  useEffect(() => {



    const getbench = async () => {
      const url = "http://127.0.0.1:5000/workload";
      const response = await axios.get(url)
      const res = response.data.workload
      setBench(res);
      // console.log(bench)

    }
    getbench();
  }, [])

  const get_bench_disk = async (e) => {
    const url = `http://127.0.0.1:5000/workload_disk?workload=${e}`;
    const response = await axios.get(url)
    const res = response.data.disk
    setBench_disk(res);
    get_bench_nics(e);
  }

  const get_bench_nics = async (e1) => {
    const url = `http://127.0.0.1:5000/workload_nics?workload=${e1}`;
    const response = await axios.get(url)
    const res = response.data.nics
    setBench_nics(res)
  }

  const [selected_disk, setSelected_disk] = useState("");
  const [selected_nics, setSelected_nics] = useState("");

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ paddingLeft: '170px' }}>



        <Grid container spacing={1}>

          <Grid item md={2}>
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
              //  error={isError}

              //  onChange={(e)=>{
              //     if (e.target.value < 0 || e.target.value > 100) {
              //       setIsError(true);
              //     }
              //     else{
              //       setIsError(false)
              //     }
              //  }}
              />
            </Box>
          </Grid>

          <Grid item md={2}>
            <FormControl sx={{ m: 2, minWidth: 150, maxWidth: 150 }}>
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
                    maxWidth: 250
                  },
                }}
              >
                {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
                {bench.map((index) =>
                  <MenuItem value={index} >{index}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>


          <Grid item md={2}>
            <FormControl sx={{ m: 2, minWidth: 155, maxWidth: 155 }}>
              <InputLabel id="demo-simple-select-label">Benchmark Disk</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected_disk}
                label="Benchmark Disk"
                onChange={
                  (e) => {
                    setSelected_disk(e.target.value);
                  }}

              >
                {bench_disk.map((index1) =>
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

                onChange={(e) => {
                  setSelected_nics(e.target.value)
                  console.log(selected_nics);
                }}
                label="Benchmark nics"

              >
                {bench_nics.map((index2) =>
                  <MenuItem value={index2} >{index2}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={1.5}>
            <Stack spacing={0} direction="row" style={{ padding: "11px 0px", margin: '15px' }}>
              <Button variant="contained"  onClick={() => { benchComp(); setvalue() }} >Go</Button>
            </Stack>


          </Grid>
        </Grid>
      </div>
      <RadarEx name={props.names} radar_value={props.radar_value} cpu_difference={cpu_difference} disk_busy_difference={disk_busy_difference}
     disk_weighted_difference={disk_weighted_difference} memory_difference={memory_difference}
     bench_cpu_ut={bench_cpu_ut} bench_memory_ut={bench_memory_ut} bench_diskbusy={bench_diskbusy} bench_diskweight={bench_diskweight}/>

    </>



  );
}
