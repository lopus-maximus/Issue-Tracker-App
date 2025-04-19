const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

let issues = [];

const loadIssues = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    issues = JSON.parse(data);
  } catch (err) {
    console.error("Error reading data.json:", err);
    issues = [];
  }
};

const saveIssues = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(issues, null, 2));
};

loadIssues();

app.get("/api/issues", (req, res) => {
  res.json(issues);
});

app.post("/api/issues", (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || !description || !status || !priority) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newIssue = {
    id: issues.length ? issues[issues.length - 1].id + 1 : 1,
    title,
    description,
    status,
    priority,
    createdAt: new Date().toISOString(),
  };

  issues.push(newIssue);
  saveIssues();
  res.status(201).json(newIssue);
});

app.put("/api/issues/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = issues.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Issue not found." });

  issues[index] = { ...issues[index], ...req.body };
  saveIssues();
  res.json(issues[index]);
});

app.delete("/api/issues/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = issues.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Issue not found." });

  issues.splice(index, 1);
  saveIssues();
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
