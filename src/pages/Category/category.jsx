

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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

const CategoryPosts = () => {
  const { slug } = useParams(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [postCount, setPostCount] = useState(0);

  const postsPerPage = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!slug) return;
    const fetchCategoryBySlug = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/s/${slug}`);
        setCurrentCategory(response.data.data || null);
      } catch (error) {
        console.error("Error fetching category by slug:", error);
        setCurrentCategory(null);
      }
    };
    fetchCategoryBySlug();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    const fetchPosts = async () => {
      try {
   
        const response = await axios.get(`${BASE_URL}/posts`);

        console.log("API Response:", response.data);

        if (!response.data || !response.data.data || !Array.isArray(response.data.data.posts)) {
          throw new Error("Invalid response format from API");
        }

        const filteredPosts = response.data.data.posts.filter((post) => {
          console.log("Post Categories:", post.categories);
          console.log("Selected Slug:", slug);
          return post.categories?.some((cat) => cat.category?.slug === slug) || false;
        });

        console.log("Filtered Posts:", filteredPosts);
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        console.log("Paginated Posts:", paginatedPosts);

        const formattedPosts = paginatedPosts.map((post) => ({
          ...post,
          author: post.author?.username || "Unknown Author",
          date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No Date Available",
          cover: post.cover
            ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}`
            : "https://via.placeholder.com/150",
        }));
        setPosts(formattedPosts);
        setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
        setPostCount(filteredPosts.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug, page]);

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page }); 
  };

  const heroPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div>
          <h1>View Posts in {currentCategory?.name || "Category"}</h1>

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
              <Link href={`/posts/${heroPost.id}`}>View</Link>
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
              page={page}
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

export default CategoryPosts;
