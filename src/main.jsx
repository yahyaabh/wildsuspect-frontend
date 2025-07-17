import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client';
import './index.css'
import Welcome from "./Welcome";
import { RoomProvider } from "./roomContext";

createRoot(document.getElementById('root')).render(
  <RoomProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>} />
      </Routes> 
    </BrowserRouter>
  </RoomProvider>
)
