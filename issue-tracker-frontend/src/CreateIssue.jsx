import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create issue");
        return res.json();
      })
      .then(() => navigate("/"))
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <h2>Create New Issue</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
