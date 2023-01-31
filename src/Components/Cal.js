import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import moment from "moment/moment";

export default function 
() {const [set,N]=React.useState("2012-03-23")
const [set2,N2]=React.useState("2022-03-23")
  const start_d=useSelector((state)=>state.masking.start_d)
  const end_d=useSelector((state)=>state.masking.end_d)

  console.log(start_d.substring(0,11))

  

  

  // const start_date=moment(start_d,'YYYY-MM-DD[T]HH:mm:ss').format('yyyy-MM-dd');
  // const end_date=moment(end_d,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY/MM/DD');

  const start_date=start_d.substring(0,11);
  const end_date=end_d.substring(0,11)
  const defaultValue=start_date
 
  useEffect(() => {
    
    N(start_date)
    N2(end_date)
   }, [set])
   
  
  var abc="2022-3-23"
  return (
    <>
    <div>
    <input type="date" id="dateRequired"defaultValue={defaultValue}   style={{ height:"30px",background:"black",color:
   "white"}}/></div>
   <div>
    <input type="date"value={set2} onChange={(event)=>event.target.value} style={{height:"30px",background:"black",color:
   "white"}}  /></div>
   </>
  )
}