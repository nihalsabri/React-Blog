import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import axios from "axios";
const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/categories`).then(response => setCategories(response.data.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${BASE_URL}/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  return (
    <div>
         <Sidebar />
      <h2>Manage Categories</h2>
   
      <Link to="/dashboard/categories/new">+ Add New Category</Link>
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
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>
                <Link to={`/dashboard/categories/edit/${category.id}`}>Edit</Link>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
