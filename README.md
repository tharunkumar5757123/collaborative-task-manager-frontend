🧑‍💻 Collaborative Task Manager

Full-Stack Engineering Assessment

A production-ready collaborative task management application with real-time updates, secure authentication, and a clean scalable architecture.

🚀 Live Demo

Frontend:
👉 https://collaborative-task-manager-frontend.onrender.com

Backend API:
👉 https://collaborative-task-manager-backend-hmdk.onrender.com

📦 Tech Stack
Frontend

React + Vite

TypeScript

Tailwind CSS

React Query (Server state management)

React Hook Form + Zod (Forms & validation)

Socket.io Client

Backend

Node.js + Express

TypeScript

MongoDB (chosen for flexible schema & fast iteration)

Mongoose ODM

JWT Authentication (HttpOnly Cookies)

Socket.io

Deployment

Frontend: Render

Backend: Render

Database: MongoDB Atlas

🧠 Architecture Overview

The backend follows a clean layered architecture:

Controllers → Services → Models (Mongoose)


Controllers: Handle HTTP requests/responses

Services: Business logic (task creation, updates, validation)

Models: MongoDB schemas

DTO Validation: Zod schemas validate incoming requests

Sockets: Real-time events emitted from services/controllers

Frontend uses React Query for:

Caching

Auto refetching

Optimistic updates

🔐 Authentication & Authorization

JWT-based authentication

Tokens stored in HttpOnly cookies

Protected routes via middleware

Task ownership enforced (only creators can update/delete)

✅ Features Implemented
🧑 User Management

User registration & login

Secure password hashing

Profile access

📋 Task Management (CRUD)

Each task includes:

title (max 100 chars)

description

dueDate

priority (Low, Medium, High, Urgent)

status (To Do, In Progress, Review, Completed)

creatorId

assignedToId

⚡ Real-Time Collaboration (Socket.io)

Live task updates across users

Instant notification when task is assigned

User-specific socket rooms

📊 Dashboard

Tasks assigned to user

Tasks created by user

Overdue tasks

Filter by status & priority

Sort by due date

🎨 UX & UI

Fully responsive (mobile + desktop)

Tailwind CSS

Loading & error states

Clean form validation messages
