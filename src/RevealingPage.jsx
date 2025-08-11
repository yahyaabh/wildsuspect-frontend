import React, { useEffect } from 'react'
import { socket } from './socket';
import {useContext , useState} from  'react'
import { PlayerContext } from './playerContext';
import {RoomContext} from './roomContext';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
function RevealingPage() {
 const {PlayerData}= useContext(PlayerContext);
 const [guess,setGuess] = useState("");
 const [animals,setAnimals] = useState([]);
 const {roomData} = useContext(RoomContext);
 const [impostor,setImpostor] = useState(null);
const navigate = useNavigate();

 let handlePickAnimal = (animal) => {
    //emit to backend the user picked an animal
    if(animal == roomData.animal) {
        setGuess("correct");
    }
    else {
        setGuess("wrong");
    }
    socket.emit("impostorPickedAnimal",{animal:animal});
}

 let getImpostor = () => {
    console.log(roomData)
    roomData.players.forEach((player) => {
        if(player.knowsAnimal == false) {
            setImpostor(player);
        }
    })
 }

 useEffect(()=> {
    getImpostor();
    if(!PlayerData.knowsAnimal) {
        //emit to backend user is geussing animal, so backend send couple of animals
        socket.emit("impostorIsGuessing",{playerId:PlayerData.id});
    }
    socket.on("animalsArraySent",(arr) => {
        //handle the animals array sent from backend
        setAnimals(arr);
    })
    //when the impostor has guessed, navigate to results page
    socket.on("impostorHasGuessed", () => {
        navigate("../results");
    })
    return () => {
        socket.off("animalsArraySent");
        socket.off("impostorHasGuessed");
    }
 },[])



    return (
        <>
        { PlayerData.knowsAnimal ?
    <div className='h-screen w-screen flex flex-col items-center justify-around bg-lico'>
        <p className=' text-xl text-white font-semibold'>the impostor was:</p>
        <p className='text-2xl font-bold text-white bg-bordo p-2 m-4  rounded-md fade-in'>😈 {impostor?impostor.name:""}</p>     
            
    </div>

    :

    <div className='h-screen w-screen flex flex-col items-center justify-start bg-lico'>
        <p className='text-2xl font-bold text-melon my-4'>you were the impostor</p>
        <p className='text-xl font-bold text-white my-4'>guess what the animal was:</p>
           <div className='flex flex-col items-center justify-between '>
                {animals.map((animal,index) => (
                    <button className={`font-mono text-white font-medium bg-bordo p-2 m-2 rounded-md w-full `} key={index}  onClick={() => handlePickAnimal(animal)}>{animal}</button>
                ))}
            </div>
         {guess === "correct" ? 
            <p className='text-5xl mt-2 fade-in'>✅</p>
         : guess === "wrong" ? 
         <p className='text-5xl mt-2 fade-in'>❌</p>
          : 
          <p></p>}       

    </div>
}
    </>
)

}

export default RevealingPage