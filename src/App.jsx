import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Home from "./pages/home/home";
import Navbar from "./component/navbar/navbar";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider } from "./context/authContext";

import './App.css'

function App() {


  return (

    <AuthProvider>
      <Router>
      <Navbar />
        <Routes>
   
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>


  
  )
}

export default App
