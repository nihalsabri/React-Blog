// // // import { useState, useEffect } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { useAuth } from "../../context/authContext";
// // // import { Typography, Box, CircularProgress, Paper, Chip, List, ListItem, ListItemText,Button,  TextareaAutosize,
// // //   IconButton } from "@mui/material";
// // // import DeleteIcon from "@mui/icons-material/Delete";
// // // const Post = () => {
// // //   const [loading, setLoading] = useState(true);
// // //   const [post, setPost] = useState(null);
// // // const [comment,setComment]=useState("");
// // // const [comments,setComments]= useState ([]);
// // //   const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
// // //   const { id } = useParams();

// // //   console.log("Post ID from useParams:", id);

// // //   if (!id) {
// // //     console.error("Post ID is missing!");
// // //     return <Typography color="error">Error: Post ID is missing</Typography>;
// // //   }

// // //   useEffect(() => {
// // //     const fetchPost = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const res = await fetch(`${BASE_URL}/posts/${id}`);
// // //         console.log("API Response:", res);

// // //         if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
// // //         const data = await res.json();

// // //         console.log("data", data.data);
// // //         setPost(data.data);
// // //       } catch (error) {
// // //         console.error("Error fetching posts:", error);
// // //         setPost(null); 
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchPost();
// // //   }, [id]);


// // //   const parseTags = (tags) => {
// // //     if (!tags) return []; 
// // //     try {
     
// // //       const cleanedTags = tags.replace(/\\"/g, '"').replace(/^"|"$/g, '');
// // //       const parsedTags = JSON.parse(cleanedTags);
// // //       return Array.isArray(parsedTags) ? parsedTags : []; 
// // //     } catch (error) {
// // //       console.error("Error parsing tags:", error);
// // //       return []; 
// // //     }
// // //   };

// // //   const imageUrl =post?.cover ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}` : "https://via.placeholder.com/150";
// // //   console.log("Image URL:", imageUrl);


// // // const OnChangeComment = (e) => {
// // // setComment(e.target.value);

// // // }

// // // const OnClickComment = (e) => {
// // //   setComments((comments) => [...comments,comment]);
// // //   setComment("");
// // //   }
// // //   const handleDeleteComment = (index) => {
// // //     setComments((prevComments) => prevComments.filter((_, i) => i !== index));
// // //   };

// // //   return (
// // //     <Box sx={{ padding: 3 }}>
// // //       <Typography variant="h3" gutterBottom>
// // //         Detailed Post
// // //       </Typography>

// // //       {loading ? (
// // //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
// // //           <CircularProgress />
// // //         </Box>
// // //       ) : !post ? (
// // //         <Typography color="error">Error: Post not found</Typography>
// // //       ) : (
// // //         <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
      
// // //           {imageUrl && (
// // //             <Box
// // //               component="img"
// // //               src={imageUrl}
// // //               alt={post.title}
// // //               sx={{ width: "100%", borderRadius: 2, mb: 2 }}
// // //             />
// // //           )}

// // //           <Typography variant="body1" sx={{ mt: 2 }}>
// // //             <strong>By:</strong> {post.author ? post.author.username : "Unknown Author"}
// // //           </Typography>

// // //           <Typography variant="subtitle1" sx={{ mt: 1 }}>
// // //             <strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}
// // //           </Typography>
   
// // //           <Typography variant="h4" sx={{ mt: 2 }}>
// // //             {post.title}
// // //           </Typography>

// // //           <Typography variant="body1" sx={{ mt: 2 }}>
// // //             {post.content}
// // //           </Typography>


// // //           <Box sx={{ mt: 2 }}>
// // //             <Typography variant="h6">Tags:</Typography>
// // //             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
// // //               {parseTags(post.tags).map((tag, index) => (
// // //                 <Chip key={index} label={tag} variant="outlined" />
// // //               ))}
// // //             </Box>
// // //           </Box>

// // //           <Box sx={{ mt: 2 }}>
// // //             <Typography variant="h6">Categories:</Typography>
// // //             <List>
// // //               {post.categories.map((category, index) => (
// // //                 <ListItem key={index}>
// // //                   <ListItemText primary={category.category.name} />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //           </Box>
// // //         </Paper>
// // //       )}

// // // <List>
// // //           {comments.map((text, index) => (
// // //             <ListItem
// // //               key={index}
// // //               sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}
// // //             >
// // //               <ListItemText primary={text} />
// // //               <IconButton
// // //                 aria-label="delete"
// // //                 onClick={() => handleDeleteComment(index)}
// // //                 sx={{ color: "red" }}
// // //               >
// // //                 <DeleteIcon />
// // //               </IconButton>
// // //             </ListItem>
// // //           ))}
// // //         </List>


