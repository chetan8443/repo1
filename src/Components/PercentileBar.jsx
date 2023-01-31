import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { add_arrp1, add_arrp2, change_percentile } from '../features/CounterSlice'
import RadarEx from './RadarEx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import P_radar from './P_radar';

export default function PercentileBar() {


    const [isError, setIsError] = React.useState(false);
    const [percen, setPercent] = React.useState();


    const [isError1, setIsError1] = React.useState(false);
    const [percen1, setPercent1] = React.useState();

    const [percen_demo1, setPercen_demo1] = useState([]);
    const [percen_demo2, setPercen_demo2] = useState([]);


    const dispatch = useDispatch();

    // const arr = [];
    // if ((useSelector((state)=>state.masking.cpu_checkbox))) {
    //     arr.push("CPU Utilisation");
    //     if (cpu1 == "false") {
    //         delete arr[arr.indexOf("cpu1")]
    //     }
    // }
    // if ((mpu1 = localStorage.getItem('memory')) == "true") {
    //     arr.push("Memory Utilisation");
    //     if (mpu1 == "false") {
    //         delete arr[arr.indexOf("mpu1")]
    //     }
    // }
    // if ((diskb = localStorage.getItem('disk_busy')) == "true") {
    //     arr.push("Disk Busy");
    //     if (diskb == "false") {
    //         delete arr[arr.indexOf("diskb")]
    //     }
    // }
    // if ((diskw = localStorage.getItem('disk_weight')) == "true") {
    //     arr.push("Disk Weight");
    //     if (diskw == "false") {
    //         delete arr[arr.indexOf("diskw")]
    //     }
    // }

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
    console.log(arr)

    console.log(percen)
    console.log(percen1)

    const host = useSelector((state) => state.masking.Hostname)
    const disk = useSelector((state) => state.masking.DiskName)
    const nics = useSelector((state) => state.masking.nicsName)
    const [data_focus, setData_focus] = useState("");

    const [open, setOpen] = React.useState(false);





    const percentileComp = async () => {
        const url = "http://127.0.0.1:5000/percentile_comparison";
        setOpen(true);
        const response = await axios.post(url, {
            Host: host,
            Disk: disk,
            nics: nics,
            percentile1: percen,
            percentile2: percen1,
            Data_focus: data_focus
        }).then(response => {

            const percentile1 = [response.data.percentile1.cpu_utilization, response.data.percentile1.memory_utilization,
            response.data.percentile1.cached, response.data.percentile1.dirty, response.data.percentile1.txbytes,
            response.data.percentile1.rxbytes, response.data.percentile1.disk_busy, response.data.percentile1.disk_weighted]

            const percentile2 = [response.data.percentile2.cpu_utilization, response.data.percentile2.memory_utilization,
            response.data.percentile2.cached, response.data.percentile2.dirty, response.data.percentile2.txbytes,
            response.data.percentile2.rxbytes, response.data.percentile2.disk_busy, response.data.percentile2.disk_weighted]

            // console.log(percentile1);

            setPercen_demo1(percentile1);
            setPercen_demo2(percentile2);

            dispatch(add_arrp1(percen_demo1));
            dispatch(add_arrp2(percen_demo2));

            dispatch(change_percentile())
        }).catch(error => {
            // handle the error
        }).finally(() => setOpen(false))



    }

    return (
        <>
         <div style={{paddingLeft:'170px'}}>
        <Box>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>

            <Grid container spacing={1}>

                <Grid md={2.1}>
                    <FormControl sx={{ m: 3, minWidth: 155,maxWidth:160 }}>
                        <InputLabel id="demo-simple-select-label">Data Focus</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //   value={}
                            label="Data Focus"
                            onChange={(event)=>{
                                setData_focus(event.target.value)
                            }}

                        >
                            {
                                arr.map((index) =>
                                    <MenuItem value={index} >{index}</MenuItem>
                                )}

                        </Select>
                    </FormControl>
                </Grid>


                <Grid item md={2}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 2, minWidth: 160 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Percentile1" variant="outlined"
                            error={isError}

                            onChange={(e) => {
                                setPercent(e.target.value)
                                if (e.target.value < 0 || e.target.value > 100) {
                                    setIsError(true);
                                }
                                else {
                                    setIsError(false)
                                }
                            }} />
                    </Box>
                </Grid>

                <Grid item md={2.1}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 2, minWidth: 160 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Percentile2" variant="outlined"
                            error={isError1}

                            onChange={(e) => {
                                setPercent1(e.target.value)
                                if (e.target.value < 0 || e.target.value > 100) {
                                    setIsError1(true);
                                }
                                else {
                                    setIsError1(false)
                                }
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item md={1.5}>
                    <Stack spacing={0} direction="row" style={{ padding: "11px 0px", margin: '15px' }}>
                        <Button variant="contained" onClick={percentileComp}>Go</Button>
                    </Stack>


                </Grid>


            </Grid>

        </Box>
        </div>
         <div style={{width:'1500px'}}>
            <P_radar names={["Percentile 1","Percentile 2"]} rdata={
            [
                {
                    value:percen_demo1,
                    name:"Percentile 1"
                },
                {
                    value:percen_demo2,
                    name:"Percentile 2"
                }
            ]
        }/>
    
         </div>
 </>
        
    )
}