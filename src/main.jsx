import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client';
import './index.css'
import Welcome from "./Welcome";
import { RoomProvider } from "./roomContext";
import { PlayerProvider } from "./playerContext";
import WaitingPage from "./WaitingPage";

createRoot(document.getElementById('root')).render(
  <RoomProvider>
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/waiting" element={<WaitingPage/>} />
        </Routes> 
      </BrowserRouter>
    </PlayerProvider>
  </RoomProvider>
)