// // // {/* <Box>
// // // <h3>Comments</h3>
// // // <textarea value={comment} onChange={OnChangeComment}/>
// // // <Button onClick={OnClickComment}>Send</Button>
// // // </Box> */}

// // // <Box sx={{ mt: 2 }}>
// // //           <Typography variant="h6">Add a Comment</Typography>
// // //           <TextareaAutosize
// // //             minRows={3}
// // //             placeholder="Write your comment..."
// // //             value={comment}
// // //             onChange={OnChangeComment}
// // //             style={{ width: "100%", padding: "8px", fontSize: "16px" }}
// // //           />
// // //           <Button
// // //             variant="contained"
// // //             color="primary"
// // //             onClick={OnClickComment}
// // //             sx={{ mt: 2 }}
// // //           >
// // //             Send
// // //           </Button>
// // //         </Box>

// // //     </Box>
// // //   );
// // // };

// // // export default Post;


// // import { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import { useAuth } from "../../context/authContext";
// // import { Typography, Box, CircularProgress, Paper, Chip, List, ListItem, ListItemText, Button, TextareaAutosize, IconButton } from "@mui/material";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import { Link } from "@mui/material";

// // const Post = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [post, setPost] = useState(null);
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
// //   const { id } = useParams();

// //   console.log("Post ID from useParams:", id);

// //   if (!id) {
// //     console.error("Post ID is missing!");
// //     return <Typography color="error">Error: Post ID is missing</Typography>;
// //   }

// //   useEffect(() => {
// //     const fetchPost = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await fetch(`${BASE_URL}/posts/${id}`);
// //         console.log("API Response:", res);

// //         if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);
// //         const data = await res.json();

// //         console.log("data", data.data);
// //         setPost(data.data);
// //       } catch (error) {
// //         console.error("Error fetching posts:", error);
// //         setPost(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPost();
// //   }, [id]);

// //   const parseTags = (tags) => {
// //     if (!tags) return [];
// //     try {
// //       const cleanedTags = tags.replace(/\\"/g, '"').replace(/^"|"$/g, '');
// //       const parsedTags = JSON.parse(cleanedTags);
// //       return Array.isArray(parsedTags) ? parsedTags : [];
// //     } catch (error) {
// //       console.error("Error parsing tags:", error);
// //       return [];
// //     }
// //   };

// //   const imageUrl = post?.cover ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}` : "https://via.placeholder.com/150";
// //   console.log("Image URL:", imageUrl);

// //   const OnChangeComment = (e) => {
// //     setComment(e.target.value);
// //   };

// //   const OnClickComment = (e) => {
// //     setComments((comments) => [...comments, comment]);
// //     setComment("");
// //   };

// //   const handleDeleteComment = (index) => {
// //     setComments((prevComments) => prevComments.filter((_, i) => i !== index));
// //   };

// //   return (
// //     <Box sx={{ padding: 3 }}>
// //       <Typography variant="h3" gutterBottom>
// //         Detailed Post
// //       </Typography>

// //       {loading ? (
// //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
// //           <CircularProgress />
// //         </Box>
// //       ) : !post ? (
// //         <Typography color="error">Error: Post not found</Typography>
// //       ) : (
// //         <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
// //           {imageUrl && (
// //             <Box
// //               component="img"
// //               src={imageUrl}
// //               alt={post.title}
// //               sx={{ width: "100%", borderRadius: 2, mb: 2 }}
// //             />
// //           )}

// //           <Typography variant="body1" sx={{ mt: 2 }}>
// //             <strong>By:</strong> {post.author ? post.author.username : "Unknown Author"}
// //           </Typography>

// //           <Typography variant="subtitle1" sx={{ mt: 1 }}>
// //             <strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}
// //           </Typography>

// //           <Typography variant="h4" sx={{ mt: 2 }}>
// //             {post.title}
// //           </Typography>

// //           <Typography variant="body1" sx={{ mt: 2 }}>
// //             {post.content}
// //           </Typography>

// //           <Box sx={{ mt: 2 }}>
// //             <Typography variant="h6">Tags:</Typography>
// //             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
// //               {parseTags(post.tags).map((tag, index) => (
// //                 <Chip key={index} label={tag} variant="outlined" />
// //               ))}
// //             </Box>
// //           </Box>

// //           <Box sx={{ mt: 2 }}>
// //             <Typography variant="h6">Categories:</Typography>
// //             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
// //               {post.categories.map((category, index) => (
// //                 <Chip
// //                   key={index}
// //                   label={category.category.name}
// //                   variant="outlined"
// //                   component={Link}
// //                   href={`/categories/${category.category.slug}`}
// //                   clickable
// //                 />
// //               ))}
// //             </Box>
// //           </Box>
// //         </Paper>
// //       )}

