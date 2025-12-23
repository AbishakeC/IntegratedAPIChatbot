import React, { useContext, useState } from 'react'
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const navigate = useNavigate();
    const[user,setUser]=useState(null);
    const[chats,setChats]=useState([]);
    const[selectedChat,setSelectedChat]=useState(null); 
    const[theme,setTheme]=useState(localStorage.getItem('theme')|| 'light');
   
    const value = {}

  return (
     <AppContext.Provider value={value}>
        {children}
     </AppContext.Provider>
)
}

export const useAppContext = ()=>{ useContext(AppContext)}