import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentPage.css";

const API = "http://localhost:5000/api";

function ShadingGrid({ cells, onToggle, color, readOnly }) {
  const isDrawing = useRef(false);
  const drawMode = useRef(null);

  const start = (idx) => {
    if (readOnly) return;
    isDrawing.current = true;
    drawMode.current = cells[idx] ? "unshade" : "shade";
    onToggle(idx, drawMode.current);
  };
  const move = (idx) => { if (isDrawing.current && !readOnly) onToggle(idx, drawMode.current); };
  const end = () => { isDrawing.current = false; };

  return (
    <div className="shading-grid" onMouseLeave={end} onMouseUp={end}>
      {cells.map((shaded, i) => (
        <div key={i} className="grid-cell"
          style={{ backgroundColor: shaded ? color : "white" }}
          onMouseDown={() => start(i)}
          onMouseEnter={() => move(i)}
        />
      ))}
    </div>
  );
}

function AnswerGrid({ count, color }) {
  const cells = Array(100).fill(false).map((_, i) => i < count);
  return (
    <div className="answer-grid">
      {cells.map((shaded, i) => (
        <div key={i} className="answer-cell"
          style={{ backgroundColor: shaded ? color : "white" }} />
      ))}
    </div>
  );
}

function StudentPage() {
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [cells, setCells] = useState(Array(100).fill(false));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2600); };

  const loadProblem = () => {
    setLoading(true); setResult(null); setCells(Array(100).fill(false));
    axios.get(`${API}/problem`)
      .then(r => { setProblem(r.data); setLoading(false); })
      .catch(() => { showToast("Failed to load problem"); setLoading(false); });
  };

  useEffect(loadProblem, []);

  const handleToggle = useCallback((idx, mode) => {
    if (result) return;
    setCells(prev => { const n = [...prev]; n[idx] = mode === "shade"; return n; });
  }, [result]);

  const shadedCount = cells.filter(Boolean).length;

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/check`, { shadedCount, problemId: problem.id });
      setResult(res.data);
    } catch { showToast("Could not submit."); }
  };

  return (
    <div className="page">
      <div className="topbar">
        <div className="topbar-logo">🟩 <span>Shading</span>Task</div>
        <div className="topbar-right">
          <span className="topbar-pill">Student Mode</span>
          <button className="btn-back" onClick={() => navigate("/")}>← Back</button>
        </div>
      </div>

      <div className="container">
        {loading && <div className="spinner" />}
        {!loading && problem && (
          <div className="grid-section">
            <div>
              <div className="question-display">{problem.question}</div>
              <div className="question-hint">Click or drag on the grid to shade cells.</div>
            </div>

            <ShadingGrid cells={cells} onToggle={handleToggle}
              color={problem.color || "#4ade80"} readOnly={!!result} />

            <div className="counter-bar">
              <div className="counter-num">{shadedCount}</div>
              <div className="counter-info">
                <strong>{shadedCount} cell{shadedCount !== 1 ? "s" : ""} shaded</strong>
                <span>out of 100 total</span>
              </div>
              {!result
                ? <button className="btn btn-primary" onClick={handleSubmit}>Submit ↗</button>
                : <button className="btn btn-ghost" onClick={() => { setCells(Array(100).fill(false)); setResult(null); }}>Try Again</button>
              }
            </div>

            {result && (
              <div className={`result-banner ${result.correct ? "correct" : "wrong"}`}>
                <div className="result-icon">{result.correct ? "✅" : "❌"}</div>
                <div>
                  <div className="result-title">{result.correct ? "Correct! Well done." : "Not quite right."}</div>
                  {!result.correct && (
                    <div className="result-body">
                      You shaded <strong>{shadedCount}</strong> cells, but the answer is <strong>{result.correctCount}</strong>.
                      {result.explanation && <><br />{result.explanation}</>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {result && !result.correct && (
              <div className="answer-grid-wrap">
                <div className="answer-grid-label">Correct Answer — {result.correctCount} cells</div>
                <AnswerGrid count={result.correctCount} color={problem.color || "#4ade80"} />
              </div>
            )}

            {result && (
              <button className="btn btn-primary" onClick={loadProblem}>Next Problem →</button>
            )}
          </div>
        )}
        {!loading && !problem && <p className="empty-msg" style={{marginTop:40}}>No problems available yet.</p>}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default StudentPage;