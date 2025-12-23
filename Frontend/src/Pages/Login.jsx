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
    <div className=" scale-90 h-[90vh] w-screen bg-gradient-to-tr from-black via-green-800/30 to-black flex  flex-row space-x-6 justify-center align-middle items-center">
      <h2 className="text-6xl font-sans text-green-500 p-3">Login</h2>
      
      <div className="">
      <form onSubmit={handleSubmit} style={styles.form} className=" w-[100vh] h-fit  p-4 flex flex-col">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="p-4 w-[60vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="p-4 w-[60vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"

        />
        <p className='text-green-500 font-sans relative w-[60vh]'>if dosen't have an account ? <span className='text-lg font-sans text-white cursor-pointer' onClick={()=>navigate("/")}>Create new Account</span></p>

        <button type="submit" className="bg-green-500 rounded-xl p-2 ml-12">Login</button>
      </form>
      </div>
    </div>
  )


}

export default Login