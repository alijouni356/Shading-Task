# 🟩 ShadingTask

An interactive mathematics tool for teachers and students to create and solve fraction, decimal, and percentage shading problems using a 10×10 grid model.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Sample Data](#sample-data)
- [API Reference](#api-reference)
- [How to Use](#how-to-use)

---

## Overview

**Teacher** → Creates problems with a question, correct cell count, color, and explanation.  
**Student** → Loads a random problem, shades the grid by clicking or dragging, submits to get instant feedback.  
If the answer is wrong, the correct answer grid is shown along with a full explanation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Create React App), React Router v6, Axios |
| Backend | Node.js, Express |
| Database | MySQL |

---

## Project Structure

```
shading/
├── backend/
│   ├── db.js           # MySQL connection (auto-creates table)
│   ├── server.js       # Express API routes
│   └── package.json
└── frontend/
    ├── public/
    └── src/
        ├── App.js              # Router setup
        ├── index.css           # Global styles
        └── pages/
            ├── Landing.jsx     # Role selection page
            ├── Landing.css
            ├── AdminPage.jsx   # Teacher: create & manage problems
            ├── AdminPage.css
            ├── StudentPage.jsx # Student: solve problems
            └── StudentPage.css
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- [MySQL](https://dev.mysql.com/downloads/) v8 or higher
- npm (comes with Node.js)

---

## Database Setup

### 1. Log in to MySQL

```bash
mysql -u root -p
```

### 2. Create the database

```sql
CREATE DATABASE shading_app;
```

### 3. Select the database

```sql
USE shading_app;
```

### 4. Create the problems table

The table is **created automatically** when you first start the backend. But if you prefer to create it manually:

```sql
CREATE TABLE IF NOT EXISTS problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  correct_count INT NOT NULL,
  explanation TEXT,
  color VARCHAR(20) DEFAULT '#4ade80',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your database credentials

Open `db.js` and update the connection details if needed:

```js
const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // your MySQL username
  password: "",         // your MySQL password
  database: "shading_app",
});
```

Or use environment variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=shading_app
```

### 4. Start the backend server

```bash
# Development (auto-restarts on changes)
npm run dev

# Production
npm start
```

You should see:
```
Connected to MySQL
Server running on http://localhost:5000
```

---

## Frontend Setup

### 1. Open a new terminal and navigate to the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install React Router and Axios

```bash
npm install react-router-dom axios
```

### 4. Start the frontend

```bash
npm start
```

The app opens automatically at **http://localhost:3000**

> ⚠️ Make sure the backend is running at `http://localhost:5000` before using the app.

---

## Sample Data

To load 50 ready-made problems, connect to MySQL first:

```bash
mysql -u root -p shading_app
```

Then paste and run:

```sql
INSERT INTO problems (question, correct_count, explanation, color) VALUES
('Show 1/100 by shading the model.', 1, 'Shade exactly 1 cell out of 100. This represents 1/100 or 1%.', '#4ade80'),
('Show 5/100 by shading the model.', 5, 'Shade 5 cells out of 100. This represents 5/100 or 5%.', '#4ade80'),
('Show 40/100 by shading the model.', 40, 'Shade 40 cells out of 100. This represents 40/100, 2/5, or 40%.', '#4ade80'),
('Show 45/100 by shading the model.', 45, 'Shade 45 cells out of 100. This represents 45/100, 9/20, or 45%.', '#4ade80'),
('Show 99/100 by shading the model.', 99, 'Shade 99 cells out of 100. This represents 99/100 or 99%.', '#4ade80'),
('Show 1/4 by shading the model.', 25, 'Shade 25 cells out of 100. 1/4 = 25/100 = 25%.', '#60a5fa'),
('Show 1/2 by shading the model.', 50, 'Shade 50 cells out of 100. 1/2 = 50/100 = 50%.', '#60a5fa'),
('Show 9/10 by shading the model.', 90, 'Shade 90 cells out of 100. 9/10 = 90/100 = 90%.', '#60a5fa'),
('Show 0.01 by shading the model.', 1, 'Shade 1 cell out of 100. 0.01 = 1/100 = 1%.', '#f97316'),
('Show 0.9 by shading the model.', 90, 'Shade 90 cells out of 100. 0.9 = 90/100 = 90%.', '#f97316'),
('Show 1% by shading the model.', 1, 'Shade 1 cell out of 100. 1% means 1 per hundred.', '#a855f7'),
('Show 10% by shading the model.', 10, 'Shade 10 cells out of 100. 10% means 10 per hundred.', '#a855f7'),
('Show 100% by shading the model.', 100, 'Shade all 100 cells. 100% means the whole grid is shaded.', '#a855f7');
```

**Color guide:**

| Color | Category |
|-------|----------|
| 🟢 `#4ade80` Green | Fractions with denominator 100 |
| 🔵 `#60a5fa` Blue | Common fractions (1/4, 1/2, 1/5…) |
| 🟠 `#f97316` Orange | Decimals |
| 🟣 `#a855f7` Purple | Percentages |

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/problem` | Get one random problem |
| GET | `/api/problems` | Get all problems (admin) |
| POST | `/api/problem` | Create a new problem |
| DELETE | `/api/problem/:id` | Delete a problem by ID |
| POST | `/api/check` | Check a student's answer |

### POST `/api/problem` — Request body

```json
{
  "question": "Show 7/100 by shading the model.",
  "correct_count": 7,
  "explanation": "Each cell represents 1/100 or 1%.",
  "color": "#4ade80"
}
```

### POST `/api/check` — Request body

```json
{
  "shadedCount": 7,
  "problemId": 1
}
```

### POST `/api/check` — Response (correct)

```json
{ "correct": true }
```

### POST `/api/check` — Response (wrong)

```json
{
  "correct": false,
  "correctCount": 7,
  "explanation": "Each cell represents 1/100 or 1%."
}
```

---

## How to Use

### As a Teacher

1. Go to `http://localhost:3000` and click **Teacher**
2. Fill in the form: question, number of cells to shade, a color, and an explanation
3. Click **Create Problem**
4. All problems are listed below — delete any at any time

### As a Student

1. Go to `http://localhost:3000` and click **Student**
2. Read the question and shade cells by clicking or dragging on the grid
3. Click **Submit**
4. ✅ Correct → green confirmation shown
5. ❌ Wrong → red banner shows the correct count + explanation + the answer grid filled in
6. Click **Next Problem** to try another

---

## Quick Start Summary

```bash
# 1. Clone the repo
git clone https://github.com/your-username/shading.git
cd shading

# 2. Create the database
mysql -u root -p -e "CREATE DATABASE shading_app;"

# 3. Start the backend
cd backend
npm install
npm run dev

# 4. Start the frontend (new terminal)
cd frontend
npm install
npm install react-router-dom axios
npm start
```

Open **http://localhost:3000** 🎉