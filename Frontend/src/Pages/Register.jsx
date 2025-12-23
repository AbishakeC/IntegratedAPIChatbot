import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import api from "../Axios"
import vrcam from "../assets/vrcam.jpg"

const Register = () => {
    const navigate = useNavigate();
    const [form,setForm] = useState({
        name:"", email:"" , password:""
    });
    
    const handleChange=(e)=>{
       setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            await api.post("/auth/register",form);
            navigate("/login");
            alert("registration_sucessfull.....");
        } catch (error) {
             alert(error.response?.data?.message || "Registration failed");
        }
    }

    const styles = {
  container: { padding: 40 },
  form: { display: "flex", flexDirection: "column", gap: 10, width: 300 },
};

//bg-[url('..\src\assets\vrcam.jpg')]


  return (
    <div className="w-screen h-[90vh] bg-gradient-to-tr from-black via-green-800/30 to-black  flex flex-row justify-center align-middle items-center p-4 space-x-16 rounded scale-90  bg-cover ">
      {/* <div className='bg-black/70 w-full  h-full z-10 absolute'></div> */}
      <h2 className="text-9xl font-sans text-green-500 z-20 p-3 ">Register</h2>
      <form onSubmit={handleSubmit} className='flex flex-col z-20 justify-center align-middle items-center p-8 space-y-4 shadow-lg shadow-black rounded-lg'>
        <input name="name" placeholder="Name" onChange={handleChange} required                   className="p-4 w-[50vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"
 />
        <input name="email" placeholder="Email" onChange={handleChange} required                   className="p-4 w-[50vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"
 />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
                            className="p-4 w-[50vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"

        />

              <p className='text-green-500 font-sans'>if already have an account ? <span className='text-xl font-sans text-white cursor-pointer' onClick={()=>navigate("/login")}> Login/signup</span></p>

        <button type="submit" className="bg-green-500 rounded-xl p-4 ">Register</button>
      </form>

    </div>
  )
}

export default Register