import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client';
import './index.css'
import Welcome from "./Welcome";
import { RoomProvider } from "./roomContext";
import { PlayerProvider } from "./playerContext";
import WaitingPage from "./WaitingPage";
import Game from "./Game";

createRoot(document.getElementById('root')).render(
  <RoomProvider>
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/waiting" element={<WaitingPage/>} />
          <Route path="/game" element={<Game/>} />
        </Routes> 
      </BrowserRouter>
    </PlayerProvider>
  </RoomProvider>
)
