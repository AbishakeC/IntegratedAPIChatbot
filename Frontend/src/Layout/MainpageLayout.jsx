import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../Components/ChatWindow";
import TopBar from "../Components/TopBar";

const MainpageLayout = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="flex flex-col space-y-6">
      <TopBar/>
    <div className="flex w-full ">

      <Sidebar
        chats={chats}
        setChats={setChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />

      <ChatWindow
        message={messages}
        setMessage={setMessages}
        activeChatId={activeChatId}
      />
    </div>
    </div>
  );
};

export default MainpageLayout;
