import React from 'react'
import { RoomContext } from './roomContext'
import { PlayerContext } from './playerContext';
import { useContext } from 'react'
import { socket } from './socket';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function VotingPage() {
    const navigate = useNavigate();

    const {roomData}= useContext(RoomContext);
    const {PlayerData}= useContext(PlayerContext);

    const [voted,setVoted]= useState(false);

    const handleVote = (votedId) => {
        socket.emit('playerVoted', {votedId});
        setVoted(true);
    }

    useEffect(() => {
        socket.on("userHasVoted", (nbOfVotes) => {
            if(nbOfVotes == roomData.players.length) {
                navigate("../RevealingPage");
            }
        }
    )
        return () => {
            socket.off("userHasVoted");
        }   
    },[navigate,roomData]);

  return (
    <>
        {!voted ?
          <div className='w-screen h-screen  flex flex-col items-center justify-start bg-white'>   
        <h1 className='text-2xl font-bold text-white bg-bordo p-4 rounded-md m-2'>Who do you think it is?</h1>

        <div className='flex flex-col items-center justify-center w-4/6'>

            {
            roomData.players.map( player => {
                if(player.id != PlayerData.id) {
                return (
                    <div className='flex flex-row items-center justify-between   bg-lico p-2 m-2 rounded-md w-full' key={player.id}>
                        <p className='text-white font-mono'> <span className='animate-pulse'>💀</span> {player.name}</p>
                        <button className=' bg-melon p-2 rounded-md ' onClick={() => handleVote(player.id)}>Vote</button>
                    </div>
                )}

        })}
        

        </div>
        </div>
    :
        <div>
            <h1 className='text-2xl font-bold text-white bg-bordo p-4 rounded-md m-2'>You have voted!</h1>
            <p className='text-black text-2xl'>Waiting for others to vote</p>
            <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0s]"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.15s]"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.3s]"></div>
            </div>
        </div>
}
</>
    )
}

export default VotingPage