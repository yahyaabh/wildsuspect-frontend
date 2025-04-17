import React from 'react'
import wolf from './assets/wolf.png'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function Welcome() {
  return (
    <div className=''>
        <nav className='w-full bg-lico text-white px-2 py-6 flex flex-col items-center'>
            <img className='size-35 animate-pulse' src={wolf}></img>
            <p className='font-semibold text-2xl animate-pulse'><span>WILD</span><span className='text-melon'>SUSPECT</span></p>
        </nav>

        <div className='bg-lico w-80 text-white mt-5 mx-auto p-5 rounded-md flex flex-col '>
            <p className='text-melon font-semibold text-lg my-2'>Welcome to WILDSUSPECT</p>
            <p className='text-md leading-relaxed slide-from-left typing-effect fade-in lg:text-lg'> a game where all players are secretly told the same animal — except one, who gets nothing. The catch? No one knows who the odd one out is. Players take turns asking and answering questions to identify the animal and expose the player who doesn’t know it, while the odd one tries to stay hidden and figure it out.</p>
            <button className= 'animate-bounce bg-bordo rounded-lg mt-10 text-white p-2 hover:bg-white hover:text-bordo transition duration-200'>start playing!</button>
        </div>

        <footer className='flex flex-row items-center justify-around mt-8'>
          <a href='https://github.com/yahyaabh'><FaGithub className='text-bordo size-10'/></a>
          <a href='https://www.linkedin.com/in/yehya-abol-hassan-a84142220/'><FaLinkedin className='text-bordo size-10'/></a>
          <a href='mailto:yehia.abu.alhassan.01@gmail.com'><MdEmail className='text-bordo size-10'/></a>
        </footer>
    </div>
  )
}

export default Welcome