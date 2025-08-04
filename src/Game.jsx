import React from 'react'
import { useContext } from 'react'
import { PlayerContext } from './playerContext'
import { RoomContext } from './roomContext';
import { useEffect ,useState} from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";



function Game() {
  const { PlayerData } = useContext(PlayerContext);
  const {roomData} = useContext(RoomContext);
  const [flipped,setFlipped] =useState(false);
    useEffect(() => {
      console.log(PlayerData);
      console.log(roomData);
    }
  ,[PlayerData, roomData]);
  return (
    <div className='w-screen h-screen bg-white flex flex-col items-center justify-center '>
        {PlayerData.knowsAnimal ?
       
        
        <div
        className={` flip-card shadow-2xl h-3/6 max-h-md w-5/6 max-w-md  ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-inner w-full h-full rounded-md shadow-md ">
          {/* Front Side */}
          <div className="flip-front text-center  flex flex-col items-center justify-center">
            <p className="font-bold text-xl my-4">You are not the impostor.</p>
            <p className="text-xl text-slate-200">
              The animal you got is the{' '}
              <span className="text-melon font-extrabold">{roomData.animal}</span>
            </p>
            <p className="my-4 font-bold">Good luck!</p>
            <FaRegQuestionCircle className='size-8 animate-pulse'/>
          </div>

          {/* Back Side */}
          <div className="flip-back text-center">
            <p className="text-lg text-white">
              Ask questions about this animal and find out who the impostor is,
              but be careful not to reveal the animal or the impostor will know it too!
            </p>
          </div>
        </div>
        
      </div>

      :
   
    <div
            className={` flip-card shadow-2xl h-3/6 max-h-md w-5/6 max-w-md  ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-inner w-full h-full rounded-md shadow-md ">
          {/* Front Side */}
          <div className="flip-front text-center flex flex-col items-center justify-center">
            <p className="font-bold text-xl my-4">You are  the impostor.</p>
            <p className="my-4 font-bold">Good luck!</p>
            <FaRegQuestionCircle className='size-8 animate-pulse'/>
          </div>

          {/* Back Side */}
          <div className="flip-back text-center">
            <p className="text-lg text-white">
             All the other players got an animal but you didn't , you have to try to blend in and guess the animal,
         but be careful they might ask you questions about it!
            </p>
          </div>
        </div>
      </div>
      }
  </div>
  )
}


export default Game