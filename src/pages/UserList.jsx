import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
        toast.success("Users loaded successfully");
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h2 className="users-title">All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.role ? "Admin" : "User"}</td>
                <td data-label="Created At">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
