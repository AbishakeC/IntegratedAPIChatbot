import { useEffect } from 'react';
import img1 from '../assets/pullovergirl.jpg';
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
    <div className='w-full h-screen mt-6 '>
        <div className='flex flex-row justify-center align-middle items-center gap-x-12 gap-2'>
          <div className='w-[45vh] -ml-28 text-green-500 font-sans '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa modi libero aliquid, omnis, deserunt numquam quis sit ratione tenetur neque eaque nihil similique ab reiciendis cum quos explicabo accusamus maxime veniam voluptatibus amet deleniti aliquam. Mollitia rem, suscipit alias neque ipsum reprehenderit vel, aspernatur molestias impedit, sed corporis laudantium! Qui.
          </div>
            <img className='size-[60vh] rounded-2xl '  src={img1}/>

            <div className='flex flex-col justify-start align-middle gap-2'>
                <h1 className='text-6xl font-sans text-green-500 py-2'>{profilename || "LOADING..."}</h1>
                <h3 className='text-2xl font-sans text-green-500 py-2'>{email || "loading email..." }</h3>
            <div className='p-6 bg-black/30 rounded-lg shadow-lg shadow-black'onClick={logout}>
                <h2 className='text-white font-sans'>Logout</h2>
            </div>
            </div>
        </div>

    

    </div>
  )
}

export default Profile