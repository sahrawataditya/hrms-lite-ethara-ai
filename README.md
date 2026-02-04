# 🧑‍💼 HRMS Lite — Full-Stack (Frontend + Backend)

## 📌 Project Overview

**HRMS Lite** is a lightweight Human Resource Management System demonstrating an end-to-end full-stack assignment. The project includes:
- A **Frontend** UI built with Next.js + Tailwind (client/)
- A **Backend** API built with FastAPI and MongoDB (server/)

This repository is structured so you can run and develop each part independently and integrate them via environment variables.

---

## 📚 Table of Contents

- Project Overview
- Features
- Tech Stack
- Project Structure
- Frontend (client)
  - Features
  - Environment
  - Run locally
- Backend (server)
  - Features
  - Environment
  - API Endpoints
  - Run locally
- API Contract (sample)
- Validations & Error Handling
- Deployment
- Submission Checklist
- Authors

---

## ✨ Features

### 👤 Employee Management
- Create employees with unique `employee_id`, `full_name`, `email`, and `department`
- Fetch all employees
- Delete an employee
- Prevent duplicate `employee_id` and `email`

### 🕒 Attendance Management
- Mark daily attendance per employee (date & status Present/Absent)
- Fetch attendance records per employee
- Prevent duplicate attendance for the same employee on the same date

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router), React, TypeScript
- Tailwind CSS

**Backend**
- FastAPI (Python)
- Pydantic for validation
- MongoDB Atlas for persistence

**Deployment**
- Frontend: Vercel / Netlify (recommended)
- Backend: Render (recommended)

---

## 🗂 Project Structure (top-level)

```
client/   # Next.js frontend
server/   # FastAPI backend
README.md # This file
```

For details, see `client/README.md` and `server/readme.md`.

---

## Frontend (client)

### ✨ Features
- Select employee from dropdown
- Mark attendance (Employee, Date, Status)
- View attendance per employee
- Loading / empty / fallback states
- Ready for API integration

### 🔐 Environment
Create a `.env.local` in `client/` with:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

### ▶️ Run locally

1. cd client
2. Install: `npm install` or `yarn install`
3. Start dev server: `npm run dev` or `yarn dev`
4. Open: http://localhost:3000

---

## Backend (server)

### ✨ Features
- RESTful APIs for employees and attendance
- Validation via Pydantic
- MongoDB persistence

### 🔐 Environment
Create a `.env` in `server/` with:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hrms_lite
DB_NAME=hrms_lite
```

### ⚙️ API Endpoints

**Employee APIs**
- POST `/employees` — Create a new employee (201 Created)
- GET `/employees` — Fetch all employees (200 OK)
- DELETE `/employees/{employee_id}` — Delete an employee (200 OK / 404 Not Found)

**Attendance APIs**
- POST `/attendance` — Mark attendance (201 Created)
- GET `/attendance/{employee_id}` — Get attendance records for an employee (200 OK)

Swagger UI: `http://127.0.0.1:8000/docs`

### ▶️ Run locally

1. cd server
2. Create & activate a virtual environment
   - Windows (PowerShell/CMD): `python -m venv venv` then `venv\Scripts\activate`
   - macOS/Linux: `python3 -m venv venv` then `source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Start server: `uvicorn main:app --reload`
5. API base: `http://127.0.0.1:8000`

---

## 🔌 API Contract (sample)

**Mark Attendance (POST /attendance)**

Request body (application/json):

```json
{
  "employee_id": "EMP001",
  "date": "2026-02-01",
  "status": "Present"
}
```

**Fetch attendance (GET /attendance/{employee_id})** — returns list of records for the employee.

---

## 🧪 Validations & Error Handling
- Required field validation using Pydantic
- Email format validation
- Duplicate employee ID and email checks
- Duplicate attendance prevention per employee per day
- Proper HTTP status codes: 201, 200, 400, 404, 422

---

## 🌍 Deployment
- Deploy the backend to Render (or any host supporting FastAPI).
- Deploy the frontend to Vercel/Netlify and point `NEXT_PUBLIC_BASE_URL` to the deployed backend URL.

---

## ✅ Submission Checklist
- [✅] Functional backend APIs
- [✅] MongoDB data persistence
- [✅] Error handling & validations
- [✅] Deployed backend
- [✅] Connected frontend
- [✅] Clean, professional UI
- [✅] Complete README

---

## 🧑‍💻 Authors
- Aditya Sahrawat — Software Engineer
