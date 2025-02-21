import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover: null, 
    published: true, 
    categories: [], 
    tags: "", 
  });
  const [error, setError] = useState(null);

  
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

      console.log("Image uploaded successfully:", response.data);
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

      console.log("Post created successfully:", response.data);
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
     
      const coverFilename = await uploadImage(formData.cover);

      const postData = {
        title: formData.title,
        content: formData.content,
        cover: coverFilename, 
        published: formData.published,
        categories: formData.categories, 
        tags: formData.tags.split(",").map((tag) => tag.trim()), 
      };

      await createPost(postData);

      console.log("Post created successfully!");
      navigate("/dashboard/posts"); 
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error);
      setError("Failed to create post. Please check the input fields.");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            name="cover"
            onChange={handleFileChange}
            accept="image/*" 
            required
          />
        </div>
        <div>
          <label>Published:</label>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
          />
        </div>
        <div>
          <label>Categories:</label>
          <select
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
            required
          >
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="tag1, tag2, tag3"
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;