import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/issues`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((issue) => issue.id === parseInt(id));
        if (found) {
          setIssue(found);
          setForm(found);
        } else {
          alert("Issue not found");
          navigate("/");
        }
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/issues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => navigate("/"));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      fetch(`http://localhost:5000/api/issues/${id}`, {
        method: "DELETE",
      }).then(() => navigate("/"));
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Issue</h2>
      <form className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
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
        <button
          type="button"
          className="btn btn-light text-dark me-2"
          onClick={handleUpdate}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  );
}
