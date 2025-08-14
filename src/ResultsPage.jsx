import React from 'react'
import { useContext } from 'react'
import { RoomContext } from './roomContext'
import { useEffect } from 'react';
import { socket } from './socket';
import { PlayerContext } from './playerContext';
import { LuRefreshCcw } from "react-icons/lu";
import {useNavigate} from 'react-router-dom';
function ResultsPage() {
    const {roomData,setRoomData} = useContext(RoomContext);
    const {PlayerData} = useContext(PlayerContext);
    const navigate = useNavigate();
    const handlePLayAgain = () => {
        socket.emit("playAgain");
    }
    useEffect(() => {
        socket.emit("getResults");
        socket.on("roomUpdated", (data) => {
            setRoomData(data);
                })
        socket.on("playingAgain",()=> {
            navigate("../waiting")
        })
        return () => {
            socket.off("roomUpdated");
        }
    },[]);
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-around bg-lico text-white'>
        <p className='text-2xl font-bold'>scores:</p>
        <div className='flex flex-col items-center justify-center w-full'>
        {roomData.players.map((player,index) => 
            <div key={index} className='bg-bordo text-white p-4 m-2 rounded-sm flex flex-row items-center justify-between w-4/6'>
                <p className='font-mono text-lg'>🕵️‍♂️ {player.name}</p>
                <p className='text-xl animate-pulse '>{player.points}</p>
            </div>    
        )}
        </div>
        {PlayerData.isHost?
            <div onClick={()=> handlePLayAgain()} className='bg-melon text-white p-2  rounded-md flex flex-row items-center justify-center cursor-pointer'>
                <p className='mr-2'>play again</p> 
                <LuRefreshCcw/> 
                </div>    
            :
            <></>
    }

    </div>
  )
}

export default ResultsPage