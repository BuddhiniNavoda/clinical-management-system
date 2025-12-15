"use client";

import { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../../../api/api";
import { useRouter } from "next/navigation";

export default function EditUser({ params }) {
  const router = useRouter();
  const { id } = params;

  const [form, setForm] = useState({
    userName: "",
    address: "",
    blood_G: "",
    email: "",
    dob: "",
    gender: "",
  });
  

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const data = await fetchUserById(id);
    setForm(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate() {
    await updateUser(id, form);
    router.push("/users");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Edit User</h2>

      <input name="userName" value={form.userName} onChange={handleChange} /><br />
      <input name="email" value={form.email} onChange={handleChange} /><br />
      <input name="address" value={form.address} onChange={handleChange} /><br />
      <input name="blood_G" value={form.bloodGroup} onChange={handleChange} /><br />
      <input name="dob" value={form.dob} onChange={handleChange} /><br />
      <input name="gender" value={form.gender} onChange={handleChange} /><br />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
