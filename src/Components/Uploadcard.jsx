import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CloudUpload } from '@material-ui/icons';
import './Upload.css'
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Radio, RadioGroup, FormControlLabel, FormControl, Divider, TextField, MenuItem, Select, InputLabel, Grid, FormHelperText } from '@mui/material';
// import { useForm } from 'react-hooks-useform';
// import Upload from '@mui/icons-material/Upload';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { change_when_route,resetAll } from '../features/CounterSlice';

export default function Uploadcard() {
  const [benchtag, setbenchtag] = React.useState("");
  const [native,setNative] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [benchList, Set_benchList] = React.useState([]);


  const [iteration, setIteration] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  // const {register,handleSubmit}=useForm();
  const [nativeList, Set_nativeList] = React.useState([]);
  const maskSetter = useSelector((state) => state.masking.count)
  const dispach = useDispatch();

  React.useEffect(() => {
    const getdata = async () => {
      dispach(change_when_route())
      dispach(resetAll())
      const url = "http://127.0.0.1:5000/native_tag";
      const response = await axios.get(url)
      const res = response.data.native_workload_tag
      Set_nativeList(res);
      // console.log(benchList);
      getdata1();


    }
    getdata();

  }, [])
  // const onSubmit=(data)=>{console.log(data)}
  const getdata1 = async () => {
    const url = "http://127.0.0.1:5000/benchmark_tag";
    const response = await axios.get(url)
    const res = response.data.benchmark_tag
    Set_benchList(res);
    // console.log(benchList);

  }








  const handleRadioChange = (event) => {


    if (event.target.value === 'CD') {
      setShow(true);
    } else if (event.target.value === 'BD') {
      setShow(false);
    } else {

    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [file, setFile] = React.useState(null);
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const formData = new FormData();
  const formData1 = new FormData();

  const changeHandler = (event) => {
    setFile(event.target.files[0]);

    setIsFilePicked(true);
    // console.log(formData)
  };

  const handleSubmission = () => {
    if (isFilePicked == true) {
      if (file) {
        if(show)
                  {
                    formData.append('file', file,);
                    formData.append('Host',native);
                    formData.append('userName', "Infobellit",);
                    formData.append('orgID', "CDAC",);
                    // formData.append('benchmark_tag', 0);
                    // formData.append('iteration',0 );
                    // formData.append('is_workload_data', 1);
                    // formData.append('TimeStamp', "2023-01-12 15:34:32");
            
                    let res = axios.post('http://127.0.0.1:5000/upload', formData)
                      .then(res => {
                        alert(res.data.Message)
                        const timestamp1=res.data.start_date
                        if (res.data.status == 1) {
                          formData1.append('file', file,);
                    formData1.append('Host',native);
                    formData1.append('userName', "Infobellit",);
                    formData1.append('orgID', "CDAC",);
                    formData1.append('benchmark_tag', 0);
                    formData1.append('iteration',0 );
                    formData1.append('is_workload_data', 1);
                    formData1.append('TimeStamp', timestamp1);
                          axios.post('http://127.0.0.1:5000/uploadetl', formData1)
                          .then(res1 => {
                            alert(res1.data.Message)})
                          
                        }
                      })
                  }
                  else
                  {
                    formData.append('file', file,);
                    formData.append('Host',"sagar1");
                    formData.append('userName', "Infobellit",);
                    formData.append('orgID', "CDAC",);
                    // formData.append('benchmark_tag', 0);
                    // formData.append('iteration',0);
                    // formData.append('is_workload_data', 1);
                    // formData.append('TimeStamp', "2023-01-12 15:34:32");
            
                    let res = axios.post('http://127.0.0.1:5000/upload', formData)
                      .then(res => {
                        alert(res.data.Message)
                        const timestamp1=res.data.start_date
                        if (res.data.status == 1) {
                          formData1.append('file', file,);
                    formData1.append('Host',"sagar1");
                    formData1.append('userName', "Infobellit",);
                    formData1.append('orgID', "CDAC",);
                    formData1.append('benchmark_tag', benchtag);
                    formData1.append('iteration',iteration );
                    formData1.append('is_workload_data', 1);
                    formData1.append('TimeStamp', timestamp1);
                          axios.post('http://127.0.0.1:5000/uploadetl', formData1)
                          .then(res1 => {
                            alert(res1.data.Message)})
                          
                        }
                      })
                  }
       
       

      }


    };
  }


  return (
    <Grid>
      <Button onClick={handleClickOpen} sx={{ mt: 2, mr: 2, bgcolor: '#181a1c' }} variant="contained" endIcon={<CloudUpload />} >
        UPLOAD
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          {"Upload Data"}
        </DialogTitle>

        <DialogContent >


          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              // value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="CD" control={<Radio />} checked={show} label="Customer Data" />
              <FormControlLabel value="BD" control={<Radio />} checked={!show} label="Benchmark Data" />
            </RadioGroup>
          </FormControl>

          <Divider />
          {show ?
            <>
              <TextField

                id="outlined-basic"
                // label="File input"
                variant="outlined"
                sx={{ mt: 3 }}
                size="small"  
                type="file"
                onChange={changeHandler}
          

              />


              <span>&emsp;</span>
              <TextField
                name="Native workload"
                label="Native workload"
                variant="outlined"
                sx={{ mt: 3 }}
                size="small"
                value={native}
                onChange={(e) => {
                  setNative(e.target.value)}
                }

              />


              <span>&emsp;</span>
              <FormControl sx={{ mt: 3, minWidth: 200 }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Native workload Tag
                </InputLabel>
                <Select
                  autoWidth
                  label="Native workload Tag"
                >
                  {nativeList.map((index1) =>
                    <MenuItem value={index1} >{index1}</MenuItem>
                  )}
                </Select>
              </FormControl>

              <Button onClick={handleSubmission} sx={{ ml: 2, mb: 10, mt: 3, bgcolor: '#181a1c' }} variant="contained" endIcon={<CloudUpload />}>
                UPLOAD
              </Button>
            </>


            :

            <>

              {/* <AttachFileIcon/>  */}
              <TextField
                id="outlined-basic"
                // label="File input"
                variant="outlined"
                sx={{ mt: 3 }}
                size="small"
                type="file"
                onChange={changeHandler}
              />

              <span>&emsp;</span>
              <TextField
                name="Benchmark"
                label="Benchmark"
                variant="outlined"
                sx={{ mt: 3 }}
                size="small"

              />
              <span>&emsp;</span>

              <TextField
              required
                id="outlined-basic"
                label="Iteration"
                variant="outlined"
                sx={{ mt: 3 }}
                size="small"
                type="number"
                error={isError}
                value={iteration}
             helperText= {!iteration ? "required": "Value should be greater than 0"}
                onChange={(e) => {
                  setIteration(e.target.value)
                  if (e.target.value < 0) {
                    setIsError(true);
                    
                  
                  }
                  else {
                    setIsError(false)
                  }
                }}
              />
              <span>&emsp;</span>
              <FormControl sx={{ mt: 3, minWidth: 160 }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Benchmark Tag
                </InputLabel>
                <Select
                required
                  autoWidth
                  label="Benchmark Tag"
                  value={benchtag}
                  onChange={(e) => {
                    setbenchtag(e.target.value);
                  }}
                >
                  {benchList.map((index) =>
                    <MenuItem value={index} >{index}</MenuItem>
                  )}
                </Select>
              </FormControl>


              <Button  onClick={handleSubmission} sx={{ ml: 2, mb: 10, mt: 3, bgcolor: '#181a1c' }} variant="contained" endIcon={<CloudUpload />}>
                UPLOAD
              </Button>
            </>


          }

        </DialogContent>

      </Dialog>
    </Grid>
  );
}
