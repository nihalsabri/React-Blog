import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

import { useParams } from "react-router-dom";

const Post = () => {
  const [loading, setLoading] = useState(true);
const [post, setPost] = useState([]);

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
  const { id } = useParams();
  if (!id) {
    console.error("Post ID is missing!");
    return <p>Error: Post ID is missing</p>;
}

    useEffect(() => {
        const fetchPost = async () => {
          setLoading(true);
          try {
            const res = await fetch(`${BASE_URL}/posts/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
            const data = await res.json();
            setPost(data.post);
          } catch (error) {
            console.error("Error fetching posts:", error);
            
          } finally {
            setLoading(false);
          }
        };
        fetchPost();
      }, []);

      return(

<div>
    <h1>Detailed Post</h1>
    {loading ? (
      <div>Loading...</div>
    ) : !post ? (
      <p>Error: Post not found</p>
    ) : (
      <div className="post-detailed">
        <img src={post.thumbnail} alt={post.title} />
        <h3>{post.author}</h3> <h3>{post.date}</h3>
        <h2>{post.title}</h2>
        <p>{post.price}</p>
      </div>
    )}
    </div>
);
};

export default Post;