
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import axios from "axios";
import Modal from "react-modal";
import Button from '@mui/material/Button';
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

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setFormData({ ...formData, categories: selectedCategories });
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
      coverName: post.cover
       || "",
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
  //     console.error("No post selected for update.");
  //     return;
  //   }
  
  //   const token = localStorage.getItem("token");
  //   const url = `${BASE_URL}/posts/${selectedPost.id}`;
  
  //   if (!formData.title.trim() || !formData.content.trim()) {
  //     console.error("Title and Content cannot be empty.");
  //     return;
  //   }
  
  //   let updatedData = {
  //     title: formData.title.trim(),
  //     content: formData.content.trim(),
  //     cover: formData.coverName,
  //     published: formData.published,
  //     categories: formData.categories,
  //     tags: formData.tags.split(",").map((tag) => tag.trim()),
  //   };
  
  //   console.log("Updated Data Before File Upload:", updatedData);
  
  //   if (formData.cover instanceof File) {
  //     const renamedFile = renameFile(formData.cover, formData.coverName);
  //     const imageFormData = new FormData();
  //     imageFormData.append("cover", renamedFile);
  //     try {
  //       const uploadResponse = await axios.post(
  //         `${BASE_URL}/uploads/posts`,
  //         imageFormData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  
  //       console.log("Upload Response:", uploadResponse.data);
  
  //       updatedData.cover = uploadResponse.data.fileName;
  //     } catch (uploadError) {
  //       console.error("Error uploading image:", uploadError.response?.data || uploadError);
  //       return;
  //     }
  //   }
  
  //   console.log("Final Updated Data:", updatedData);
  
  //   try {
  //     const response = await axios.patch(url, updatedData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     console.log("Post updated successfully:", response.data);
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error updating post:", error.response?.data || error);
  //   }
  // };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!selectedPost) {
  //     console.error("No post selected for update.");
  //     return;
  //   }
  
  //   const token = localStorage.getItem("token");
  //   const url = `${BASE_URL}/posts/${selectedPost.id}`;
  
  //   if (!formData.title.trim() || !formData.content.trim()) {
  //     console.error("Title and Content cannot be empty.");
  //     return;
  //   }
  
  //   let updatedData = {
  //     title: formData.title.trim(),
  //     content: formData.content.trim(),
  //     cover: formData.coverName, // Initial cover name (before upload)
  //     published: formData.published,
  //     categories: formData.categories,
  //     tags: formData.tags.split(",").map((tag) => tag.trim()),
  //   };
  
  //   console.log("Updated Data Before File Upload:", updatedData);
  
  //   if (formData.cover instanceof File) {
  //     const renamedFile = renameFile(formData.cover, formData.coverName);
  //     const imageFormData = new FormData();
  //     imageFormData.append("cover", renamedFile);
  //     try {
  //       const uploadResponse = await axios.post(
  //         `${BASE_URL}/uploads/posts`,
  //         imageFormData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  
  //       console.log("Upload Response:", uploadResponse.data);
  
  //       // Correctly access the file name from the response
  //       updatedData.cover = uploadResponse.data.data; // Update this line
  //     } catch (uploadError) {
  //       console.error("Error uploading image:", uploadError.response?.data || uploadError);
  //       return;
  //     }
  //   }
  
  //   console.log("Final Updated Data:", updatedData);
  
  //   try {
  //     const response = await axios.patch(url, updatedData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     console.log("Post updated successfully:", response.data);
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error updating post:", error.response?.data || error);
  //   }
  // };
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
          post.id === selectedPost.id ? { ...post, ...updatedData, cover: updatedData.cover ? `${BASE_URL}/uploads/posts/${updatedData.cover}` : post.cover } : post
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
    <div>
      <Sidebar />
      <h2>Manage Posts</h2>
      <Link to="/dashboard/createpost">+ Add New Post</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author.username}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openEditModal(post)}>Edit</button>
                <button onClick={() => openDeleteModal(post)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isEditModalOpen} onRequestClose={closeModal}>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          <textarea name="content" value={formData.content} onChange={handleInputChange} required />
          <input type="file" name="cover" onChange={handleFileChange} accept="image/*" />
          {formData.cover && (
            <div>
              <label>File Name:</label>
              <input type="text" value={formData.coverName} onChange={handleFileNameChange} />
            </div>
          )}
          <input type="checkbox" name="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />

          <div>
            <label>Categories:</label>
            <select multiple value={formData.categories} onChange={handleCategoryChange} required>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tags:</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="tag1, tag2" required />
          </div>

          <button type="submit">Update</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal}>
        <h2>Are you sure you want to delete this post?</h2>
        <p>
          Deleting <strong>{selectedPost?.title}</strong> will remove it permanently.
        </p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default Posts;