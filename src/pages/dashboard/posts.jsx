import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import axios from "axios";
const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/posts`)
   
  //     .then(response => setPosts(response))
  //     .catch(error => console.error("Error fetching posts:", error));
  // }, []);

  useEffect(() => {
        axios.get(`${BASE_URL}/posts`)
          .then(response => {
            console.log("API Response:", response.data);
            const fetchedPosts = response.data?.data?.posts;
            
            if (Array.isArray(fetchedPosts)) {
              setPosts(fetchedPosts);
            } else {
              console.error("API response is not an array:", response.data);
              setPosts([]); 
            }
          })
          .catch(error => {
            console.error("Error fetching posts:", error);
            setPosts([]); 
          });
      }, []);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div>
         <Sidebar />
      <h2>Manage Posts</h2>
      
      <Link to="/dashboard/createpost">+ Add New Post</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.createdAt}</td>
              <td>
                <Link to={`/dashboard/posts/edit/${post.id}`}>Edit</Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
