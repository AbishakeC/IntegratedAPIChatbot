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

     const confirmedDelete = window.confirm(
      "Are you sure about Logout...."
    )

    if(!confirmedDelete) return;

    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const DeleteAccount = async()=>{
    const confirmedDelete = window.confirm(
      "this will delete your profile permanently...."
    )

    if(!confirmedDelete) return;

    try{
      await api.delete("/users/deleteprofile");

      localStorage.removeItem('token');
      window.location.href="/login";

    }catch(error){
      console.error(error);
      alert("failed to delete this account....")
    }
  }


  return (
    <div className='w-full h-screen mt-6 backdrop-blur-2xl  '>
      <div className=' h-fit w-screen -ml-14 flex  flex-row align-middle justify-center items-center'>
                  <h1 className='text-[7vh] font-semibold text-white ml-24'>Profile</h1>

      </div>
        <div className='flex flex-row justify-center align-middle items-center drop-shadow-lg  p-16 gap-x-12 gap-2'>
          <div className='w-[45vh] -ml-28 text-white font-sans '>
This project is an AI-powered chat application built with React.js and TailwindCSS on the frontend, and Node.js with MongoDB on the backend. It integrates Google’s Gemini API to provide intelligent, context-aware responses, allowing users to engage in dynamic conversations similar to ChatGPT. The platform supports user authentication, chat history management, and multiple chat sessions, each stored as separate datasets with messages as subsets, enabling users to revisit and continue previous conversations seamlessly.          </div>
            <img className='size-[60vh] rounded-2xl '  src={img1}/>

            <div className='flex flex-col justify-start align-middle gap-2'>
                <h1 className='text-6xl font-sans text-white py-2'>{profilename || "LOADING..."}</h1>
                <h3 className='text-2xl font-sans text-white py-2'>{email || "loading email..." }</h3>
            <div className='p-6 bg-gray-950 inline-flex items-center justify-center rounded-lg group shadow-lg shadow-black cursor-pointer hover:bg-white hover:text-red-600 hover:scale-110 duration-150'onClick={logout}>
                <h2 className='text-white  group-hover:text-rose-600 font-sans'>Logout</h2>
            </div>
                <div className='p-4 bg-gray-950 inline-flex justify-center items-center rounded-lg shadow-lg shadow-black cursor-pointer hover:bg-white hover:text-red-600 hover:scale-110 duration-150'onClick={DeleteAccount}>
                <h2 className='text-red-600 font-sans'>Delete profile</h2>
            </div>

            </div>
        </div>

    

    </div>
  )
}

export default Profile