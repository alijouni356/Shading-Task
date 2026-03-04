import React, { useState } from "react";
import axios from "axios";

function AdminForm() {
  const [question, setQuestion] = useState("");
  const [count, setCount] = useState("");
  const [explanation, setExplanation] = useState("");
  const [color, setColor] = useState("blue");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/problem", {
      question,
      correct_count: count,
      explanation,
      color
    });

    alert("Problem created!");
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Create Problem</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          type="number"
          placeholder="Correct shaded cells"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <input
          placeholder="Explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AdminForm;