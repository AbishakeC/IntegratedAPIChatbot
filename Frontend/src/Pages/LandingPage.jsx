import React from 'react'
import { LuArrowRight } from 'react-icons/lu';
import {useNavigate} from "react-router-dom"
import {motion} from "framer-motion"
import img1 from "../assets/botcircle.jpg";

const LandingPage = () => {
    const navigate = useNavigate();

  return (
    <>
    <div className=' w-screen h-screen backdrop-blur-[10px] flex flex-col justify-center align-middle items-center space-y-2  rounded-lg    '>

        <motion.div 
          initial={{opacity:0,scale:1,y:-25}}
          animate={{ opacity: 1, scale:0.9,y:0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}>
            <h1 className='text-[37vh]  font-sans text-white'>SearchSpace</h1>
        </motion.div>


        <motion.div
            initial={{opacity:0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1.5, ease: "easeOut" }} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex flex-row justify-center align-middle items-center '>
                                  {/* <img src={img1} alt="" width={100} /> */}

            <p className='text-xs font-semibold text-white  p-4 w-[70vh]  '> An AI-powered chat platform built with React, Node.js, MongoDB, and
          Gemini AI. Chat smarter, faster, and with context.</p>

        </motion.div>
        

        <motion.div 
            initial={{opacity:0,y:20}}
            animate={{ opacity: 1,y:0}}
            transition={{ duration: 1.5, ease: "easeOut" }} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
        <button
            onClick={() => navigate("/registration")}
            className="px-16 py-3 text-white rounded-full bg-black shadow-md hover:scale-105   hover:text-white transition duration-200 delay-100 w-fit inline-flex flex-row items-center justify-center align-middle gap-x-2 "
          >
            Get Started <LuArrowRight size={35}/> 
          </button>
          </motion.div>
    </div>

     {/* <motion.div className='shadow-lg shadow-purple-900 w-[100vh] p-4 flex flex-col justify-center align-middle items-center'>
              <h1 className='text-xl text-purple-800 font-semibold'>About</h1>
              <p className='text-gray-950'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed repudiandae deleniti alias, est sit consectetur nisi voluptatibus, a expedita, ad placeat? Adipisci iste nobis corporis ullam, dolores sed architecto eius placeat voluptatibus quibusdam dolorem at asperiores dicta nesciunt?
                 Cum reiciendis animi necessitatibus iusto dolor impedit minus voluptates ea hic enim!</p>
          </motion.div> */}
    </>
  )
}

export default LandingPage