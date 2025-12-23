import React from 'react'

const Chat = () => {
  return (
 <div className='flex flex-row justify-center align-middle  w-full h-screen'>

      <div className='scale-95 -mt-12 -ml-10'>
        <Sidebar chats={chats}
          setChats={setChats}
          activeChatId={setActiveChatId}
          setActiveChatId={setActiveChatId} />
      </div>

      <div className='w-full -mt-4'>
        <ChatWindow
          message={message}
          setMessage={setMessage}
          activeChatId={activeChatId} />
      </div>
    </div>  )
}

export default Chat