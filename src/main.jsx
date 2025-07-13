import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client';
import './index.css'
import Welcome from "./Welcome";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome/>} />
      
    </Routes> 
  </BrowserRouter>
)
