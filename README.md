# 🟩 ShadingTask

An interactive math tool where teachers create shading problems and students solve them on a 10×10 grid.

---

## ⚙️ Tech Stack

- **Frontend** — React, React Router v6, Axios
- **Backend** — Node.js, Express
- **Database** — SQLite (no server needed, file is created automatically)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/shading.git
cd shading
```

---

### 2. Start the Backend

```bash
cd backend
npm install
npm install sqlite3
npm run dev
```

You should see:
```
SQLite connected — shading.db ready
Server running on http://localhost:5000
```

> The database file `shading.db` is created automatically inside the `backend/` folder. No configuration needed.

---

### 3. Start the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm install react-router-dom axios
npm start
```

App opens at **http://localhost:3000**

---

## 📂 Project Structure

```
shading/
├── backend/
│   ├── db.js        → SQLite connection + auto-creates table
│   ├── server.js    → API routes
│   ├── shading.db   → Auto-created on first run
│   └── package.json
└── frontend/
    └── src/
        ├── App.js              → Router
        └── pages/
            ├── Landing.jsx     → Choose Teacher or Student
            ├── AdminPage.jsx   → Teacher: create & delete problems
            └── StudentPage.jsx → Student: shade & submit answers
```

---

## 🌱 Load Sample Data (50 problems)

The easiest way is to use the **Teacher panel** in the app — just log in as Teacher and add problems through the form.

Alternatively, open a terminal in the `backend/` folder and run:

```bash
npx sqlite3 shading.db
```

Then paste in your SQL insert statements and type `.quit` when done.

---

## 🔌 API Endpoints

| Method | URL | What it does |
|--------|-----|-------------|
| GET | `/api/problem` | Get a random problem |
| GET | `/api/problems` | Get all problems |
| POST | `/api/problem` | Create a problem |
| DELETE | `/api/problem/:id` | Delete a problem |
| POST | `/api/check` | Check student's answer |

---

## 👤 How to Use

**As a Teacher:**
1. Click **Teacher** on the home page
2. Fill in the question, number of cells to shade, a color, and an explanation
3. Click **Create Problem**
4. All problems are listed below — delete any at any time

**As a Student:**
1. Click **Student** on the home page
2. Read the question and shade cells by clicking or dragging on the grid
3. Click **Submit**
4. ✅ Correct → green confirmation
5. ❌ Wrong → shows the correct count, explanation, and the filled answer grid
6. Click **Next Problem** to try another

