import MaterialTable from "material-table";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import React,{Suspense,lazy,useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
 
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      overflow:"hidden",
      width:"1000px",
       
    },
 
  },
  tableButton: {
      backgroundColor:"#e0e0e0",
      fontWeight:600,
      padding: theme.spacing(1),
      "&:hover": {
        backgroundColor: "#FF0010",
        color:"white"
      },
      height:"27px",
      fontSize: '13px'
       
    },
    icon:{
      fontSize: '13px'
    },
  headerWidth:
  {
      width:"170px"
  }  
}));
 
 
function TableExample()
{ 
    const classes = useStyles(); // Style Object
 
    // Colums of the Table 
    var columns = [
      {title: "id", field: "id", hidden: true},
      {title: <h4 class = {classes.headerWidth}> Name</h4>, field: "name",render:(row)=><Box>{row.name}</Box>},
      {title: <h4 class = {classes.headerWidth}>Last Name</h4>, field: "lastname"},
      {title: <h4 class = {classes.headerWidth}>Email</h4>, field: "email"},
      {title: <h4 class = {classes.headerWidth}>Address</h4>, field: "address"},
 
    ]
     // Data Part of the table 
    const datas = [
      { id: 1, name: 'Shanu', lastname: 'Singh',   email: 'dysn@gmail.com',address: 'Jaipur'},
      { id: 1, name: 'Johny', lastname: 'Anthony',  email: 'dysn@gmail.com',address: 'Udaipur'},
      { id: 1, name: 'Ajay',  lastname: 'Zebra',  email: 'dysn@gmail.com',address: 'Delhi'},
      { id: 1, name: 'Arjun',  lastname: 'Hashim',  email: 'dysn@yahoo.com',address: 'Kanpur'},
      { id: 1, name: 'Sethia', lastname: 'Shelter',  email: 'dhsn@gmail.com',address: 'Lucknow'},
      { id: 1, name: 'Depad', lastname: 'Shekhawt',  email: 'dn@yahoo.in',address: 'Kolkata'},
      { id: 1, name: 'Shrpad',  lastname: 'Rajnand',  email: 'dysn@yahoo.com',address: 'Daman'},
      { id: 1, name: 'Hampesh',  lastname: 'Deband',  email: 'dysn@gmail.com',address: 'Delhi'},
    ];
 
     
    // Hooks Part
    const [opens, setOpens] = React.useState(false);
 
   const handleClickOpens = () => {
    setOpens(true);
   };
 
   const handleCloses = () => {
    setOpens(false);
   };
 
   const [showData,setShowData] = useState('');
 
     
   return(
     <div className="main_container">
      {/* Menu Part  */}
        <AppBar position="static">
           <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Table 
          </Typography>
          </Toolbar>
         </AppBar>
 
       {/* Our Table part */}
      <div style={{width:"1000px",marginLeft:"100px",marginTop:"20px"}}>
        <Box mb={2} align="center"><Typography style={{color:"#10346a"}} variant="h5">Show Row Data in Model Box </Typography></Box>
            <MaterialTable
                    title="Member Details"
                    options={{
                      search:false
                    }}
                    columns={columns}
                    data={datas}
                    onRowClick={(handleClickOpens, selectedRow) => setShowData({fname:selectedRow.name,lname:selectedRow.lastname,email:selectedRow.email,address:selectedRow.address})}
                    actions={[
                      {
                        icon: 'save',
                        tooltip: 'Save User',
                        // onClick: (event, rowData) => alert("You saved " + rowData.name)
                        onClick: {handleClickOpens}
                      }
                    ]}
                    components={{
                      Action: props => (
                        <Button
                          onClick={handleClickOpens}
                          style={{textTransform: 'none'}}
                          size="small"
                        >
                          <VisibilityIcon style={{color: '#10346a'}}/>
                        </Button>
 
                      ),
                    }}
                  />
            
          {/* Model Box UI Code  */}
 
           <Dialog
            open={opens}
            onClose={handleCloses}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'lg'} // 'sm' || 'md' || 'lg' || 'xl'
          >
            <DialogTitle id="alert-dialog-title">{"View User Data"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <table id="viewTable" style={{ border:"1px solid black",width:"800px"}}>
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th>Sur Name </th>
                      <th>Email</th>
                      <th>Address</th>
                    </tr>
                    </thead> 
                    <tbody>
                      <tr>
                        <td>{showData.fname}</td>
                        <td>{showData.lname}</td>
                        <td>{showData.email}</td>
                        <td>{showData.address}</td>
                         
                      </tr> 
                    </tbody>   
                  </table>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
               
              <Button onClick={handleCloses} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    </div>  
   )
}
export default TableExample;