// //       <List>
// //         {comments.map((text, index) => (
// //           <ListItem
// //             key={index}
// //             sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}
// //           >
// //             <ListItemText primary={text} />
// //             <IconButton
// //               aria-label="delete"
// //               onClick={() => handleDeleteComment(index)}
// //               sx={{ color: "red" }}
// //             >
// //               <DeleteIcon />
// //             </IconButton>
// //           </ListItem>
// //         ))}
// //       </List>

// //       <Box sx={{ mt: 2 }}>
// //         <Typography variant="h6">Add a Comment</Typography>
// //         <TextareaAutosize
// //           minRows={3}
// //           placeholder="Write your comment..."
// //           value={comment}
// //           onChange={OnChangeComment}
// //           style={{ width: "100%", padding: "8px", fontSize: "16px" }}
// //         />
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           onClick={OnClickComment}
// //           sx={{ mt: 2 }}
// //         >
// //           Send
// //         </Button>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Post;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../context/authContext";
// import { Typography, Box, CircularProgress, Paper, Chip, List, ListItem, ListItemText, Button, TextareaAutosize, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Link } from "@mui/material";
// import axios from "axios";

// const Post = () => {
//   const [loading, setLoading] = useState(true);
//   const [post, setPost] = useState(null);
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
//   const { id } = useParams();
//   const { user } = useAuth(); // Get the authenticated user

//   console.log("Post ID from useParams:", id);

//   if (!id) {
//     console.error("Post ID is missing!");
//     return <Typography color="error">Error: Post ID is missing</Typography>;
//   }

//   // Fetch the post and its comments
//   useEffect(() => {
//     const fetchPostAndComments = async () => {
//       setLoading(true);
//       try {
//         // Fetch the post
//         const postResponse = await axios.get(`${BASE_URL}/posts/${id}`);
//         console.log("Post API Response:", postResponse.data);
//         setPost(postResponse.data.data);

//         // Fetch the comments for the post
//         const commentsResponse = await axios.get(`${BASE_URL}/comments`, {
//           params: { postId: id }, // Filter comments by postId
//         });
//         console.log("Comments API Response:", commentsResponse.data);
//         setComments(commentsResponse.data.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setPost(null);
//         setComments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostAndComments();
//   }, [id]);

//   // Handle comment input change
//   const OnChangeComment = (e) => {
//     setComment(e.target.value);
//   };

//   // Handle comment submission
//   const OnClickComment = async () => {
//     if (!comment.trim()) return; // Prevent empty comments

//     try {
//       const response = await axios.post(`${BASE_URL}/comments`, {
//         postId: id, // Associate the comment with the current post
//         content: comment,
//         authorId: user?.id, // Use the authenticated user's ID
//       });

//       console.log("Comment created:", response.data);
//       setComments((prevComments) => [response.data.data, ...prevComments]); // Add the new comment to the list
//       setComment(""); // Clear the input
//     } catch (error) {
//       console.error("Error creating comment:", error);
//     }
//   };

//   // Handle comment deletion
//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`${BASE_URL}/comments/${commentId}`);
//       setComments((prevComments) => prevComments.filter((c) => c.id !== commentId)); // Remove the deleted comment
//       console.log("Comment deleted:", commentId);
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   // Parse tags for display
//   const parseTags = (tags) => {
//     if (!tags) return [];
//     try {
//       const cleanedTags = tags.replace(/\\"/g, '"').replace(/^"|"$/g, '');
//       const parsedTags = JSON.parse(cleanedTags);
//       return Array.isArray(parsedTags) ? parsedTags : [];
//     } catch (error) {
//       console.error("Error parsing tags:", error);
//       return [];
//     }
//   };

//   const imageUrl = post?.cover
//     ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${post.cover}`
//     : "https://via.placeholder.com/150";
//   console.log("Image URL:", imageUrl);

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h3" gutterBottom>
//         Detailed Post
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//           <CircularProgress />
//         </Box>
//       ) : !post ? (
//         <Typography color="error">Error: Post not found</Typography>
//       ) : (
//         <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
//           {imageUrl && (
//             <Box
//               component="img"
//               src={imageUrl}
//               alt={post.title}
//               sx={{ width: "100%", borderRadius: 2, mb: 2 }}
//             />
//           )}

//           <Typography variant="body1" sx={{ mt: 2 }}>
//             <strong>By:</strong> {post.author ? post.author.username : "Unknown Author"}
//           </Typography>

//           <Typography variant="subtitle1" sx={{ mt: 1 }}>
//             <strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}
//           </Typography>

//           <Typography variant="h4" sx={{ mt: 2 }}>
//             {post.title}
//           </Typography>

