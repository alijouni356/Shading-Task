import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing-badge">Mathematics · Interactive Tool</div>
      <h1 className="landing-title">
        Shading <em>Tasks</em><br />Made Simple
      </h1>
      <p className="landing-sub">
        An interactive grid tool for creating and solving fraction shading problems.
        Choose your role to begin.
      </p>
      <div className="landing-cards">
        <div className="role-card" onClick={() => navigate("/admin")}>
          <span className="role-icon">🎓</span>
          <div className="role-label">Teacher</div>
          <div className="role-desc">Create and manage shading problems with custom questions and answers.</div>
        </div>
        <div className="role-card" onClick={() => navigate("/student")}>
          <span className="role-icon">📐</span>
          <div className="role-label">Student</div>
          <div className="role-desc">Solve problems by shading the grid, then submit to check your answer.</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;