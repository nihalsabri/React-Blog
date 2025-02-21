
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import axios from "axios";
import Modal from "react-modal";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

Modal.setAppElement("#root");

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover: null,
    coverName: "",
    published: true,
    categories: [],
    tags: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts`)
      .then((response) => {
        setPosts(response.data?.data?.posts || []);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => {
        setCategories(response.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        cover: file,
        coverName: file.name,
      });
    }
  };

  const handleFileNameChange = (e) => {
    setFormData({ ...formData, coverName: e.target.value });
  };

  // const handleCategoryChange = (e) => {
  //   const selectedCategories = Array.from(e.target.selectedOptions, (option) =>
  //     Number(option.value)
  //   );
  //   setFormData({ ...formData, categories: selectedCategories });
  // };
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, categories: e.target.value });
  };
  

  const renameFile = (file, newName) => {
    return new File([file], newName, { type: file.type });
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      cover: post.cover ? `${BASE_URL}/uploads/posts/${post.cover}` : null,
      coverName: post.cover || "",
      published: post.published,
      categories: post.categories.map((cat) => cat.category.id),
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedPost(null);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
   
  //   if (!selectedPost) {
  //           console.error("No post selected for update.");
  //           return;
  //         }
        
  //         const token = localStorage.getItem("token");
  //         const url = `${BASE_URL}/posts/${selectedPost.id}`;
        
  //         if (!formData.title.trim() || !formData.content.trim()) {
  //           console.error("Title and Content cannot be empty.");
  //           return;
  //         }
        
  //         let updatedData = {
  //           title: formData.title.trim(),
  //           content: formData.content.trim(),
  //           cover: formData.coverName, 
  //           published: formData.published,
  //           categories: formData.categories,
  //           tags: formData.tags.split(",").map((tag) => tag.trim()),
  //         };
        
  //         console.log("Updated Data Before File Upload:", updatedData);
        
  //         if (formData.cover instanceof File) {
  //           const renamedFile = renameFile(formData.cover, formData.coverName);
  //           const imageFormData = new FormData();
  //           imageFormData.append("cover", renamedFile);
  //           try {
  //             const uploadResponse = await axios.post(
  //               `${BASE_URL}/uploads/posts`,
  //               imageFormData,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${token}`,
  //                   "Content-Type": "multipart/form-data",
  //                 },
  //               }
  //             );
        
  //             console.log("Upload Response:", uploadResponse.data);
        
              
  //             updatedData.cover = uploadResponse.data.data; 
  //           } catch (uploadError) {
  //             console.error("Error uploading image:", uploadError.response?.data || uploadError);
  //             return;
  //           }
  //         }
        
  //         console.log("Final Updated Data:", updatedData);
        
  //         try {
  //           const response = await axios.patch(url, updatedData, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               "Content-Type": "application/json",
  //             },
  //           });
        
  //           console.log("Post updated successfully:", response.data);
      
  //           setPosts((prevPosts) =>
  //             prevPosts.map((post) =>
  //               post.id === selectedPost.id ? { ...post, ...updatedData, cover: updatedData.cover ? `${BASE_URL}/uploads/posts/${updatedData.cover}` : post.cover } : post
  //             )
  //           );
      
      
      
  //           closeModal();
  //         } catch (error) {
  //           console.error("Error updating post:", error.response?.data || error);
  //           if (error.response) {
  //             console.error("Server response data:", error.response.data);
  //             console.error("Server response status:", error.response.status);
  //             console.error("Server response headers:", error.response.headers);
  //           }
  //         }
  //       };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedPost) {
      console.error("No post selected for update.");
      return;
    }
  
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/posts/${selectedPost.id}`;
  
    if (!formData.title.trim() || !formData.content.trim()) {
      console.error("Title and Content cannot be empty.");
      return;
    }
  
    let updatedData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      cover: formData.coverName, 
      published: formData.published,
      categories: formData.categories,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
  
    console.log("Updated Data Before File Upload:", updatedData);
  
    if (formData.cover instanceof File) {
      const renamedFile = renameFile(formData.cover, formData.coverName);
      const imageFormData = new FormData();
      imageFormData.append("cover", renamedFile);
  
      try {
        const uploadResponse = await axios.post(
          `${BASE_URL}/uploads/posts`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Upload Response:", uploadResponse.data);
  
        updatedData.cover = uploadResponse.data.data; 
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError.response?.data || uploadError);
        return;
      }
    }
  
    console.log("Final Updated Data:", updatedData);
  
    try {
      const response = await axios.patch(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Post updated successfully:", response.data);
  

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, ...updatedData, cover: updatedData.cover ? `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/uploads/posts/${updatedData.cover}` : post.cover }
            : post
        )
      );
  
      closeModal();
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
        console.error("Server response headers:", error.response.headers);
      }
    }
  };
  const handleDelete = async () => {
   
    if (!selectedPost) {
      console.error("No post selected for deletion.");
      return;
    }

    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/posts/${selectedPost.id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Post deleted successfully:", response.data);
      setPosts(posts.filter((post) => post.id !== selectedPost.id));
      closeModal();
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error);
    }




  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Posts
        </Typography>
        <Button
          component={Link}
          to="/dashboard/createpost"
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          + Add New Post
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author.username}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditModal(post)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteModal(post)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal isOpen={isEditModalOpen} onRequestClose={closeModal}>
          <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Edit Post
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
                sx={{ mb: 2 }}
              />
              <input
                type="file"
                name="cover"
                onChange={handleFileChange}
                accept="image/*"
                style={{ marginBottom: "16px" }}
              />
              {formData.cover && (
                <TextField
                  fullWidth
                  label="File Name"
                  value={formData.coverName}
                  onChange={handleFileNameChange}
                  sx={{ mb: 2 }}
                />
              )}
              {/* <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select> */}

<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Categories</InputLabel>
  <Select
    multiple
    value={formData.categories}
    onChange={handleCategoryChange}
    required

    MenuProps={{
      disableAutoFocusItem: true,
    }}
    renderValue={(selected) => selected.map((id) => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : id;
    }).join(", ")}
  >
    {categories.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ))}
  </Select>



{/* <div>
            <label>Categories:</label>
            <select multiple value={formData.categories} onChange={handleCategoryChange} required>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        */}



              </FormControl>
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="tag1, tag2"
                required
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Checkbox
                  name="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                />
                <Typography>Published</Typography>
              </Box>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Update
              </Button>
              <Button type="button" onClick={closeModal} variant="outlined">
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal}>
          <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Delete Post
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Are you sure you want to delete <strong>{selectedPost?.title}</strong>? This action
              cannot be undone.
            </Typography>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
            >
              Yes, Delete
            </Button>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Posts;