import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
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
        console.log("Error fetching users", err);
        toast.error("Failed to fetch users");
      }
    }
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
          {users.map((u) => (
            <tr key={u.id}>
              <td data-label="ID">{u.id}</td>
              <td data-label="Name">{u.name}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Role">{u.role}</td>
              <td data-label="Created At">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
