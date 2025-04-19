import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, []);

  const filteredIssues = issues
    .filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((issue) =>
      statusFilter === "" || statusFilter === "All"
        ? true
        : issue.status === statusFilter
    )
    .filter((issue) =>
      priorityFilter === "" || priorityFilter === "All"
        ? true
        : issue.priority === priorityFilter
    )
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const truncateDescription = (description, maxLength = 20) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Open":
        return "bg-success";
      case "In Progress":
        return "bg-warning text-dark";
      case "Closed":
        return "bg-secondary";
      default:
        return "bg-light text-dark";
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-info text-dark";
      case "Low":
        return "bg-primary";
      default:
        return "bg-light text-dark";
    }
  };

  return (
    <div>
      <h2>All Issues</h2>
      <div className="d-flex flex-wrap align-items-center mb-3 gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "250px" }}
        />

        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ maxWidth: "180px" }}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>

        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "180px" }}
        >
          <option value="" disabled>
            Filter by Status
          </option>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          className="form-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ maxWidth: "180px" }}
        >
          <option value="" disabled>
            Filter by Priority
          </option>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          className="btn btn-outline-light"
          onClick={() => {
            setSearchTerm("");
            setSortBy("createdAt");
            setStatusFilter("");
            setPriorityFilter("");
          }}
        >
          Reset Filters
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle text-nowrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>
                  <Link to={`/issue/${issue.id}`}>{issue.title}</Link>
                </td>
                <td>{truncateDescription(issue.description)}</td>
                <td>
                  <span
                    className={`badge ${getStatusBadgeClass(issue.status)}`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${getPriorityBadgeClass(issue.priority)}`}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td>{new Date(issue.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
