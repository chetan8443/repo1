import './Upload.css'
import React, { useEffect, useState ,useReducer} from 'react'
import { Button, Box, ThemeProvider, createTheme } from '@mui/material';
import { CloudUpload, Refresh } from '@mui/icons-material';
import DataTable from './DataTable'
import Uploadcard from './Uploadcard'
import { useDispatch } from 'react-redux';


function DataUpload() {

         const [data,setData]=useState([]);
         const [reducerValue, forceupdate] = useReducer(x=>x+1,0);
         const dispatch=useDispatch();
         
         







  function refreshPage() {
    forceupdate();
   }


  return (
  <>
    <div className="UploadPage">


      <Uploadcard/>
   
      <Button variant="contained" className="btn" endIcon={<Refresh />} onClick={refreshPage}>
        REFRESH
      </Button>
    </div>

    <div id='table'>
     <DataTable value={reducerValue}/>
    </div>

  </>
  )
}
export default DataUpload;