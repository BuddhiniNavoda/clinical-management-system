"use client";

import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, fetchUserById } from "./api/api";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await fetchUsers();
    setUsers(data);
  }

  async function handleSearch() {
    const user = await fetchUserById(searchId);
    setSearchResult(user);
  }

  async function handleDelete(id) {
    await deleteUser(id);
    loadUsers();
  }

  return (
    <div style={{ padding: 30 }}>
      {/* Search Section */}
      <div style={{ marginTop: 20 }}>
        <input
          type="number"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {searchResult && (
          <div>
            <h3>Search Result:</h3>
            <p>Name: {searchResult.userName}</p>
            <p>Email: {searchResult.email}</p>
            <p>Gender: {searchResult.gender}</p>
            <p>Blood Group: {searchResult.blood_G}</p>
            <p>Address: {searchResult.address}</p>
            <p>DOB: {searchResult.dob}</p>
          </div>
        )}
      </div>

          <Link href="/users/create">
      <button style={{ marginTop: 20, backgroundColor: "#4CAF50", color: "white" }}>
        Add New User
      </button>
    </Link>

      {/* Users Table */}
      <table border="1" width="100%" style={{ marginTop: 30 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Blood_G</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.userName}</td>
              <td>{u.email}</td>
              <td>{u.blood_G}</td>
              <td>{u.gender}</td>
              <td>
                <Link href={`/users/edit/${u.userId}`}>
                <button style={{ backgroundColor: "#2196F3", color: "white" }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(u.userId)} style={{ marginLeft: 10 }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
