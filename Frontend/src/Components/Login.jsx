import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // 🔐 store JWT
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

export default Login;
