import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import Cal from "./Cal";
import Grid from "@mui/material/Grid";
import axios from 'axios';

import SpecificDate from "./SpecificDate";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector ,useDispatch } from 'react-redux'
// import getHostname from "./services/service_api";

// import { register,useForm} from "react-hook-form";
import { changeState,addData_res,add_host , add_Disk, add_Nikc,add_percentile,date1,date2} from "../features/CounterSlice";

export default function SelectAutoWidth() {

  const [hostap, setHostap] = React.useState("");
// const [isbuttondisable,setIsbuttondisable]=(true);

  const [val, setVal] = React.useState(1);

  const [redux_obj,setRedux_obj]=React.useState({
    Host:`{localStorage.getItem('hostname')}`,
    Disk: `{localStorage.getItem('disk')}`,
    nics: `{localStorage.getItem('nics')}`,
    percentile: JSON.parse(localStorage.getItem('percentile')),
    start_date: "2022-06-22 00:00:00",
    end_date: "2022-06-28 00:00:00",
    Data_focus: ["Cpu_utilization", "Memory_utilization", "DiskBusy", "DiskWeighted"]
}
    )

  const rdx=useDispatch()

  const handleRedux=()=>{
    const h1=localStorage.getItem('hostname');
      const h2=localStorage.getItem('disk');
      const h3=localStorage.getItem('nics');
      const h4=JSON.parse(localStorage.getItem('percentile'));

      const ooo={Host:h1,Disk:h2,nics:h3,percentile:h4,start_date: "2022-06-22 00:00:00",
      end_date: "2022-06-28 00:00:00",
      Data_focus: ["Cpu_utilization", "Memory_utilization", "DiskBusy", "DiskWeighted"]}
     setRedux_obj({
      Host:"td_synnex_4",
      Disk: "sda",
      nics: "ens4",
      percentile: 98,
      start_date: "2022-06-22 00:00:00",
      end_date: "2022-06-28 00:00:00",
      Data_focus: ["Cpu_utilization", "Memory_utilization", "DiskBusy", "DiskWeighted"]
  })
    dispach(changeState())
    rdx( addData_res(redux_obj))
  
  }



  const handleChange = (event) => {
    setHostap(event.target.value);
    rdx(add_host(event.target.value))
    localStorage.setItem('hostname', JSON.stringify(event.target.value));
    // localStorage.setItem('disk', JSON.stringify("2022-06-21",
    // "2022-06-28"));
    get_disk_nics(event.target.value);
    
    // get_daterange();
  };
  // const [Date, setDate] = React.useState("");

  const [show,setShow]=React.useState();
  const handleDate = (event) => {
   
    if(event.target.value==0)
    { setShow(true);
      setLb("Specific Date");
      setVal(0);
    }
    
    else
    { setShow(false);
      setLb("Date Range");
      setVal(1);
    }
  };



  const [lb,setLb] = React.useState("Date Range");
  
   React.useEffect(()=>{
    const getdata=async ()=>{
      const url="http://127.0.0.1:5000/get_hostname";
      const response= await axios.get(url)
      const res=response.data.host
      setList(res);
      // console.log(list)
//     if(selected_nics && hostap)
// {


//   setIsbuttondisable(false);

//   }

    }
 
    getdata();
    
   },[])

   const get_disk_nics = async (e)=>{
    //  const url=;
      // const response= await axios.get("http://127.0.0.1:5000/disk?host=td_synnex_4")
      const response= await axios.get(`http://127.0.0.1:5000/disk?host=${e}`)
      const res=response.data.disk
      setDisk_list(res);
      get_nics(e);
   }

   const get_nics = async (e1)=>{
    const url=`http://127.0.0.1:5000/nics?host=${e1}`;
    const response=await axios.get(url)
    const res=response.data.nicks
    setNics_list(res)
    get_daterange(e1)
  }

  const get_daterange=async (e2)=>{
    const url=`http://127.0.0.1:5000/start_end?host=${e2}`;
    const response=await axios.get(url)
    const res=response.data.Timestamp
    // console.log(res[0])
    setDaterange(res)
    rdx(date1(res[0]))
    rdx(date2(res[1]))
    
  }


   const [list,setList]=useState([]);
   const [disk_list,setDisk_list]=useState([]);
   const [nics_list,setNics_list]=useState([]);
   const [daterange,setDaterange]=useState(null);

   ;

   const dispach =useDispatch();

   const [isError, setIsError] = React.useState(false);
   const [selected_disk,setSelected_disk]=useState("");
   const [selected_nics,setSelected_nics]=useState("");
   const [percen,setPercent]=useState();

 
   

  return (
    <>
      <Grid item md={1.875} sm={4} >
        <FormControl sx={{ m: 0, minWidth: 180,maxWidth:180 }}>
           <InputLabel id="demo-simple-select-autowidth-label">
             Native Workload
           </InputLabel>
           <Select
             labelId="demo-simple-select-autowidth-label"
             id="demo-simple-select-autowidth"
             value={hostap}
             onChange={handleChange}
             autoWidth
             label="Native Workload"
             MenuProps={{
              style: {
                 maxHeight: 300,
                 maxWidth:280
                    },
              }}
           >
              {/* {options.map({value,label}(index) => 
              <MenuItem value={label} >{label}</MenuItem>

              )} */}

              {list.map((index)=>
              <MenuItem value={index} >{index}</MenuItem>
              )}
           </Select>
         </FormControl>
      </Grid>
      <Grid item md={1.5} sm={4} >
        <FormControl sx={{ m: 0, minWidth: 130 }}>
           <InputLabel id="demo-simple-select-autowidth-label">Disk</InputLabel>
           <Select
            required
             labelId="demo-simple-select-autowidth-label"
             id="demo-simple-select-autowidth"
            value={selected_disk}
            onChange={(e)=>{
              setSelected_disk(e.target.value);
              rdx(add_Disk(e.target.value))
              localStorage.setItem('disk', JSON.stringify(e.target.value));
              // console.log(selected_disk)
            }}
             autoWidth
             label="Disk"
           >
             {/* <MenuItem value="">
               <em>None</em>
             </MenuItem> */}
             {disk_list.map((index1)=>
              <MenuItem value={index1} >{index1}</MenuItem>
              )}
           </Select>
         </FormControl>
      </Grid>
      <Grid item md={1.5} sm={4}>
        <FormControl sx={{ m: 0, minWidth: 130 }}>
           <InputLabel id="demo-simple-select-autowidth-label">Nics</InputLabel>
           <Select
             required
             labelId="demo-simple-select-autowidth-label"
             id="demo-simple-select-autowidth"
            value={selected_nics}
             autoWidth
             label="Nics"
             onChange={(e)=>{
              setSelected_nics(e.target.value);
              rdx(add_Nikc(e.target.value))
              localStorage.setItem('nics', JSON.stringify(e.target.value));
              // console.log(selected_nics);
            }}
            
           >
             {/* <MenuItem value="">
               <em>None</em>
             </MenuItem> */}
            {nics_list.map((index2)=>
              <MenuItem value={index2} >{index2}</MenuItem>
              )}
         </Select>
         </FormControl>
      </Grid>
      <Grid item md={1.875} sm={4}>
        <TextField
           id="outlined-basic"
           label="Percentile"
           variant="outlined"
           sx={{ midWidth: 30 }}
           error={isError}
          //  name="Percentile"
          //   inputRef={register({
          //     required: "Percentile required",
          //   })}
          //   error={Boolean(errors.firstName)}
          //   helperText={errors.firstName?.message}

           onChange={(e)=>{
              setPercent(e.target.value)
              localStorage.setItem('percentile', JSON.stringify(e.target.value));
              if (e.target.value < 0 || e.target.value > 100) {
                setIsError(true);
              }
              else{
                setIsError(false)
                rdx(add_percentile(e.target.value))
              }
           }}
         />
      </Grid>
      <Grid item md={1.875} sm={3}>
        <FormControl sx={{ mx: 0 , minWidth: 180 }}>
           <InputLabel id="demo-simple-select-autowidth-label">
            {lb}
           </InputLabel>
           <Select
             labelId="demo-simple-select-autowidth-label"
             id="demo-simple-select-autowidth"
             value={val}
             onChange={handleDate}
             autoWidth
             label={"Date Option"}
            
           >
             {/* <MenuItem value="">
               <em>None</em>
             </MenuItem> */}
             <MenuItem value={0}>Specific date</MenuItem>
             <MenuItem value={1}>Date Range</MenuItem>
           </Select>
         </FormControl>
      </Grid>
      <Grid item md={1.875} sm={4}>
        {show ? <SpecificDate /> 
         : <Cal/>}
      </Grid> 
      <Grid item md={1.5} sm={1}>
        <Stack spacing={0} direction="row" style={{ padding: "11px 0px" }}>
           <Button variant="contained" onClick={handleRedux}
           disabled={!selected_nics}
           >Go</Button>
         </Stack>
      </Grid>
      
    </>
  );
}
