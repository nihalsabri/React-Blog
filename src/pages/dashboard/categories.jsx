
import React, { useState, useEffect } from "react";
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
  Typography,
  Box,
  Pagination,
} from "@mui/material";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

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

      console.log("API Response:", response.data); 

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

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Categories
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={openAddModal}
          sx={{ mb: 3 }}
        >
          + Add New Category
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditModal(category)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteModal(category)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(categories.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>


        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Category Modal"
        >
          <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Add New Category
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Save
              </Button>
              <Button type="button" onClick={closeModal} variant="outlined">
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>


        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Category Modal"
        >
          <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Edit Category
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Update
              </Button>
              <Button type="button" onClick={closeModal} variant="outlined">
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>


        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeModal}
          contentLabel="Delete Category Modal"
        >
          <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Delete Category
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Are you sure you want to delete <strong>{selectedCategory?.name}</strong>? This action
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

export default Categories;