import { AppBar, Box, Drawer, IconButton, Typography } from '@mui/material'

import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import UploadIcon from '@mui/icons-material/Upload';
import {NavLink } from 'react-router-dom';
import logo from './amd.png'
import GrainTwoToneIcon from '@mui/icons-material/GrainTwoTone';
import Tooltip from '@mui/material/Tooltip';




function Sidebar() {
    return (
        <div>
          <AppBar sx={{ bgcolor: 'WHITE' ,color: 'BLACK'}}>
         <Typography sx={{ mx: 8, my:2}}>
         Workload profiler
         </Typography>       
          </AppBar>
        <Drawer
     
            variant='permanent' 
            sx={{width:400,px:2}} 
        >
         <Box
        component="img"
        sx={{ height: 25,width:25,ml : 2,my : 3}}
        alt="Logo"
        src={logo}
      />
       
     
      <NavLink to="/" component="Tooltip" title="Percentile analysis" >
        <IconButton sx={{mx:1}}><DashboardIcon/></IconButton>
        </NavLink> 

       <NavLink to="/About" component="Tooltip" title="Time series View" >
         <IconButton sx={{mx:1}}><ShowChartIcon/></IconButton></NavLink> 

       <NavLink to="/Upload" component="Tooltip" title="Machine Learning" >
         <IconButton sx={{mx:1}}><GrainTwoToneIcon/></IconButton>
        </NavLink>

       <NavLink to="/Upload" component="Tooltip" title="Data Upload" > 
       <IconButton sx={{mx:1}}><UploadIcon/></IconButton> 
       </NavLink> 
           
          
        </Drawer>
    </div>
      
    )}
    export default Sidebar;
