

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});

const Login = () => {


  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  
  } = useForm({
    resolver: zodResolver(schema),
  });
  
  const handleLogin = async (data) => {
    console.log("Sending login request with data:", data);
    setError(null);
  
    try {
      const res = await axios.post(`${BASE_URL}/auth/signing`, data);
      await login(data.username, data.password); 
      alert("Login successful!");
      navigate("/"); 
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed");
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input type="text" placeholder="Username"  {...register("username")} />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        </div>

        <div>
          <input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}

        </button>
      </form>
    </div>
  );
};

export default Login;
