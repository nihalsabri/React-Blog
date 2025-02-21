
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Button from '@mui/material/Button';
import Sidebar from "../../component/sidebar/sidebar";
const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

Modal.setAppElement("#root");

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });
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
      setError("Failed to fetch categories.");
    }
  };

  
  const openAddModal = () => {
    setFormData({ name: "", slug: "" });
    setIsAddModalOpen(true);
  };


  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  
  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    const url = selectedCategory
      ? `${BASE_URL}/categories/${selectedCategory.id}` 
      : `${BASE_URL}/categories`; 
    const method = selectedCategory ? "patch" : "post"; 

    try {
      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (selectedCategory) {
        
        setCategories(
          categories.map((cat) =>
            cat.id === selectedCategory.id ? response.data.data : cat
          )
        );
      } else {
      
        setCategories([...categories, response.data.data]);
      }

      closeModal(); 
    } catch (error) {
      console.error("Error saving category:", error.response || error);
      
    }
  };

  // Handle category deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/categories/${selectedCategory.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
      closeModal();
    } catch (error) {
      console.error("Error deleting category:", error.response || error);
      setError("Failed to delete category.");
    }
  };

  return (
    <div>
      <Sidebar />
      <h2>Manage Categories</h2>
      {error && <div className="error-message">{error}</div>}
      <button onClick={openAddModal}>+ Add New Category</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>
              <Button variant="contained" onClick={() => openEditModal(category)}>Edit</Button>
              <Button variant="contained" onClick={() => openDeleteModal(category)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Category Modal"
      >
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Slug:</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Category Modal"
      >
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Slug:</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Category Modal"
      >
        <h2>Are you sure you want to delete this category?</h2>
        <p>
          Deleting <strong>{selectedCategory?.name}</strong> will remove it permanently.
        </p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default Categories;