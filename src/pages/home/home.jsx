// import "./home.css";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/authContext";
// import axios from "axios";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";
// import Grid from "@mui/material/Grid";
// import Pagination from "@mui/material/Pagination";
// import { Link } from "@mui/material";

// const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

// const Home = () => {
//   const { user } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postCount, setPostCount] = useState(0);

//   const postsPerPage = 10;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await axios.get(`${BASE_URL}/posts?page=${currentPage}&limit=${postsPerPage}`,
    
//       );

//         console.log("API Response:", res.data);

//         if (!res.data || !res.data.data || !Array.isArray(res.data.data.posts)) {
//           throw new Error("Invalid response format from API");
//         }

//         const formattedPosts = res.data.data.posts.map((post) => ({
//           ...post,
//           author: post.author ? post.author.username : "Unknown Author",
//           date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No Date Available",
//           cover: post.cover ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}` : "https://via.placeholder.com/150",
//         }));

//         setPosts(formattedPosts);
//         setTotalPages(res.data.data.pages); 
//         setPostCount(res.data.data.total); 
//         console.log("formattedPosts:", formattedPosts);
//         console.log("Total posts:", res.data.data.total);
//         console.log("Total Pages:", res.data.data.pages);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setError("Failed to load posts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [currentPage]);

//   const handlePageChange = (event, page) => {
//     console.log("Changing page to:", page);

//     setCurrentPage(page); 
//   };

//   const heroPost = posts[0]; 
//   const remainingPosts = posts.slice(1); 

//   return (
//     <div>
//       {loading && <div>Loading...</div>}
//       {error && <div className="error-message">{error}</div>}

//       {!loading && !error && (
//         <div>
//           <h1>View Inspiring Posts</h1>

//           {heroPost && (
//             <Card sx={{ marginBottom: 4 }}>
//               <CardActionArea>
//                 {heroPost.cover && (
//                   <CardMedia
//                     component="img"
//                     height="400"
//                     src={heroPost.cover}
//                     alt={heroPost.title}
//                   />
//                 )}
//                 <CardContent>
//                   <Typography gutterBottom variant="h3" component="div">
//                     {heroPost.title}
//                   </Typography>
//                   <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                     {heroPost.content}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 2 }}>
//                     Author: {heroPost.author || "Unknown Author"}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     Date: {heroPost.date || "No Date Available"}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions>
//                 <Button size="small" color="primary">
//                   View
//                 </Button>
//                 <Button size="small" color="primary">
//                   Favourite
//                 </Button>
//               </CardActions>
//             </Card>
//           )}

//           <Grid container spacing={4}>
//             {remainingPosts.map((post) => (
//               <Grid item key={post.id} xs={12} sm={6} md={4}>
//                 <Card>
//                   <CardActionArea>
//                     {post.cover && (
//                       <CardMedia
//                         component="img"
//                         height="200"
//                         src={post.cover}
//                         alt={post.title}
//                       />
//                     )}
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {post.title}
//                       </Typography>
//                       <Link href={`/categories/${post.categories[0].category.slug}`} color="primary">
//                         {post.categories[0].category.name}
//                       </Link>
//                       <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                         {post.content}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 1 }}>
//                         Author: {post.author || "Unknown Author"}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                         Date: {post.date || "No Date Available"}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                   <CardActions>
//                   <Link href={`/posts/${post.id}`}>
//                       View
                      
//                     </Link>
                    
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <div className="pagination" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={handlePageChange}
//               variant="outlined"
//               shape="rounded"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import "./home.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { Link } from "@mui/material";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postCount, setPostCount] = useState(0);

  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${BASE_URL}/posts?page=${currentPage}&limit=${postsPerPage}`);

        console.log("API Response:", res.data);

        if (!res.data || !res.data.data || !Array.isArray(res.data.data.posts)) {
          throw new Error("Invalid response format from API");
        }

        const formattedPosts = res.data.data.posts.map((post) => ({
          ...post,
          author: post.author ? post.author.username : "Unknown Author",
          date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No Date Available",
          cover: post.cover
            ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}`
            : "https://via.placeholder.com/150",
        }));

        setPosts(formattedPosts);
        setTotalPages(res.data.data.pages);
        setPostCount(res.data.data.total);
        console.log("formattedPosts:", formattedPosts);
        console.log("Total posts:", res.data.data.total);
        console.log("Total Pages:", res.data.data.pages);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    console.log("Changing page to:", page);
    setCurrentPage(page);
  };

  const heroPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div>
          <h1>View Inspiring Posts</h1>

          {heroPost && (
            <Card sx={{ marginBottom: 4 }}>
              <CardActionArea>
                {heroPost.cover && (
                  <CardMedia
                    component="img"
                    height="400"
                    src={heroPost.cover}
                    alt={heroPost.title}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {heroPost.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {heroPost.content}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 2 }}>
                    Author: {heroPost.author || "Unknown Author"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Date: {heroPost.date || "No Date Available"}
                  </Typography>
                  <div style={{ marginTop: "8px" }}>
                    {heroPost.categories?.length > 0 ? (
                      heroPost.categories.map((cat, index) => (
                        <Link
                          key={index}
                          href={`/categories/${cat.category.slug}`}
                          color="primary"
                          style={{ marginRight: "8px" }}
                        >
                          {cat.category.name}
                        </Link>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Uncategorized
                      </Typography>
                    )}
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="primary">
                  Favourite
                </Button>
              </CardActions>
            </Card>
          )}

          <Grid container spacing={4}>
            {remainingPosts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardActionArea>
                    {post.cover && (
                      <CardMedia
                        component="img"
                        height="200"
                        src={post.cover}
                        alt={post.title}
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <div style={{ marginBottom: "8px" }}>
                        {post.categories?.length > 0 ? (
                          post.categories.map((cat, index) => (
                            <Link
                              key={index}
                              href={`/categories/${cat.category.slug}`}
                              color="primary"
                              style={{ marginRight: "8px" }}
                            >
                              {cat.category.name}
                            </Link>
                          ))
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Uncategorized
                          </Typography>
                        )}
                      </div>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {post.content}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", marginTop: 1 }}>
                        Author: {post.author || "Unknown Author"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Date: {post.date || "No Date Available"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link href={`/posts/${post.id}`}>View</Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div className="pagination" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;