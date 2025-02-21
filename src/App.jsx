import { useState } from 'react'
import { Navigate,BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Home from "./pages/home/home";
import Navbar from "./component/navbar/navbar";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
import './App.css'
import Dashboard from './pages/dashboard/dashboard';
import Categories from "./pages/dashboard/categories";
import Posts from "./pages/dashboard/posts";
import Users from "./pages/dashboard/users";
import CreatePost from "./pages/dashboard/createpost";
import Post from "./pages/post/post";

function App() {

  return (
    <AuthProvider>
      <Router>
      <Navbar />

        <Routes>
   
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* <Route path="*" element={<Navigate to="/home" />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />

        <Route path="/dashboard" element={ <ProtectedRoute requiredRoles={['ADMIN',"MANAGE_POSTS"]}> <Dashboard /> </ProtectedRoute> } /> 
        <Route path="/dashboard/users" element={ <ProtectedRoute requiredRoles={['ADMIN']}>   <Users/> </ProtectedRoute>} />
        <Route path="/dashboard/categories" element={ <ProtectedRoute requiredRoles={['ADMIN']}> <Categories/> </ProtectedRoute> } />
        <Route path="/dashboard/posts" element={  <ProtectedRoute  requiredRoles={["ADMIN", "MANAGE_POSTS"]}  >  <Posts/> </ProtectedRoute> } />
        <Route path="/dashboard/createpost" element={<CreatePost />} />


        <Route path="/posts/:id" element={ <Post/>} />
        <Route path="/categories/:slug" element={   <p>helllo</p>  } />



        
        </Routes>
      </Router> 
  
      </AuthProvider>

  
  );
}

export default App
