import React,{useContext} from 'react'
import { RoomContext } from './roomContext';
import { PlayerContext } from './playerContext';    
import { socket } from './socket.js';
import { useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router';
function WaitingPage()  {
  const navigate = useNavigate();
const {roomData,setRoomData} = useContext(RoomContext);
const {PlayerData,setPlayerData} = useContext(PlayerContext);

const handleLeaveRoom = () => {
  socket.emit("leaveRoom");
  setPlayerData({});
  setRoomData({});
  // Navigate back to the rooms page  
  navigate(-1);
}
const handleStartGame = () => {
  //emit an event to backend to start game
  socket.emit("startgame",{roomId: roomData.roomId});
}
useEffect(() => {
    socket.on("roomUpdated", (data) => {
      setRoomData(data);
    })
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
    socket.on("playerDataUpdated", (playerData) => {
      setPlayerData(playerData);
    });
    socket.on("gameStarted", (roomData) => {
      setRoomData(roomData);
      navigate("/game");
    });

      return () => {
      socket.off("roomUpdated");
      socket.off("disconnect");
      socket.off("gameStarted");
}
}, [setRoomData,roomData,navigate,setPlayerData]);

  return (
    <div className='flex flex-col bg-lico w-screen h-screen items-center  justify-start text-white '>
      <div className='text-xl font-bold   font-mono bg-bordo text-white w-full flex flex-col items-center justify-around h-1/6   '> 
        <button onClick={()=> handleLeaveRoom()} className=' text-sm font-black   border-1 border-white rounded-md p-2'>← leave</button>
       <p className=''>ROOM CODE : {roomData.roomId}</p>
      </div>
       <div className='flex flex-col items-center justify-start h-3/6 w-full mt-10'>
       <p className='h-1/6 font-semibold text-lg'>players :</p>
       {roomData && roomData.players && Array.isArray(roomData.players) && roomData.players.map((player, index) => {
        return (
            <div key={index} className='bg-melon w-5/6 p-3 rounded-md my-2 flex flex-row justify-start items-center'>
                {roomData.host == player.id  ? 
                <p className='animate-pulse'>👑</p>
                :
                <p className='animate-pulse'>🦊</p>
                }
                <p className=' font-medium ml-6'>{player.name }</p>               
            </div>
        )
       })
    }  
    {PlayerData.isHost ?
    <button onClick={() => {handleStartGame()}} className='bg-bordo rounded-lg mt-10 text-white p-2 h-1/6'>start game</button>
  :
  <div className='mt-6 h-1/6'><p className='text-white    text-md'>waiting for host to start the game </p>
   <div className="flex items-center justify-center gap-1 mt-2">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></div>
    </div>
    </div>}

    </div>
    </div>
  )
}

export default WaitingPage