import { io } from 'socket.io-client';
// "undefined" means the URL will be computed from the `window.location` object
//const URL = 'http://localhost:3000';
//  const URL = 'http:///192.168.1.73:3000';
const URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'http://192.168.1.73:3000'; 

export const socket = io.connect(URL);