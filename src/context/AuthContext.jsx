import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => { 
  const [user, setUser] = useState( 
    JSON.parse(localStorage.getItem("user")) || null 
  );

  const [loading, setLoading] = useState(false); 

  const login = async (data) => {




    setLoading(true); 
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/backend/auth/loginuser`,
      data,
      { withCredentials: true }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(res.data.token));
    setUser(res.data.user);
    setLoading(false);
  };

  const register = async (data) => {
    setLoading(true);
    await axios.post(
      `${import.meta.env.VITE_API_URL}/backend/auth/createuser`,
      data
    );
    setLoading(false); 
  };
  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/backend/auth/logoutuser`,
      {},
      { withCredentials: true }
    );
  
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    setUser(null);
  };
  

  return ( 
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children} {/* Corrected prop name */}
    </AuthContext.Provider>
  );
}; 

export const useAuth = () => useContext(AuthContext);
