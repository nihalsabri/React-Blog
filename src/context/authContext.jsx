
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
  
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        
        if (!user || user.id !== parsedUser.id) {  
          setUser(parsedUser);
        }
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error(" Error parsing user data from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []); 
  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signup`, { username, email, password });
      console.log("Signup success:", data);
      return data; 
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1])); 
    } catch (error) {
      console.error("Failed to parse JWT:", error);
      return null;
    }
  };
  
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signing`, { username, password });
  
      console.log("🔹 API Response:", data);
  
      if (data?.data) {
        const decodedToken = parseJwt(data.data); 
  
        if (decodedToken?.userId) {
          const user = { id: decodedToken.userId, username };
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", data.data);
          console.log(" User stored:", user);
        } else {
          throw new Error("Invalid user data in token.");
        }
      } else {
        throw new Error("Invalid user data received.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      throw new Error("Invalid credentials");
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const checkAuth = () => !!user || !!localStorage.getItem("user");

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
