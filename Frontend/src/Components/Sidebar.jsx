import React, { useEffect } from "react";
import { LuDelete, LuDrumstick, LuLockOpen, LuTrash } from "react-icons/lu";
import api from "../Axios";
import {Navigate, useNavigate} from "react-router-dom"
import {motion} from "framer-motion";

const Sidebar = ({ chats = [], setChats, activeChatId, setActiveChatId }) => {

  const Navigate = useNavigate();

  // 🔹 Fetch user chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chat/chats");

        // always ensure array
        setChats(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch chats error:", err);
        setChats([]);
      }
    };

    fetchChats();
  }, [setChats]);

  // 🔹 Create new chat
  const createChat = async () => {
    try {
      const res = await api.post("/chat/chats");

      // add chat to top
      setChats(prev => [res.data, ...prev]);

      // set active chat
      setActiveChatId(res.data._id);
    } catch (err) {
      console.error("Create chat error:", err);
    }
  };

  return (
    <motion.div className='w-[65vh] scale-90 -mt-10 '
     initial={{opacity:0,x:-25}}
          animate={{ opacity: 1, scale:0.9,x:0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          >
      <div className='p-2 w-full flex flex-col justify-start align-middle gap-y-2'>

        {/* heading Div */}
        <div>
          <h1 className='text-4xl font-sans text-white'>Search Space</h1>
          <p className='text-pink-500 pt-2 text-md'>Integrated with AI</p>
        </div>

        <div className='my-4'>

          {/* New Chat Button */}
          <button
            className='w-full h-fit py-2 bg-white text-green-900 rounded-md hover:bg-black hover:text-white duration-150 delay-75'
            onClick={createChat}
          >
            + New Chat
          </button>

          {/* Chat List */}
          <div className="bg-black/75 text-gray-400 scrollbar-green rounded-md h-[55vh] my-5 px-4 py-4 overflow-y-auto">
            {chats.length === 0 ? (
              <p className="text-gray-200 text-sm">No chats yet</p>
            ) : (
              chats.map(chat => (
                <div className="flex flex-row justify-between align-middle items-center gap-x-4">
                <div
                  key={chat._id}
                  onClick={() => setActiveChatId(chat._id)}
                  className={`p-2 w-full rounded cursor-pointer flex flex-row justify-between gap-2 gap-x-4 mb-2 ${
                    activeChatId === chat._id
                      ? "text-white"
                      : "hover:text-gray-100"
                  }`}
                >
                  {chat.title || "New Chat"} 
                </div>
                <p className=" group hover:scale-110 hover:-translate-y-2 duration-150 p-2 "><LuTrash className="group-hover:text-red-700  text-gray-700"/></p>
                </div>
              ))
            )}
          </div>

          {/* Login & Profile (UI untouched) */}
          <div className='scale-95 flex flex-col justify-start align-middle items-start -mt-2 -ml-8'>

            <button className='text-xl text-pink-500 m-2 font-thin inline-flex justify-start align-middle gap-x-8 ml-8 scale-90' onClick={()=>{Navigate("/")}}>
              <LuLockOpen className='rounded-full text-pink-200' size={30} />
              Login/Signup
            </button>

            {/* <div className='flex flex-row justify-start align-middle content-center p-4 ml-1 scale-90 bg-black/35 hover:shadow-lg hover:shadow-green-500/30 w-full rounded-full' onClick={()=>Navigate("/Profile")}> 
              <span className='bg-green-600 px-8 p-6 rounded-full text-black'>A</span>
              <h1 className='font-extrabold text-2xl text-green-600 align-middle mt-4 mx-6'>
                Profile
              </h1>
            </div> */}

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
