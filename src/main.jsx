import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client';
import './index.css'
import Welcome from "./Welcome";
import Rooms from "./Rooms";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/rooms"  element={<Rooms/>}/>
    </Routes> 
  </BrowserRouter>
)
