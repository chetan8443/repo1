import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';
import BenchMarkBar from './BenchMarkBar'
import PercentileBar from './PercentileBar';


function CombineBars() {

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
    <Box sx={{ flexGrow: 1 }}>
        <Grid  container spacing={1}>
        <Grid item md={2} >
        <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-label">Analysis</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          label={"Analysis"}
                onChange={handleBar} 
          
        >
          <MenuItem value={0}>Percentile </MenuItem>
          <MenuItem value={1}>Benchmark </MenuItem>
         
        </Select>
      </FormControl>
        </Grid>
           
        <Grid md={10}>{ show ?
        <PercentileBar /> :<BenchMarkBar />}
        </Grid>
        

        </Grid>

    </Box>
  )
}

export default CombineBars