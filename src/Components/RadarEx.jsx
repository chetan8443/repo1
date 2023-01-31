import React, { useEffect } from 'react'
import ReactECharts from 'echarts-for-react';
import BenchMarkBar from './BenchMarkBar'
import PercentileBar from './PercentileBar';
import CombineBars from './CombineBars';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider, Grid, CardActionArea, Card, Box } from '@mui/material';



function RadarEx(props) {

  const start_d = useSelector((state) => state.masking.start_d)
  const [render,setrender]=useState(null);

  const cpu_checkbox_redux = useSelector((state) => state.masking.cpu_checkbox)
  const memory_checkox_redux = useSelector((state) => state.masking.memory_checkbox)
  const diskbusy_checkbox_redux = useSelector((state) => state.masking.diskbusy_checkbox)
  const diskweight_checkbox_redux = useSelector((state) => state.masking.diskweight_checkbox)
  const govalue = useSelector((state) => state.masking.govalue)
  console.log(props);
console.log(props.cpu_difference);
  const bhost = useSelector((state) => state.masking.benchmark_host)
  
  var cpcheck="";
  var busycheck="";
 var memcheck="";
  var wetcheck="";


 
  const arr = []
  const arr1 = []
  if (cpu_checkbox_redux.length > 0) {
    arr.push(cpu_checkbox_redux)
    cpcheck=start_d;
    // arr1.push("cpu")
    

    // cpuofcpu=props.radar_value[0].value[0]
    // memofcpu=props.radar_value[0].value[1]
    // busyofcpu=props.radar_value[0].value[2]
    // wetofcpu=props.radar_value[0].value[3]
  }
  if (memory_checkox_redux.length > 0) {
    arr.push(memory_checkox_redux)
    memcheck=start_d;
    // arr1.push("memory")
    // cpuofmem=props.radar_value[1].value[0]
    // memofcpu=props.radar_value[1].value[1]
    // busyofcpu=props.radar_value[1].value[2]
    // wetofcpu=props.radar_value[1].value[3]
  }
  if (diskbusy_checkbox_redux.length > 0) {
    arr.push(diskbusy_checkbox_redux)
     busycheck=start_d;
    //  arr1.push("diskbusy")
    //  cpuofbusy=props.radar_value[2].value[0]
    //  memofbusy=props.radar_value[2].value[1]
    //  busyofbusy=props.radar_value[2].value[2]
    //  wetofbusy=props.radar_value[2].value[3]
  }
  if (diskweight_checkbox_redux.length > 0) {
    arr.push(diskweight_checkbox_redux)
     wetcheck=start_d;
    //  arr1.push("diskweight")
    //  cpuofwet=props.radar_value[3].value[0]
    //  memofwet=props.radar_value[3].value[1]
    //  busyofwet=props.radar_value[3].value[2]
    //  wetofwet=props.radar_value[3].value[3]
  }







  useEffect(()=>{setrender(props.radar_value)},[render])

  const defaultMaterialTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  const datatable1 =
    [
      { datafocus:'Cpu Utilisation' , time_stamp: cpcheck, variation: props.cpu_difference },
      { datafocus:'Memory Utilisation' , time_stamp:  memcheck , variation: props.disk_busy_difference},
      { datafocus:'Disk busy' , time_stamp:  busycheck , variation: props.disk_weighted_difference},
      { datafocus:'Disk weighted' , time_stamp: wetcheck , variation: props.memory_difference },

    ]



var cpuofmem=parseFloat(props.radar_value[0].value[1]).toFixed(2)
 var   memofmem=parseFloat(props.radar_value[1].value[1]).toFixed(2)
  var  busyofmem=parseFloat(props.radar_value[2].value[1]).toFixed(2)
   var wetofmem= parseFloat(props.radar_value[3].value[1]).toFixed(2)

    const datatable2 =
    [
      { attributes:'Cpu Utilisation',
       Cpu_Utilization:       parseFloat( props.radar_value[0].value[0]).toFixed(2),
        Memory_Utilization:   parseFloat(props.radar_value[1].value[0]).toFixed(2),
        Disk_weighted:        parseFloat(props.radar_value[2].value[0]).toFixed(2),
        Disk_busy:            parseFloat(props.radar_value[3].value[0]).toFixed(2),
      
        },
      { attributes:'Memory Utilisation' ,
        Cpu_Utilization:  cpuofmem==NaN? " ":cpuofmem,
         Memory_Utilization:  memofmem==NaN?"":memofmem,
         Disk_weighted:     busyofmem==NaN?"":busyofmem,  
         Disk_busy:       wetofmem==NaN?"":wetofmem,   
        
         },
         { attributes:'Disk busy', 
         Cpu_Utilization:       parseFloat(props.radar_value[0].value[2]).toFixed(2),
          Memory_Utilization:   parseFloat(props.radar_value[1].value[2]).toFixed(2),
          Disk_weighted:        parseFloat(props.radar_value[2].value[2]).toFixed(2), 
          Disk_busy:           parseFloat(props.radar_value[3].value[2]).toFixed(2),
       
        },
         { attributes:'Disk weighted', 
       Cpu_Utilization:       parseFloat(props.radar_value[0].value[3]).toFixed(2),
       Memory_Utilization:    parseFloat(props.radar_value[1].value[3]).toFixed(2),
       Disk_weighted:        parseFloat( props.radar_value[2].value[3]).toFixed(2),
         Disk_busy:       parseFloat(props.radar_value[3].value[3]).toFixed(2),
       },
       { attributes:'cached', 
       Cpu_Utilization:       parseFloat(props.radar_value[0].value[4]).toFixed(2),
       Memory_Utilization:    parseFloat(props.radar_value[1].value[4]).toFixed(2),
       Disk_weighted:        parseFloat( props.radar_value[2].value[4]).toFixed(2),
         Disk_busy:       parseFloat(props.radar_value[3].value[4]).toFixed(2),
       },
       { attributes:'txbytes', 
       Cpu_Utilization:       parseFloat(props.radar_value[0].value[5]).toFixed(2),
       Memory_Utilization:    parseFloat(props.radar_value[1].value[5]).toFixed(2),
       Disk_weighted:        parseFloat( props.radar_value[2].value[5]).toFixed(2),
         Disk_busy:       parseFloat(props.radar_value[3].value[5]).toFixed(2),
       },
       { attributes:'rxbytes', 
       Cpu_Utilization:       parseFloat(props.radar_value[0].value[6]).toFixed(2),
       Memory_Utilization:    parseFloat(props.radar_value[1].value[6]).toFixed(2),
       Disk_weighted:        parseFloat( props.radar_value[2].value[6]).toFixed(2),
         Disk_busy:       parseFloat(props.radar_value[3].value[6]).toFixed(2),
       },
     
      

    ]

    const bench_cpu = useSelector((state) => state.masking.bench_cpuUt)
  const bench_memoty = useSelector((state) => state.masking.bench_memUt)
  const bench_diskB = useSelector((state) => state.masking.bench_diskBusy)
  const bench_diskW = useSelector((state) => state.masking.bench_diskWeight)

  

    const datatable3 =
    [
      { attributes:'Cpu Utilisation' , cpuvalues:props.bench_cpu_ut, variation: props.cpu_difference },
      { attributes:'Memory Utilisation' ,  cpuvalues:props.bench_memory_ut, variation:props.disk_busy_difference},
      { attributes:'Disk busy' ,  cpuvalues: props.bench_diskbusy, variation: props.disk_weighted_difference},
      { attributes:'Disk weighted' , cpuvalues: props.bench_diskweight , variation: props.memory_difference},
     

    ]

  const [cpu_ut, setCpu_ut] = React.useState([])
  // const [memory_ut, setMemory_ut] = useState([])
  // const [disk_ut, setDisk_ut] = useState([])
  // const [diskw_ut, setDiskw_ut] = useState([])


  // const [bench_cp, setBench_cp] = useState([]);
  // const [bench_mp, setBench_mp] = useState([]);

  const [go_button, setGo_button] = useState({});

  const maskSetter = useSelector((state) => state.masking.ab)


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
    { name: 'Cpu Utilization' },
    { name: 'memory utilization' },
    { name: 'disk busy' },
    { name: 'disk weighted' },
    { name: 'cached' },
    { name: 'dirty' },
    { name: 'tx bytes' },
    { name: 'rx bytes' }
  ]
  const abc = `tooltip : {}`

  const option = {


    tooltip: { show: true },

    legend: {

      // data: props.names,
      data: arr,
      orient: 'vertical',
      right: 0,
      top: 3,
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
      center: ['50%', '50%'],
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
        // name: 'Budget vs spending',
        type: 'radar',
        // data: props.guru
        data: props.radar_value
      }
    ]
  };
  return (
    <div key={props.radar_value}>

      <div style={{ display: 'flex' }}>

        <div style={{ paddingLeft: '1px' }}><ReactECharts
          option={option}
          style={{ height: 450, width: 840 }}
        /></div>
        <Grid sx={{ bgcolor: '#2e722e' }} id='t1'>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable


              var columns={[
                { title: 'Data Focus', field: 'datafocus' },
                { title: 'Time Stamp', field: 'time_stamp' },
                { title: 'Variation', field: 'variation' }

              ]}

              data={datatable1}
              options={{

                SortArrow: false,
                toolbar: false,
                showFirstLastPageButtons: false,
                pageSize: 5,
                paging:false,
                emptyRowsWhenPaging: false,
                rowsPerPageOptions: false,
                tableLayout: "fixed"




              }}
            /></ThemeProvider></Grid>

      </div>
      {govalue && <div style={{ display: 'flex', flexGrow: '0' }}>
        <div style={{ margin: '10px',height:'10px' }}>
          <Grid>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                title="Native workload"

                var columns={[
                  { title: 'Attributes', field: 'attributes' },
                  { title: 'Cpu Utilization', field: 'Cpu_Utilization' },
                  { title: 'Memory Utilization', field: 'Memory_Utilization' },
                  { title: 'Disk Busy ' , field: 'Disk_weighted' },      
                  { title: 'Disk Weighted', field: 'Disk_busy' },   
                 
                       
                 

                 
                ]}

                data={datatable2}
                options={{

                  SortArrow: false,
                  search: false,
                  showFirstLastPageButtons: false,
                  pageSize: 5,
                  paging:false,
                  emptyRowsWhenPaging: false,
                  rowsPerPageOptions: false,
                  tableLayout: "fixed",
                  maxBodyHeight: 305,
                 




                }}
              /></ThemeProvider></Grid></div>
        <div style={{ margin: '10px' }}>  <Grid>
        
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title="Benchmark"

              var columns={[
                { title: 'Attributes', field: 'attributes' },
                { title: bhost ,field :'cpuvalues'},
                { title: 'Differences', field: 'variation' }

              ]}

              data={datatable3}
              options={{
                search: false,
                SortArrow: false,
                maxBodyHeight: 305,
                showFirstLastPageButtons: false,
                pageSize: 5,
                paging:false,
                emptyRowsWhenPaging: false,
                rowsPerPageOptions: false,
                tableLayout: "fixed"


              }}
            /></ThemeProvider></Grid>
          
        </div>

      </div> }

      
      


    </div>
  )
}

export default RadarEx