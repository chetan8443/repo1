import { AppBar, Box, Drawer, IconButton, Typography } from '@mui/material'

import React from 'react'
import {NavLink } from 'react-router-dom';
import logo from './amd.png'
import { GrainTwoTone,ShowChart,Dashboard} from '@material-ui/icons';
import Tooltip from '@mui/material/Tooltip';
import UploadIcon from '@mui/icons-material/Upload';



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
        <IconButton sx={{mx:1}}><Dashboard/></IconButton>
        </NavLink> 

       <NavLink to="/About" component="Tooltip" title="Time series View" >
         <IconButton sx={{mx:1}}><ShowChart/></IconButton></NavLink> 

       <NavLink to="/MachineLearning" component="Tooltip" title="Machine Learning" >
         <IconButton sx={{mx:1}}><GrainTwoTone/></IconButton>
        </NavLink>

       <NavLink to="/Upload" component="Tooltip" title="Data Upload" > 
       <IconButton sx={{mx:1}}><UploadIcon/></IconButton> 
       </NavLink> 
           
          
        </Drawer>
    </div>
      
    )}
    export default Sidebar;
