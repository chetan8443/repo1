import React, { useReducer, useState } from 'react'
// import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import { CloudUpload } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material';
import './Upload.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
// import { spacing } from '@mui/system';




function DataTable(props) {

  let navigate = useNavigate();
  const [posts,setPost]=React.useState([])
  
  React.useEffect(()=>{
    const getdata2=async ()=>{
      // const url="https://postman-echo.com/get";
      let response = await axios.get("http://127.0.0.1:5000/upload_status")
      .then(res=>{
        setPost(res.data.reponse_data)})
// console.log(data)
    
      // setData(res);
      // console.log(res)
    
    }
    getdata2();
   },[props.value])
// const refresh=()=>{forceUpdate();}

  // React.useEffect(()=>{
  //   const getdata=async ()=>{
  //     const url="./data.json";
  //     const response= await axios.get(url)
  //     const res=response.data
      
  //     console.log(res);
  //     // console.log(list,typeof list)
  //   }
  //   getdata();
  //  },[])
  const [showData, setShowData] = useState('');
  const [opens, setOpens] = React.useState(false);
  // const [reducerValue, forceUpdate] = useReducer(x=>x+1,0);
  const handleClickOpens = () => {
    setOpens(true);
  };
  const handlenavigate = () => {
    navigate('/')
  };

  const handleCloses = () => {
    setOpens(false);
  };
  // const datas =
  //   [ 
  //     { FileName: '', Nativeworkload: 'yes', percentage: '100', startdate: '2022-12-15', enddate: '2022-12-26', status: 'completed', message: 'no' },
  //     { FileName: 'file2', Nativeworkload: 'yes', percentage: '100', startdate: '2022-12-06', enddate: '2022-12-20', status: 'completed', message: 'no' },
  //     { FileName: 'file3', Nativeworkload: 'yes', percentage: '100', startdate: '2022-12-02', enddate: '2022-12-22', status: 'completed', message: 'no' }
  //   ]
  const defaultMaterialTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });




  return (
    <>
    
      <ThemeProvider theme={defaultMaterialTheme}>


        <MaterialTable


var columns={[
  { title: 'File Name', field: 'file_name' },
  { title: 'Native Workload', field: 'native_workload' },
  { title: 'Percentage', field: 'status_percentage' },
  { title: 'Start Date', field: 'start_date' },
  { title: 'End Date', field: 'end_date' },
  { title: 'Status', field: 'status' },
  { title: 'Message', field: 'message' },
]}
        // data={[posts.map((post)=>{userId :  post.userId , id : post.id , title: post.title, body: post.body})]}
        data={ posts }
        options={{

            SortArrow: false,
            toolbar: false,
            showFirstLastPageButtons: false,
            pageSize:5,
            
            rowsPerPageOptions: false,
            MuiTablePaginationtoolbar:false,
            emptyRowsWhenPaging: false, 
     



          }}
          onRowClick={(d, selectedRow) => {
            setShowData({ FName: selectedRow.file_name, Nworkload: selectedRow.native_workload, percentage: selectedRow.status_percentage, startdate: selectedRow.start_date, enddate: selectedRow.end_date, status: selectedRow.status ,message:selectedRow.message});
            handleClickOpens()
          }
          }
        />
      </ ThemeProvider>



      {/* Model Box UI Code  */}

      <Dialog
        open={opens}
        onClose={handleCloses}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"



      >
        <DialogTitle id="alert-dialog-title" >
          <h2>{"Status Table"}</h2>
        </DialogTitle>
        <DialogContent style={{ height: '200px' }} >
          <DialogContentText id="alert-dialog-description" >
            <table >
        
           <td  > <Grid style={{marginRight:300,marginLeft:20}}> 
                    <td style={{borderSpacing:10}}>
                      <tr><b>File Name :</b></tr>
                      <tr><b>Start Date:</b></tr>
                      <tr><b>Message :</b></tr>
                    </td>
                    <td style={{borderSpacing:10}}>
                      <tr>{showData.FName}</tr>
                      <tr>{showData.startdate}</tr>
                      <tr>{showData.message}</tr>
                    </td>
             
              </Grid>
              </td>
              <td>
              <Grid>
             
                
                    <td style={{borderSpacing:10}}>
                      <tr><b>Percentage:</b></tr>
                      <tr><b>End Date:</b></tr>
                      <tr><b>Status :</b></tr>
                    </td>
                    <td style={{borderSpacing:10}}>
                      <tr>{showData.percentage}</tr>
                      <tr>{showData.enddate}</tr>
                      <tr>{showData.status}</tr>
                    </td>
             
              </Grid>
              </td>
            </table>


          </DialogContentText>
          <Button sx={{ ml: 2, mt: 3, bgcolor: '#181a1c' }} variant="contained" onClick={handlenavigate} >
            START TEST
          </Button>
          <Button sx={{ ml: 2,mt: 3, bgcolor: '#181a1c' }} variant="contained" onClick={handleCloses}>
            CANCEL
          </Button>
        </DialogContent>

      </Dialog>
    </>


  )

}

export default DataTable;