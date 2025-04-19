import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import CreateIssue from "./CreateIssue";
import IssueDetail from "./IssueDetail";

export default function App() {
  return (
    <div className="container bg-dark text-light p-4 rounded border border-white">
      <h1>Issue Tracker</h1>
      <nav className="mb-4">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded border ${
                  isActive ? "bg-light text-dark" : "text-white border-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded border ms-3 ${
                  isActive ? "bg-light text-dark" : "text-white border-white"
                }`
              }
            >
              Create Issue
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateIssue />} />
        <Route path="/issue/:id" element={<IssueDetail />} />
      </Routes>
    </div>
  );
}
