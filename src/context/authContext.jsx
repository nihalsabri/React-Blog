import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

  // Restore auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userResponse = await axios.get(`${BASE_URL}/users/@me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (userResponse?.data?.data) {
            const { id, role, username } = userResponse.data.data;
            setUser({ id, username, role });
            localStorage.setItem("user", JSON.stringify({ id, username, role }));
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]); // Runs when token changes

  // Save token in localStorage when it updates
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // Save user in localStorage when it updates
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signup`, { username, email, password });
      return data;
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signing`, { username, password });

      if (data?.data) {
        const newToken = data.data;
        setToken(newToken); // Store token in state
        localStorage.setItem("token", newToken);

        const userResponse = await axios.get(`${BASE_URL}/users/@me`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });

        if (userResponse?.data?.data) {
          const { id, role, username } = userResponse.data.data;
          setUser({ id, username, role });
          localStorage.setItem("user", JSON.stringify({ id, username, role }));
        } else {
          throw new Error("Failed to fetch user data.");
        }
      } else {
        throw new Error("Invalid login response.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const checkAuth = () => !!user || !!localStorage.getItem("user");

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
