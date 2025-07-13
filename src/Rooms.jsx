import React from 'react'
function Rooms({host,setHost}) {  

  

  return (
    <div className='bg-lico  w-80 text-white mt-5 mx-auto p-5 rounded-md flex flex-col '>
              <div className='flex font-semibold flex-row items-center justify-between  text-melon '>
                <button onClick={()=>setHost(true)} className={`w-full h-full ${host? "underline" : ""}`}>create game</button>
                <div class="w-px h-6 bg-gray-300 "></div>
                <button onClick={()=>setHost(false)} className={`w-full h-full ${host? "" : "underline"}`}> join game</button>
              </div>
              {host?
                  <div className='mt-4 flex flex-col'>
                    <input placeholder="Enter your name..." className='bg-white rounded-md  m-2  text-black text-sm p-1 text-center focus:outline-0' ></input>
                    <button className='bg-bordo rounded-lg mt-10 text-white p-2 hover:bg-white hover:text-bordo'>create game</button>
                  </div> 
              :
              <div className='mt-4 flex flex-col'>
                 <input placeholder="Enter your name..." className='bg-white rounded-md  m-2  text-black text-sm p-1 text-center focus:outline-0' ></input>
                 <input placeholder="Enter room id..." className='bg-white rounded-md  m-2  text-black text-sm p-1 text-center focus:outline-0' ></input>
                 <button className='bg-bordo rounded-lg mt-10 text-white p-2 hover:bg-white hover:text-bordo'>join game</button>
              </div>
              }
            </div>
     
)
}

export default Rooms