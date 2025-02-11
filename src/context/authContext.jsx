import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const login = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/signing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Invalid credentials");
    }

    const data = await res.json();
    console.log("Login success:", data);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  const checkAuth = () => {
    return !!user || !!localStorage.getItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
