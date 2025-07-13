import { useState } from 'react';
import wolf from './assets/wolf.png'
import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Rooms from './Rooms.jsx';

function Welcome() {

  let [host,setHost] = useState(true);

  return (
    //nav bar
    <div className='h-screen flex flex-col items justify-between items-center'>
        <nav className='w-full  bg-lico text-white px-2 py-6 flex flex-col items-center'>
            <p className='font-semibold text-2xl'><span>WILD</span><span className='text-melon'>SUSPECT</span></p>
            <img className='size-48  animate-pulse' src={wolf}></img>
            <p className='mt-5  text-lg  fade-in leading-relaxed'>All players are secretly told the same animal—except one but no one knows who that is. Players ask and answer questions to find him, while he tries to blend in and figure it out. </p>
        </nav>
        
        <Rooms host={host} setHost={setHost} />
        
        <footer className='flex w-full mt-4 p-2 flex-row items-center bg-lico justify-around  '>
          <a href='https://github.com/yahyaabh'><FaGithub className='text-white size-8'/></a>
          <a href='https://www.linkedin.com/in/yehya-abol-hassan-a84142220/'><FaLinkedin className='text-white size-8'/></a>
          <a href='mailto:yehia.abu.alhassan.01@gmail.com'><MdEmail className='text-white size-8'/></a>
        </footer>
    </div>
  )
}

export default Welcome