

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../component/sidebar/sidebar";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4004/api/v1";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found! User is not authenticated.");
      navigate("/login");
      return;
    }

    axios
      .get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (error.response?.status === 403) {
          toast.error("You do not have permission to access this resource.");
        } else if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error("Failed to fetch users. Please try again later.");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

 
  const handleRoleUpdate = async () => {
    if (selectedUser) {
      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `${BASE_URL}/users/${selectedUser.id}`,
          { role: newRole },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, role: newRole } : user
          )
        );

        toast.success("Role updated successfully!");
        setSelectedUser(null);
      } catch (error) {
        console.error("Error updating role:", error);
        toast.error("Failed to update role. Please try again.");
      }
    }
  };

  return (
    <div>
     <Sidebar />
      <h2>Manage Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => setSelectedUser(user)}>Update Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUser && (
        <div>
          <h3>Update Role for {selectedUser.username}</h3>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="user">User</option>
          </select>
          <button onClick={handleRoleUpdate}>Save Role</button>
        </div>
      )}
    </div>
  );
};

export default Users;