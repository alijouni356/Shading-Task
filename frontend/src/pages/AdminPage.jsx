import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPage.css";

const API = "http://localhost:5000/api";

function AdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ question: "", correct_count: "", explanation: "", color: "#4ade80" });
  const [problems, setProblems] = useState([]);
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2600); };

  const loadProblems = () => {
    axios.get(`${API}/problems`)
      .then(r => setProblems(r.data))
      .catch(() => showToast("Could not load problems"));
  };

  useEffect(loadProblems, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    if (!form.question.trim() || !form.correct_count) return showToast("Question and cell count are required");
    if (+form.correct_count < 1 || +form.correct_count > 100) return showToast("Cell count must be 1–100");
    try {
      await axios.post(`${API}/problem`, { ...form, correct_count: +form.correct_count });
      showToast("Problem created ✓");
      setForm({ question: "", correct_count: "", explanation: "", color: "#4ade80" });
      loadProblems();
    } catch { showToast("Failed to create problem"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this problem?")) return;
    try {
      await axios.delete(`${API}/problem/${id}`);
      showToast("Deleted");
      loadProblems();
    } catch { showToast("Delete failed"); }
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="topbar-logo">🟩 <span>Shading</span>Task</div>
        <div className="topbar-right">
          <span className="topbar-pill">Admin Panel</span>
          <button className="btn-back" onClick={() => navigate("/")}>← Back</button>
        </div>
      </div>

      <div className="container">
        <div className="section-title">Create a Problem</div>
        <div className="section-sub">Fill in the details to add a new shading problem for students.</div>

        <div className="card">
          <div className="form-grid">
            <div className="form-group full">
              <label>Question / Prompt</label>
              <input type="text" name="question" value={form.question} onChange={handleChange}
                placeholder='e.g. Show 7/100 by shading the model.' />
            </div>
            <div className="form-group">
              <label>Cells to Shade (1–100)</label>
              <input type="number" name="correct_count" value={form.correct_count}
                onChange={handleChange} placeholder="7" min="1" max="100" />
            </div>
            <div className="form-group">
              <label>Shade Color</label>
              <div className="color-row">
                <input type="color" name="color" value={form.color} onChange={handleChange} />
                <span className="color-hex">{form.color}</span>
              </div>
            </div>
            <div className="form-group full">
              <label>Explanation (shown when answer is wrong)</label>
              <textarea name="explanation" value={form.explanation} onChange={handleChange}
                rows={3} placeholder="e.g. You need to shade exactly 7 cells out of 100." />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-primary" onClick={handleCreate}>＋ Create Problem</button>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <div className="section-title" style={{ fontSize: 22 }}>All Problems</div>
          <div className="section-sub">{problems.length} problem{problems.length !== 1 ? "s" : ""} in the database</div>
          <div className="problems-list">
            {problems.length === 0 && <p className="empty-msg">No problems yet. Create one above.</p>}
            {problems.map(p => (
              <div key={p.id} className="problem-row">
                <div className="problem-swatch" style={{ background: p.color }} />
                <div className="problem-q">{p.question}</div>
                <div>
                  <div className="problem-count">{p.correct_count}</div>
                  <div className="problem-count-label">cells</div>
                </div>
                <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default AdminPage;