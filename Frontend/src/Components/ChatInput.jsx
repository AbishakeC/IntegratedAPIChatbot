import React from 'react'

const ChatInput = () => {
  return (
    
    <div className="p-4">
      <input
            type='text'
            // ref={InputRef}
            className='w-[75vh] h-16 rounded-full px-8'
            placeholder='search here something'
          />
    </div>
  )
}

export default ChatInput