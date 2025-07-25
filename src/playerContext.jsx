import React, {createContext,useState} from 'react'

export const PlayerContext = createContext();

export const  PlayerProvider =({children}) =>{
    const [PlayerData,setPlayerData] = useState({});

  return (
    <PlayerContext.Provider value={{PlayerData,setPlayerData}}>
        {children}
    </PlayerContext.Provider>    
  )
}

