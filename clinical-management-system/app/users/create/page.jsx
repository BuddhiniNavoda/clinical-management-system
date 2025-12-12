"use client";

import { useState } from "react";
import { createUser } from "../../api/api";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "",
    address: "",
    blood_G: "",
    email: "",
    dob: "",
    gender: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    await createUser(form);
    router.push("/");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Create User</h2>
      <input name="userName" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="address" placeholder="Address" onChange={handleChange} /><br />
      <input name="blood_G" placeholder="Blood Group" onChange={handleChange} /><br />
      <input name="dob" placeholder="Date of Birth" onChange={handleChange} /><br />
      <input name="gender" placeholder="Gender" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
