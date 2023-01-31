
import { createTheme, ThemeProvider } from '@mui/material';

import React from 'react'
import Muidash from './Muidash';
import RadarEx from './RadarEx';
import "./style.css"

function DashBoard() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
    return (<>
    <div className="content">
     <ThemeProvider theme={darkTheme} >
    
     <Muidash />
   </ThemeProvider>
   </div>
   

        <div id='echart'>
        <ThemeProvider theme={darkTheme} > <RadarEx/>
         </ThemeProvider>
         </div>
        </>
        
    )}
    export default DashBoard;