//           <Typography variant="body1" sx={{ mt: 2 }}>
//             {post.content}
//           </Typography>

//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Tags:</Typography>
//             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//               {parseTags(post.tags).map((tag, index) => (
//                 <Chip key={index} label={tag} variant="outlined" />
//               ))}
//             </Box>
//           </Box>

//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Categories:</Typography>
//             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//               {post.categories.map((category, index) => (
//                 <Chip
//                   key={index}
//                   label={category.category.name}
//                   variant="outlined"
//                   component={Link}
//                   href={`/categories/${category.category.slug}`}
//                   clickable
//                 />
//               ))}
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Comments Section */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Comments
//         </Typography>

//         <List>
//           {comments.map((comment) => (
//             <ListItem
//               key={comment.id}
//               sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}
//             >
//               <ListItemText
//                 primary={comment.content}
//                 secondary={`By: ${comment.author?.username || "Unknown"} - ${new Date(comment.createdAt).toLocaleDateString()}`}
//               />
//               {user?.id === comment.authorId && ( // Only show delete button for the comment author
//                 <IconButton
//                   aria-label="delete"
//                   onClick={() => handleDeleteComment(comment.id)}
//                   sx={{ color: "red" }}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               )}
//             </ListItem>
//           ))}
//         </List>

//         {/* Add a Comment Section */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Add a Comment</Typography>
//           <TextareaAutosize
//             minRows={3}
//             placeholder="Write your comment..."
//             value={comment}
//             onChange={OnChangeComment}
//             style={{ width: "100%", padding: "8px", fontSize: "16px" }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={OnClickComment}
//             sx={{ mt: 2 }}
//             disabled={!comment.trim()} // Disable the button if the comment is empty
//           >
//             Send
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Post;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Typography, Box, CircularProgress, Paper, Chip, List, ListItem, ListItemText, Button, TextareaAutosize, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "@mui/material";
import axios from "axios";

const Post = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); // Track the comment being replied to
  const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";
  const { id } = useParams();
  const { user } = useAuth(); // Get the authenticated user and their role

  console.log("Post ID from useParams:", id);

  if (!id) {
    console.error("Post ID is missing!");
    return <Typography color="error">Error: Post ID is missing</Typography>;
  }

  // Fetch the post and its comments
  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        // Fetch the post
        const postResponse = await axios.get(`${BASE_URL}/posts/${id}`);
        console.log("Post API Response:", postResponse.data);
        setPost(postResponse.data.data);

        // Fetch the comments for the post
        const commentsResponse = await axios.get(`${BASE_URL}/comments`, {
          params: { postId: id }, // Filter comments by postId
        });
        console.log("Comments API Response:", commentsResponse.data);
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

  // Handle comment input change
  const OnChangeComment = (e) => {
    setComment(e.target.value);
  };

  // Handle comment submission
  const OnClickComment = async () => {
    if (!comment.trim()) return; // Prevent empty comments

    try {
      const token = localStorage.getItem("token"); // Get the token
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/comments`,
        {
          text: comment, // Use `text` instead of `content`
          postId: id, // Associate the comment with the current post
          replyId: replyingTo?.id || null, // Include the `replyId` if replying to a comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log("Comment created:", response.data);
      setComments((prevComments) => [response.data.data, ...prevComments]); // Add the new comment to the list
      setComment(""); // Clear the input
      setReplyingTo(null); // Reset the reply state
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token
      if (!token) {
        console.error("User is not authenticated.");
        return;
      }

      await axios.delete(`${BASE_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setComments((prevComments) => prevComments.filter((c) => c.id !== commentId)); // Remove the deleted comment
      console.log("Comment deleted:", commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Check if the user can delete a comment
  const canDeleteComment = (comment) => {
    // Allow deletion if the user is the comment author or an admin
    return user?.id === comment.authorId || user?.role === "admin";
  };

  // Parse tags for display
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
  console.log("Image URL:", imageUrl);

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

      {/* Comments Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        <List>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{ borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={comment.text} // Use `text` instead of `content`
                secondary={`By: ${comment.author?.username || "Unknown"} - ${new Date(comment.createdAt).toLocaleDateString()}`}
              />
              <Box>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => setReplyingTo(comment)} // Set the comment being replied to
                >
                  Reply
                </Button>
                {canDeleteComment(comment) && ( // Show delete button for the comment author or admin
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>

        {/* Add a Comment Section */}
        {user ? ( // Only show the comment input for authenticated users
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
              disabled={!comment.trim()} // Disable the button if the comment is empty
            >
              {replyingTo ? "Reply" : "Send"}
            </Button>
            {replyingTo && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setReplyingTo(null)} // Cancel the reply
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