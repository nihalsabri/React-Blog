import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});

const Signup = () => {
  const [error, setError] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignup = async (data) => {
    setError(null);
    console.log("Sending request with data:", data);

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, data);
      alert("Signup successful! Please log in.");
      reset(); 
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(handleSignup)}>
        <div>
          <input type="text" placeholder="Username" {...register("username")} />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        </div>

        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
