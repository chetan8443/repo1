import { AddToHomeScreenTwoTone, StarTwoTone } from '@material-ui/icons';
import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    count: false,
    c1: 0,
    ab:{
      Host:`{localStorage.getItem('hostname')}`,
      Disk: `{localStorage.getItem('disk')}`,
      nics: `{localStorage.getItem('nics')}`,
      percentile: JSON.parse(localStorage.getItem('percentile')),
      start_date: "2022-06-22 00:00:00",
      end_date: "2022-06-28 00:00:00",
      Data_focus: ["Cpu_utilization", "Memory_utilization", "DiskBusy", "DiskWeighted"]
  }
   }
   

export const counterSlice = createSlice({
  name: 'masking',
  initialState: {
    count: false,
    c1:0,
    Hostname:"",
    DiskName:"",
    nicsName:"",
    percentile:0,
    cpu_ut:"",
    memory_ut:"",
    disk_bs:'',
    disk_ut:"",
    start_d:"",
    end_d:"",
    temp:0,
    percentile1:0,
    percentile2:0,
    bench_cpuUt:[],
    bench_memUt:null,
    bench_diskBusy:null,
    bench_diskWeight:null,
    arrP1:null,
    arrP2:null,
    showPercentile:false,
    cpu_checkbox:"",
    memory_checkbox:"",
    diskbusy_checkbox:"",
    diskweight_checkbox:"",
    count1:2,
    count2:2,
    count3:2,
    count4:0,
    benchmark_host:"",
    CpuUtMax:0,
    MemoryMax:0,
    DiskBusyMax:0,
    DiskWMax:0,
    govalue:false,
    
  },
  reducers: {
 
    resetAll:(state)=>{
     state.c1=0
     state.Hostname=""
     state.DiskName=""
     state.nicsName=""
     state.percentile=0
     state.cpu_ut=""
     state.memory_ut=""
     state.disk_bs=''
     state.disk_ut=""
     state.start_d=""
     state.end_d=""
     state.temp=0
     state.percentile1=0
     state.percentile2=0
     state.bench_cpuUt=[]
     state.bench_memUt=[]
     state.bench_diskBusy=[]
     state.bench_diskWeight=[]
     state.arrP1=null
     state.arrP2=null
     state.showPercentile=false
     state.cpu_checkbox=""
     state.memory_checkbox=""
     state.diskbusy_checkbox=""
     state.diskweight_checkbox=""
     state.count1=2
     state.count2=2
     state.count3=2
     state.count4=0
     state.benchmark_host=""
     state.govalue=false
     state.CpuUtMax=0
     state.MemoryMax=0
     state.DiskBusyMax=0
     state.DiskWMax=0
    },
    setgovalue:(state)=>{
      state.govalue=true
 
    },
    changeState:(state)=>{
      state.count=true
      state.temp+=1
    },
    change_when_route:(state)=>{
      state.count=false
      state.temp+=1
    },
    addData_res:(state,action)=>{
      state.ab=action.payload
    },
    add_host:(state,action)=>
    {
        state.Hostname=action.payload
    },
    add_Disk:(state,action)=>
    {
        state.DiskName=action.payload
    },
    add_Nikc:(state,action)=>
    {
        state.nicsName=action.payload
    },
    add_percentile:(state,action)=>
    {
        state.percentile=action.payload
    },
    mt_add:(state,action)=>
    {
        state.memory_ut=action.payload
    },
    cpu_add:(state,action)=>
    {
        state.cpu_ut=action.payload
    },
    diskbusy_add:(state,action)=>
    {var count=2;
      if(count%2==0)
      {
     state.disk_bs=action.payload
     count++;
      }else
      {
      state.disk_bs=""
      count++
      }
    
    },
    disk_ut:(state,action)=>
    {
      state.disk_ut=action.payload
    },
    date1:(state,action)=>{
       state.start_d=action.payload
    },
    date2:(state,action)=>{
      state.end_d=action.payload
   },
   add_percentile1:(state,action)=>{
    state.percentile1=action.payload
   },
   add_percentile2:(state,action)=>{
    state.percentile2=action.payload
   },
   add_benchCpu:(state,action)=>{
    // alert(action.payload)
    state.bench_cpuUt=action.payload
   },
   add_benchMemUt:(state,action)=>{
    // alert(action.payload)
    state.bench_memUt=action.payload
   },
   add_benchDiskBusy:(state,action)=>{
    // alert(action.payload)
    state.bench_diskBusy=action.payload
   },
   add_benchDiskWeight:(state,action)=>{
    // alert(action.payload)
    state.bench_diskWeight=action.payload
   },
   add_arrp1:(state,action)=>{
    state.arrP1=action.payload
   },
   add_arrp2:(state,action)=>{
    state.arrP2=action.payload
   },
   change_percentile:(state)=>{
    state.showPercentile=true
    state.count=false
    // state.temp+=1
   },
   cpu_checkbox_func:(state,action)=>{
    if(state.count1%2==0){
    state.cpu_checkbox="Cpu_utilization"
      state.count1++;
  }
    else{
      state.cpu_checkbox=""
    }
   },
   set_benchmark_host:(state,action)=>
    {
        state.benchmark_host=action.payload
    },
   memory_checkbox_func:(state,action)=>{
    if(state.count2 % 2==0){
     state.memory_checkbox="Memory_utilization"
      state.count2++;
    }
    else{
      state.memory_checkbox="";
    }
   },
   diskbusy_checkbox_func:(state,action)=>{
    if(state.count3 % 2==0){
      state.diskbusy_checkbox="DiskBusy"
      state.count3++;
    }
    else{
      state.diskbusy_checkbox=""
    }
   },diskweight_checkbox_func:(state,action)=>{
    if(state.count4%2==0){
      state.diskweight_checkbox="DiskWeighted"
      state.count4++;
    }
    else{
      state.diskweight_checkbox=""
    }
   },
   addMaxCpu:(state,action)=>{
    state.CpuUtMax=action.payload
   
  },
  addMaxMemory:(state,action)=>{
    state.MemoryMax=action.payload
   
  },
  addMaxDiskB:(state,action)=>{
    state.DiskBusyMax=action.payload
   
  },
  addMaxDiskW:(state,action)=>{
    state.DiskWMax=action.payload
   
  },
  }
})


export const {resetAll,changeState,addData_res,add_host ,add_Disk,add_Nikc,add_percentile,disk_ut,diskbusy_add,cpu_add,mt_add,date1,date2,
add_percentile1,add_percentile2,add_benchCpu,add_arrp1,add_arrp2,change_percentile,cpu_checkbox_func,memory_checkbox_func,
diskbusy_checkbox_func,diskweight_checkbox_func,add_benchMemUt,add_benchDiskBusy,add_benchDiskWeight
,set_benchmark_host,change_when_route,addMaxDiskW,addMaxCpu,addMaxMemory,addMaxDiskB,setgovalue} = counterSlice.actions

export default counterSlice.reducer