const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// GET a random problem
app.get("/api/problem", (req, res) => {
  db.query("SELECT * FROM problems ORDER BY RAND() LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.length) return res.status(404).json({ error: "No problems found" });
    res.json(result[0]);
  });
});

// GET all problems (admin)
app.get("/api/problems", (req, res) => {
  db.query("SELECT * FROM problems ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// CREATE a problem (admin)
app.post("/api/problem", (req, res) => {
  const { question, correct_count, explanation, color } = req.body;
  if (!question || !correct_count) {
    return res.status(400).json({ error: "question and correct_count are required" });
  }
  db.query(
    "INSERT INTO problems (question, correct_count, explanation, color) VALUES (?, ?, ?, ?)",
    [question, correct_count, explanation || "", color || "#4ade80"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Problem created", id: result.insertId });
    }
  );
});

// DELETE a problem (admin)
app.delete("/api/problem/:id", (req, res) => {
  db.query("DELETE FROM problems WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Problem deleted" });
  });
});

// CHECK student answer
app.post("/api/check", (req, res) => {
  const { shadedCount, problemId } = req.body;
  db.query("SELECT * FROM problems WHERE id = ?", [problemId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.length) return res.status(404).json({ error: "Problem not found" });

    const problem = result[0];
    const correct = shadedCount === problem.correct_count;

    res.json({
      correct,
      correctCount: problem.correct_count,
      explanation: problem.explanation,
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));