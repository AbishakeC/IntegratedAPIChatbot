import React, { useEffect, useRef, useState } from "react";
import api from "../Axios";
import { LuBot } from "react-icons/lu";

const ChatWindow = ({ message = [], setMessage, activeChatId }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // 🔹 Fetch messages when chat changes
  useEffect(() => {
    if (!activeChatId) return;

    api
      .get(`/message/${activeChatId}`)
      .then((res) => {
        setMessage(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setMessage([]));
  }, [activeChatId, setMessage]);

  // 🔹 Auto-scroll like ChatGPT
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, loading]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!input.trim() || !activeChatId || loading) return;

    const userMsg = {
      role: "user",
      content: input,
    };

    // optimistic UI
    setMessage((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post(`/chat/${activeChatId}`, {
        content: userMsg.content,
      });

      setMessage((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
        },
      ]);
    } catch (err) {
      // 🔴 HANDLE GEMINI QUOTA ERROR
      if (err.response.message === 429) {
        setMessage((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "AI usage limit exceeded.\n\nYou have reached the Gemini free-tier quota. Please wait a while or upgrade your plan to continue.",
          },
        ]);
      } else {
        setMessage((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Something went wrong while generating the response. Please try again Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia maxime laudantium mollitia cumque quis atque nam molestias optio asperiores at sint, sapiente reprehenderit ipsam ipsum rem? Quas nisi laudantium, eveniet aut adipisci odio! Aliquam animi velit ab voluptatem unde tempora et ad alias explicabo corrupti voluptatibus neque, reiciendis, saepe consectetur",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex flex-col h-[95vh] p-6 w-full -mt-8">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 scrollbar-green bg-black/40 rounded-lg p-6">
        {!activeChatId ? (
          <p className="text-green-500 text-center mt-20">
            Select or create a chat to start
          </p>
        ) : (
          message.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] p-3 rounded-lg whitespace-pre-line  ${
                msg.role === "user"
                  ? "bg-black/35 flex flex-row justify-start  shadow-lg shadow-black w-[65vh] text-green-600 ml-auto"
                  : " flex flex-row justify-center align-top -ml-4 z-20 text-green-400 mr-auto" }`}>
             { msg.role === "assistant" && <LuBot size={200} className="m-7"/>} {msg.content}
            </div>
          ))
        )}

        {loading && (
          <div className="text-green-700 text-sm mr-auto">
            AI is typing…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {activeChatId && (
        <div className="flex gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-md bg-black/40 text-white outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-6 rounded-md ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-green-600 text-black hover:bg-green-700"
            }`}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
