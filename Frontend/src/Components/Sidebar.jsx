import React, { useEffect } from "react";
import { LuLockOpen, LuTrash } from "react-icons/lu";
import api from "../Axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ chats = [], setChats, activeChatId, setActiveChatId }) => {
  const navigate = useNavigate();

  // 🔹 Fetch user chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chat/chats");
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
      setChats(prev => [res.data, ...prev]);
      setActiveChatId(res.data._id);
    } catch (err) {
      console.error("Create chat error:", err);
    }
  };

  // 🔥 Delete chat (FULLY FUNCTIONAL)
  const deleteChat = async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}`);

      setChats(prev => prev.filter(chat => chat._id !== chatId));

      if (activeChatId === chatId) {
        setActiveChatId(null);
      }
    } catch (err) {
      console.error("Delete chat error:", err);
    }
  };

  return (
    <motion.div
      className="w-[65vh] scale-90 -mt-10"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, scale: 0.9, x: 0 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
    >
      <div className="p-2 w-full flex flex-col gap-y-2">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-sans text-white">Search Space</h1>
          <p className="text-pink-500 pt-2 text-md">Integrated with AI</p>
        </div>

        <div className="my-4">

          {/* New Chat Button */}
          <button
            className="w-full py-2 bg-white text-green-900 rounded-md hover:bg-black hover:text-white duration-150"
            onClick={createChat}
          >
            + New Chat
          </button>

          {/* Chat List */}
          <div className="bg-black/75 text-gray-400 rounded-md h-[55vh] my-5  scrollbar-green px-4 py-4 overflow-y-auto">
            {chats.length === 0 ? (
              <p className="text-gray-200 text-sm">No chats yet</p>
            ) : (
              chats.map(chat => (
                <div
                  key={chat._id}
                  className="flex justify-between items-center gap-x-4"
                >
                  {/* Chat Title */}
                  <div
                    onClick={() => setActiveChatId(chat._id)}
                    className={`p-2 w-full rounded cursor-pointer mb-2 ${
                      activeChatId === chat._id
                        ? "text-white"
                        : "hover:text-gray-100"
                    }`}
                  >
                    {chat.title || "New Chat"}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat._id);
                    }}
                    className="group p-2 hover:scale-110 hover:-translate-y-1 duration-150"
                  >
                    <LuTrash className="text-gray-700 group-hover:text-red-700" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Login */}
          <div className="scale-95 flex flex-col items-start -mt-2 -ml-8">
            <button
              className="text-xl text-pink-500 m-2 font-thin inline-flex gap-x-8 ml-8 scale-90"
              onClick={() => navigate("/")}
            >
              <LuLockOpen size={30} />
              Login/Signup
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
