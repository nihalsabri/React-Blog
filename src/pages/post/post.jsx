import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Typography, Box, CircularProgress, Paper, Chip, List, ListItem, ListItemText, Button, TextareaAutosize, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "@mui/material";
import axios from "axios";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Post = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); 
  const [deletingCommentId, setDeletingCommentId] = useState(null); 
  const { id } = useParams();
  const { user } = useAuth(); 

  if (!id) {
    console.error("Post ID is missing!");
    return <Typography color="error">Error: Post ID is missing</Typography>;
  }

  
  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        // Fetch the post
        const postResponse = await axios.get(`${BASE_URL}/posts/${id}`);
        setPost(postResponse.data.data);

        // Fetch the comments for the post
        const commentsResponse = await axios.get(`${BASE_URL}/comments`, {
          params: { postId: id }, // Filter comments by postId
        });
        setComments(commentsResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPost(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const OnChangeComment = (e) => {
    setComment(e.target.value);
  };



  const OnClickComment = async () => {
    if (!comment.trim()) return; 
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }
  
      console.log("Submitting comment:", comment);
  

      const createResponse = await axios.post(
        `${BASE_URL}/comments`,
        {
          text: comment,
          postId: Number(id), 
          replyId: replyingTo?.id || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Comment created successfully:", createResponse.data);
  
      
      const fetchResponse = await axios.get(`${BASE_URL}/comments`, {
        params: { postId: id }, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Fetched comments:", fetchResponse.data);
  
      if (fetchResponse.data && fetchResponse.data.data) {
      
        setComments(fetchResponse.data.data);
      } else {
        console.error("Invalid response format:", fetchResponse.data);
      }
      setComment("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error creating comment:", error.response?.data || error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setDeletingCommentId(commentId);
      const token = localStorage.getItem("token"); 
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      await axios.delete(`${BASE_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setComments((prevComments) => prevComments.filter((c) => c.id !== commentId)); 
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeletingCommentId(null); 
    }
  };

  const canDeleteComment = (comment) => {
    if (!user || !comment) return false; 
    
    console.log("User Role:", user.role);
    console.log("Comment Author ID:", comment.authorId);
    console.log("User ID:", user.id);
  
    return user.id === comment.authorId || user.role?.toLowerCase() === "admin";
  }; 

  const parseTags = (tags) => {
    if (!tags) return [];
    try {
      const cleanedTags = tags.replace(/\\"/g, '"').replace(/^"|"$/g, '');
      const parsedTags = JSON.parse(cleanedTags);
      return Array.isArray(parsedTags) ? parsedTags : [];
    } catch (error) {
      console.error("Error parsing tags:", error);
      return [];
    }
  };

  const imageUrl = post?.cover
    ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}`
    : "https://via.placeholder.com/150";

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        Detailed Post
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : !post ? (
        <Typography color="error">Error: Post not found</Typography>
      ) : (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              alt={post.title}
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />
          )}

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>By:</strong> {post.author ? post.author.username : "Unknown Author"}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            <strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}
          </Typography>

          <Typography variant="h4" sx={{ mt: 2 }}>
            {post.title}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {post.content}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Tags:</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {parseTags(post.tags).map((tag, index) => (
                <Chip key={index} label={tag} variant="outlined" />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Categories:</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {post.categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category.category.name}
                  variant="outlined"
                  component={Link}
                  href={`/categories/${category.category.slug}`}
                  clickable
                />
              ))}
            </Box>
          </Box>
        </Paper>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        <List>
          {comments.map((comment) => (
            <ListItem
            key={comment.id || Math.random()}
              sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={comment.text || "Nice"}
           
              />
              <Box>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => setReplyingTo(comment)} 
                >
                  Reply
                </Button>
                {canDeleteComment(comment) && ( 
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                    disabled={deletingCommentId === comment.id} 
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>

        {user ? ( 
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Add a Comment</Typography>
            {replyingTo && (
              <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                Replying to: {replyingTo.text}
              </Typography>
            )}
            <TextareaAutosize
              minRows={3}
              placeholder="Write your comment..."
              value={comment}
              onChange={OnChangeComment}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={OnClickComment}
              sx={{ mt: 2 }}
              disabled={!comment.trim()} 
            >
              {replyingTo ? "Reply" : "Send"}
            </Button>
            {replyingTo && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setReplyingTo(null)} 
                sx={{ mt: 2, ml: 2 }}
              >
                Cancel
              </Button>
            )}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
            Please log in to leave a comment.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Post;