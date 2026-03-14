const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// GET a random problem
app.get("/api/problem", (req, res) => {
  try {
    const problem = db.prepare("SELECT * FROM problems ORDER BY RANDOM() LIMIT 1").get();
    if (!problem) return res.status(404).json({ error: "No problems found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all problems (admin)
app.get("/api/problems", (req, res) => {
  try {
    const problems = db.prepare("SELECT * FROM problems ORDER BY id DESC").all();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a problem (admin)
app.post("/api/problem", (req, res) => {
  const { question, correct_count, explanation, color } = req.body;
  if (!question || !correct_count) {
    return res.status(400).json({ error: "question and correct_count are required" });
  }
  try {
    const stmt = db.prepare(
      "INSERT INTO problems (question, correct_count, explanation, color) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(question, correct_count, explanation || "", color || "#4ade80");
    res.json({ message: "Problem created", id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a problem (admin)
app.delete("/api/problem/:id", (req, res) => {
  try {
    db.prepare("DELETE FROM problems WHERE id = ?").run(req.params.id);
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHECK student answer
app.post("/api/check", (req, res) => {
  const { shadedCount, problemId } = req.body;
  try {
    const problem = db.prepare("SELECT * FROM problems WHERE id = ?").get(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const correct = shadedCount === problem.correct_count;
    res.json({
      correct,
      correctCount: problem.correct_count,
      explanation: problem.explanation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));