import React, { useEffect } from 'react'
import { socket } from './socket';
import {useContext , useState} from  'react'
import { PlayerContext } from './playerContext';
import {RoomContext} from './roomContext';
import { FaLongArrowAltRight } from "react-icons/fa";


function RevealingPage() {
 const {PlayerData}= useContext(PlayerContext);
 const [animals,setAnimals] = useState([]);
 const {roomData} = useContext(RoomContext);
 const [impostor,setImpostor] = useState(null);

 let handlePickAnimal = (animal) => {
    //emit to backend the user picked an animal
 }

 let getImpostor = () => {
    console.log(roomData)
    roomData.players.forEach((player) => {
        if(player.knowsAnimal == false) {
            setImpostor(player);
            console.log(player);
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
    return () => {
        socket.off("animalsArraySent");
    }
 },[])



    return (
        <>
        { PlayerData.knowsAnimal ?
    <div className='h-screen w-screen flex flex-col items-center justify-around bg-lico'>
        <p className=' text-xl text-white font-semibold'>the impostor was:</p>
        <p className='text-2xl font-bold text-white bg-bordo p-2 m-4  rounded-md fade-in'>😈 {impostor?impostor.name:""}</p> 
        <div className='bg-melon     p-2  rounded-md text-white text-lg flex flex-row items-center justify-between w-2/6'>
            <p>results</p>
            <FaLongArrowAltRight/>
            </div>    
    </div>

    :

    <div className='h-screen w-screen flex flex-col items-center justify-start bg-lico'>
        <p className='text-2xl font-bold text-melon my-4'>you were the impostor</p>
        <p className='text-xl font-bold text-white my-4'>guess what the animal was:</p>
           <div className='flex flex-col items-center justify-between '>
                {animals.map((animal,index) => (
                    <button key={index} className='font-mono text-white font-medium bg-bordo p-2 m-2 rounded-md w-full' onClick={() => handlePickAnimal(animal)}>{animal}</button>
                ))}
            </div>
    </div>
}
    </>
)

}

export default RevealingPage