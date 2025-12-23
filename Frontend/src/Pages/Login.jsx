import {useState} from "react"
import {useNavigate} from "react-router-dom";
import api from "../Axios" 

const Login = () => {
   
  const navigate = useNavigate();
  const [form,setForm] = useState({
    email:"",password:""
  });

  const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      
       localStorage.setItem("token",res.data.token);
       alert("logged-in sucess fully....");

       navigate("/Platform")

     } catch (error) {
      alert(error.response?.data?.message || "Login failed");
     }
  }

  const styles = {
  container: { padding: 40 },
  form: { display: "flex", flexDirection: "column", gap: 10, width: 300 },
};


  
  return (
    <div className=" scale-90 h-screen w-screen  flex  flex-row space-x-6 justify-center align-middle items-center rounded-3xl">
      <h2 className="text-6xl font-sans text-black p-3">Login</h2>
      
      <div className="">
      <form onSubmit={handleSubmit} style={styles.form} className=" w-[100vh] h-fit  p-4 flex flex-col">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
className="p-4 w-[50vh] rounded-lg text-black placeholder:text-purple-900 bg-white"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
className="p-4 w-[50vh] rounded-lg text-black placeholder:text-purple-900 bg-white"

        />
        <p className='text-black font-sans relative w-[60vh]'>if dosen't have an account ? <span className='text-lg font-sans text-yellow-500 cursor-pointer' onClick={()=>navigate("/registration")}>Create new Account</span></p>

        <button type="submit" className="bg-black text-white rounded-xl p-2 ml-12">Login</button>
      </form>
      </div>
    </div>
  )


}

export default Login