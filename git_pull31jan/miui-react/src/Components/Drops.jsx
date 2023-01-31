import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Cal from "./Cal";
import Grid from "@mui/material/Grid";

import SpecificDate from "./SpecificDate";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function SelectAutoWidth() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [Date, setDate] = React.useState("");

  const [show,setShow]=React.useState();
  const handleDate = (event) => {
   
    if(event.target.value==0)
    { setShow(true);}
    else
    { setShow(false);}
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <FormControl sx={{ m: 0, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Native Workload
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            // onChange={handleChange}
            autoWidth
            label="Native Workload"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
        <span>&emsp;</span>
        <FormControl sx={{ m: 0, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Disk</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            // onChange={handleChange}
            autoWidth
            label="Disk"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
        <span>&emsp;</span>
        <FormControl sx={{ m: 0, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Nics</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            // onChange={handleChange}
            autoWidth
            label="Nics"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
        <span>&emsp;</span>
        <TextField
          id="outlined-basic"
          label="Percentile"
          variant="outlined"
          sx={{ midWidth: 50 }}
        />
        <span>&emsp;</span>
        <FormControl sx={{ mx: 0 , minWidth: 150 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Date Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={handleDate}
            autoWidth
            label="Date Option"
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={0}>Specific date</MenuItem>
            <MenuItem value={1}>Date Range</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={3}>
      {show ? <SpecificDate /> 
        : <Cal />}
        
      </Grid>
      <Grid item md={1}>
        <Stack spacing={0} direction="row" style={{ padding: "11px 0px" }}>
          <Button variant="contained">Go</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
