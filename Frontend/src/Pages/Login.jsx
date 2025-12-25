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
      <h2 className="text-9xl h-[50vh] inline-flex justify-center items-center font-sans border-r-4 border-pink-600 rounded-lg text-white p-3">Login</h2>
      
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
        <p className='text-white font-sans relative w-[60vh] my-3'>if dosen't have an account ? <span className='text-md font-semibold text-white bg-black/40 hover:bg-pink-600/50 p-2 rounded-lg cursor-pointer' onClick={()=>navigate("/registration")}>Create new Account</span></p>

        <button type="submit" className="bg-black text-white rounded-xl my-2 p-2 ml-12">Login</button>
      </form>
      </div>
    </div>
  )


}

export default Login