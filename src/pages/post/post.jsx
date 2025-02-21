import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Typography, Box, CircularProgress, Paper, Chip, List, ListItem, ListItemText,Button,  TextareaAutosize,
  IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const Post = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
const [comment,setComment]=useState("");
const [comments,setComments]= useState ([]);
  const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
  const { id } = useParams();

  console.log("Post ID from useParams:", id);

  if (!id) {
    console.error("Post ID is missing!");
    return <Typography color="error">Error: Post ID is missing</Typography>;
  }

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/posts/${id}`);
        console.log("API Response:", res);

        if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
        const data = await res.json();

        console.log("data", data.data);
        setPost(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPost(null); 
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);


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

  const imageUrl =post?.cover ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}` : "https://via.placeholder.com/150";
  console.log("Image URL:", imageUrl);


const OnChangeComment = (e) => {
setComment(e.target.value);

}

const OnClickComment = (e) => {
  setComments((comments) => [...comments,comment]);
  setComment("");
  }
  const handleDeleteComment = (index) => {
    setComments((prevComments) => prevComments.filter((_, i) => i !== index));
  };

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
            <List>
              {post.categories.map((category, index) => (
                <ListItem key={index}>
                  <ListItemText primary={category.category.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      )}

<List>
          {comments.map((text, index) => (
            <ListItem
              key={index}
              sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText primary={text} />
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteComment(index)}
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>


{/* <Box>
<h3>Comments</h3>
<textarea value={comment} onChange={OnChangeComment}/>
<Button onClick={OnClickComment}>Send</Button>
</Box> */}

<Box sx={{ mt: 2 }}>
          <Typography variant="h6">Add a Comment</Typography>
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
          >
            Send
          </Button>
        </Box>

    </Box>
  );
};

export default Post;