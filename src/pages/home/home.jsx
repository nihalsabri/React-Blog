import "./home.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Home = () => {
  const { user } = useAuth(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASE_URL}/posts`);
        console.log("API Response:", res.data);
        if (!res.data || !Array.isArray(res.data.data.posts)) {
          throw new Error("Invalid response format from API");
        }

        setPosts(res.data.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (indexOfLastPost < posts.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
    {loading && <div>Loading...</div>}

    {error && <div className="error-message">{error}</div>}

    {!loading && !error && (
      <div>
        <h1>View Inspiring Posts</h1>
        <div className="post-list">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <div key={post.id} className="post-card">
                {post.thumbnail && <img src={post.thumbnail} alt={post.title} />}
                <h3>{post.author || "Unknown Author"}</h3> 
                <h3>{post.date || "No Date Available"}</h3>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          <span> Page {currentPage} </span>
          <button onClick={nextPage} disabled={indexOfLastPost >= posts.length}>Next</button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Home;
