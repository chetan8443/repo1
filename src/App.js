
import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoard from './Components/DashBoard';

import About from './Components/About';
import DataUpload from './Components/DataUpload'



function App() {

  
  return (
    <>
    <BrowserRouter>
      <Sidebar/>
      <Routes>
      <Route exact path='/' element={<DashBoard/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/Upload' element={<DataUpload/>}></Route>
     
      </Routes>
    </BrowserRouter>

  </>
  );
}

export default App;
