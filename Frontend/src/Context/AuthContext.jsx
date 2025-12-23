import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    const [loading, setLoading] = useState(false);

    // Axios config
    const api = axios.create({
        baseURL: "http://localhost:5000/Api/v1/auth",
        withCredentials: true,
    });

    const login = async (username, password) => {
        setLoading(true);
        try {
            const res = await api.post("/login", { username, password });
            const data = res.data;
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Logged in successfully!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const signup = async ({ username, email, password, confirmPassword }) => {
        setLoading(true);
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return false;
        }
        try {
            const res = await api.post("/signup", { username, email, password });
            const data = res.data;
            if (data.error) throw new Error(data.error);

            // Login immediately after signup (optional, usually good UX)
            // For now, just store similar to login or ask to login.
            // Let's assume auto-login if the backend sends token, but typically backend signup returns user data.
            // If backend signup is just creation, we might need to login.
            // Based on my controller, signup returns user info but no token (oops, I should fix that or just redirect to login).
            // Let's redirect to login for safety or just set user if we want.
            // My signup controller does NOT send a token. So user must login.

            toast.success("Account created! Please login.");
            return true;

        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await api.post("/logout");
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, login, signup, logout, loading }}>
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};
