import React, {createContext,useState} from 'react'

export const RoomContext = createContext();

export const  RoomProvider =({children}) =>{
    const [roomData,setRoomData] = useState({});

  return (
    <RoomContext.Provider value={{roomData,setRoomData}}>
        {children}
    </RoomContext.Provider>    
  )
}

