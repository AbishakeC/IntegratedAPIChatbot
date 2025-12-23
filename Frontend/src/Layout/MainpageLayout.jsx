import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../Components/ChatWindow";

const MainpageLayout = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <div className="flex w-full">
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
  );
};

export default MainpageLayout;
