import { io } from 'socket.io-client';
// "undefined" means the URL will be computed from the `window.location` object

// const URL = "https://wildsuspect-backend.onrender.com"; 
const URL = import.meta.env.VITE_BACKEND_URL;
export const socket = io(URL, {
  transports: ["websocket", "polling"],
});