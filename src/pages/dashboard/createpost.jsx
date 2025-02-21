
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Alert,
} from "@mui/material";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const CreatePost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover: null,
    published: true,
    categories: [],
    tags: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  const uploadImage = async (file) => {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/uploads/posts`;

    const formData = new FormData();
    formData.append("cover", file);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.filename;
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error);
      throw error;
    }
  };

  const createPost = async (postData) => {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/posts`;
    try {
      const response = await axios.post(url, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cover: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => Number(option.value)
    );
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const coverName = await uploadImage(formData.cover);

      const postData = {
        title: formData.title,
        content: formData.content,
        cover: coverName,
        published: formData.published,
        categories: formData.categories,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };

      await createPost(postData);
      navigate("/dashboard/posts");
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      setError("Failed to create post. Please check the input fields.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Paper sx={{ p: 3 }}>
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
          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              name="cover"
              onChange={handleFileChange}
              accept="image/*"
              required
              style={{ display: "none" }}
              id="cover-upload"
            />
            <label htmlFor="cover-upload">
              <Button variant="contained" component="span">
                Upload Cover Image
              </Button>
            </label>
            {formData.cover && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {formData.cover.name}
              </Typography>
            )}
          </Box>
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={formData.categories}
              onChange={handleCategoryChange}
              required
              label="Categories"
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Select>
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
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreatePost;