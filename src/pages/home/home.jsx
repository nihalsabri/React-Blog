import "./home.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
const Home = () => {
    const { user } = useAuth(); 
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          try {
            const res = await fetch(`${BASE_URL}/api/v1/posts`);
            if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
            const data = await res.json();
            setPosts(data.products);
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
            <h1> View Inspiring Posts</h1>
          <div className="post-list">
            {currentPosts.map((post) => (
              <div key={post.id} className="post-card">
                <img src={post.thumbnail} alt={post.title} />
                <h3>{post.auther}</h3> <h3>{post.date}</h3>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            ))}

        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
            <span> Page {currentPage} </span>
            <button onClick={nextPage} disabled={indexOfLastPost >= posts.length}>Next</button>
        </div>

        </div>
        </div>
        )}
</div>
 );

};
export default Home;


