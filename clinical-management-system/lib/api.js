/*
export const API_URL = "http://localhost:8080/api";

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${API_URL}/getUser/${id}`);
  return res.json();
}

export async function deleteUser(id) {
  await fetch(`${API_URL}/deleteUser/${id}`, {
    method: "DELETE",
  });
}

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
*/

const API_URL = "http://localhost:8080";

export async function loginUser(loginData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
}

