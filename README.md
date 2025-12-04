# Serverless To-Do App 🚀

A fully serverless To-Do application built using **React (Frontend)**, **Azure Functions (Backend API)**, and **Azure Table Storage (Database)**.  
Supports **full CRUD operations** including **Add**, **Edit (PATCH rename)**, **Status Toggle (PATCH)**, **Full Update (PUT)**, and **Delete**.  
Designed with a **Serverless 3-Tier Architecture** for scalability, low cost, and clean separation between UI, API, and Database.

---

## ✨ Features
- Add new tasks
- Rename tasks (PATCH)
- Toggle task status Pending/Done
- Full update using PUT
- Delete tasks
- Real-time sync with Azure Table DB
- Fully decoupled frontend & backend

---

## 🧠 Architecture
```text
React Frontend (Presentation Layer)
      ↓ API Calls (Fetch)
Azure Functions (Application Layer)
      ↓ CRUD Operations
Azure Table Storage (Data Layer)


| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Frontend     | React + Vite                   |
| Backend      | Azure Functions (Node.js)      |
| Database     | Azure Table Storage            |
| Deployment   | GitHub Actions + Azure         |
| Architecture | Serverless 3-Tier Architecture |
