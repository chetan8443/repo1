import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';
import BenchMarkBar from './BenchMarkBar'
import PercentileBar from './PercentileBar';


function CombineBars(props) {

    const [show,setShow]=React.useState();
    const [val, setVal] = React.useState(1);
  const handleBar = (event) => {
//    alert("hello");
    if(event.target.value==0)
    { setShow(true);
      setVal(0);
    }
    else
    { setShow(false);
      setVal(1);
    }
  };
  

  return (
    <>
        <Grid  container spacing={1}>
        <Grid item md={2} >
        <FormControl sx={{ m: 1, minWidth: 160, maxWidth:175 }}>
        <InputLabel id="demo-simple-select-label">Analysis</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          label={"Analysis"}
                onChange={handleBar} 
          
        >
          <MenuItem value={0}>Percentile Comparison </MenuItem>
          <MenuItem value={1}>Benchmark Comparison</MenuItem>
         
        </Select>
      </FormControl>
        </Grid>
        </Grid>
        <Grid md={10} sx={{marginTop:'-88px'}}>{ show ?
        <PercentileBar /> :<BenchMarkBar key={props.radar_value} name={props.name} radar_value={props.radar_value}/>}
        </Grid>

    </>
  )
}

export default CombineBars