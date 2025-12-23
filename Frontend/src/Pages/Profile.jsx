import { useEffect } from 'react';
import img1 from '../assets/bubbleakka.jpeg';
import { useState } from 'react';
import api from '../Axios';

const Profile = () => {

  const [profilename,setProfilename] = useState("");
  const [email,setEmail] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("/users/profile2"); 
        setProfilename(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    getData();
  },[]);
  

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  return (
    <div className='w-full h-screen mt-6 backdrop-blur-2xl  '>
      <div className=' h-fit w-screen -ml-14 flex  flex-row align-middle justify-center items-center'>
                  <h1 className='text-[10vh] font-serif text-black'>Profile</h1>

      </div>
        <div className='flex flex-row justify-center align-middle items-center drop-shadow-lg  p-16 gap-x-12 gap-2'>
          <div className='w-[45vh] -ml-28 text-gray-950 font-sans '>
This project is an AI-powered chat application built with React.js and TailwindCSS on the frontend, and Node.js with MongoDB on the backend. It integrates Google’s Gemini API to provide intelligent, context-aware responses, allowing users to engage in dynamic conversations similar to ChatGPT. The platform supports user authentication, chat history management, and multiple chat sessions, each stored as separate datasets with messages as subsets, enabling users to revisit and continue previous conversations seamlessly.          </div>
            <img className='size-[60vh] rounded-2xl '  src={img1}/>

            <div className='flex flex-col justify-start align-middle gap-2'>
                <h1 className='text-6xl font-sans text-gray-950 py-2'>{profilename || "LOADING..."}</h1>
                <h3 className='text-2xl font-sans text-gray-950 py-2'>{email || "loading email..." }</h3>
            <div className='p-6 bg-gray-950 rounded-lg shadow-lg shadow-black'onClick={logout}>
                <h2 className='text-white font-sans'>Logout</h2>
            </div>
            </div>
        </div>

    

    </div>
  )
}

export default Profile