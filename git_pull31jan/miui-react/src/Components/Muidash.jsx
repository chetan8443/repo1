import React, { useState } from 'react';
import {Box, Checkbox, FormControlLabel, Grid} from '@mui/material';
import Drops from './Drops';
import Cal from "./Cal";


const Muidash = () => {

    // const [acceptInc,setAcceptInc]=useState(false)
    // console.log(acceptInc)
    // const handleChange=(event)=>{
    //     setAcceptInc(event.target.checked)
    // }
    // control={<Checkbox checked={acceptInc} onChange={handleChange} />}

  return (
    <Box>
      <Grid  container spacing={2}>
        <Grid item md={3}>
          <FormControlLabel
            label='CPU utilization'
            control={<Checkbox />}
            />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label='Memory utilization'
            control={<Checkbox />}
            />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label='Disk Busy'
            control={<Checkbox />}
            />
        </Grid>
        <Grid item md={3}>
          <FormControlLabel
            label='Disk Weighted'
            control={<Checkbox />}
            />
        </Grid>
      </Grid>
      <div>
        <br />
        <Drops />
        
      </div>
    </Box>
    
  )
}

export default Muidash
