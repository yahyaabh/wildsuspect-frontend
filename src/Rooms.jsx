import { useState,useEffect,useContext } from 'react';
import { socket } from './socket.js';
import { RoomContext } from './roomContext.jsx';

function Rooms({host,setHost}) {  
  let [name,setName] = useState("");
  let[roomId,setRoomId] = useState("");
  const {roomData,setRoomData} = useContext(RoomContext);

  //handle the create / join game  by emiting events
  let handleCreateGame = () => {
    socket.emit("createRoom", { hostName: name });
  }
  let handleJoinGame = () => {
      socket.emit("joinRoom", { playerName: name,roomId: roomId });
  }

  useEffect(() => {
    socket.on("connect", () => {
        console.log("Connected to the server");
      });

    // Listen for room creation events  
    const handleRoomCreated = (roomId) => {
      setRoomId(roomId);
    };
    socket.on("roomCreated", handleRoomCreated);

    //listen for room join events
    const handleRoomJoined = () => {
      //route to another root
      }
      socket.on("roomJoined", handleRoomJoined);

    //listen for room updates
    socket.on("roomUpdated", (data) => {
      setRoomData(data);
      console.log(data);
    });

    return () => {
      socket.off("roomCreated", handleRoomCreated); 
      socket.off("roomJoined", handleRoomJoined); 
      socket.off("roomUpdated");
    }; 
  }, [roomData,setRoomData]);

  return (
    <div className='bg-lico  w-80 text-white mt-5 mx-auto p-5 rounded-md flex flex-col '>
              <div className='flex font-semibold flex-row items-center justify-between  text-melon '>
                <button onClick={()=>setHost(true)} className={`w-full h-full ${host? "underline" : ""}`}>create game</button>
                <div className="w-px h-6 bg-gray-300 "></div>
                <button onClick={()=>setHost(false)} className={`w-full h-full ${host? "" : "underline"}`}> join game</button>
              </div>
              {host?
                  <div className='mt-4 flex flex-col'>
                    <input onChange={(e) => {setName(e.target.value)}} value={name} placeholder="Enter your name..." className='bg-white rounded-md  m-2  text-black text-sm p-1 text-center focus:outline-0' ></input>
                    <button onClick={()=> handleCreateGame()} className='bg-bordo rounded-lg mt-10 text-white p-2 hover:bg-white hover:text-bordo'>create game</button>
                  </div> 
              :
              <div className='mt-4 flex flex-col'>
                 <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name..." className='bg-white rounded-md  m-2  text-black text-sm p-1 text-center focus:outline-0' ></input>
                 <input  value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} placeholder="Enter room id..." className='bg-white rounded-md  m-2  text-black text-sm p-1 text-center focus:outline-0' ></input>
                 <button onClick={() => {handleJoinGame()}} className='bg-bordo rounded-lg mt-10 text-white p-2 hover:bg-white hover:text-bordo'>join game</button>
              </div>
              }
            </div>
     
)
}

export default Rooms