import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM DATA SENT:", form);

    try {
      const res = await api.post("/auth/register", form);
      console.log("REGISTER RESPONSE:", res.data);
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error.response?.data);
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div>
            <h2 className="text-6xl font-sans text-green-500 p-3">Signup</h2>

    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
                  className="p-4 w-[50vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"

      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
                  className="p-4 w-[50vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"

      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
                  className="p-4 w-[50vh] rounded-lg text-white placeholder:text-green-500 bg-green-900/30"

      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
    </div>
  );
};

export default Register;
