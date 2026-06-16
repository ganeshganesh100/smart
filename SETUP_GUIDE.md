# SmartBasai Setup & Deployment Guide

Welcome to **SmartBasai** — a broker-free rental housing management system designed specifically for Nepal. This guide provides step-by-step instructions to set up, run, verify, and deploy both the backend and frontend components of the application.

---

## Table of Contents
1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Prerequisites](#2-prerequisites)
3. [Local Development Setup](#3-local-development-setup)
   - [Database Setup](#database-setup)
   - [Backend Configuration & Run](#backend-configuration--run)
   - [Frontend Configuration & Run](#frontend-configuration--run)
4. [Seed Data & Admin Credentials](#4-seed-data--admin-credentials)
5. [Feature Workflows](#5-feature-workflows)
   - [User Registration & Document Upload](#user-registration--document-upload)
   - [Admin Booking & Payment Moderation Dashboard](#admin-booking--payment-moderation-dashboard)
6. [Cloud Deployment Instructions](#6-cloud-deployment-instructions)
   - [Backend (Render / Heroku / DigitalOcean)](#backend-render--heroku--digitalocean)
   - [Database (MongoDB Atlas)](#database-mongodb-atlas)
   - [Frontend (Vercel / Netlify)](#frontend-vercel--netlify)

---

## 1. Tech Stack Overview
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Multer (Image & Document uploads), Bcryptjs, JWT Authentication.
- **Frontend:** React (Vite), Axios, Lucide React icons, and custom Glassmorphic CSS.

---

## 2. Prerequisites
Make sure you have the following installed on your local development machine:
- **Node.js** (v16.x or newer)
- **npm** (v7.x or newer)
- **MongoDB Community Server** (running locally on port `27017`) or a **MongoDB Atlas Connection URI**.
- A terminal opened at the project root: `smart-basai/`.

---

## 3. Local Development Setup

### Database Setup
Ensure your local MongoDB instance is running. On Linux/macOS, check status with:
```bash
sudo systemctl status mongod
```
If it is not running:
```bash
sudo systemctl start mongod
```

### Backend Configuration & Run
1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` root directory and populate it with the following configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/smartbasai
   JWT_SECRET=your_super_secret_key_for_smart_basai_2026
   ```
4. Run the seed script to register the initial admin account:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should print messages similar to:* `Successfully connected to MongoDB` and `Server actively listening on port 5000`.

### Frontend Configuration & Run
1. Open a new terminal window/tab and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open your web browser and navigate to the URL printed in the console (usually `http://localhost:5173` or `http://localhost:3000`).

---

## 4. Seed Data & Admin Credentials
Run this from `backend/` before the first admin login:

```bash
npm run seed
```

To test the administrator dashboard immediately, log in with the default admin account:
- **Email:** `admin@smartbasai.com`
- **Password:** `admin123`

After login, the navbar shows **Admin Panel** and the dashboard sidebar shows **Admin Analytics**. Click either one to open the admin dashboard.

---

## 5. Feature Workflows

### User Registration & Document Upload
- On the homepage, click **Sign Up**.
- Select whether you want to register as a **Tenant** or a **Landlord**.
- Upload a **Profile Picture** (optional for all accounts).
- If registering as a **Landlord**, you **MUST** upload a **Land Verification / Citizenship Document** image.
- Click **Create Account** to submit the multipart registration request to the server.

### Admin Booking & Payment Moderation Dashboard
- Log in using the **Admin Credentials**.
- Click **Admin Panel** in the navbar or **Admin Analytics** in the sidebar.
- You can monitor the system, verify/ban users, and view uploaded land documents.
- Under **Bookings & Payments System Monitoring**, you will see all system bookings.
- Click **Manage** on any booking to open the control modal and update:
  - Rent Price (NPR)
  - Negotiation Offer / Discount notes
  - Property Street Location
  - Booking Status (*Pending, Approved, Rejected, Completed*)
  - Payment Status (*Pending, Paid, Failed*)
  - Payment Method (*None, Khalti, eSewa, Stripe, Cash*)

---

## 6. Cloud Deployment Instructions

Before deployment, replace the frontend's hardcoded local API URLs (`http://127.0.0.1:5000`) with your deployed backend URL or move the API base URL into a Vite environment variable such as `VITE_API_URL`.

### Database (MongoDB Atlas)
1. Register for a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new shared cluster, and add a database user with read/write privileges.
3. Whitelist access from all IP addresses (`0.0.0.0/0`) or configure specific IPs for your host.
4. Copy the connection string. It will look like:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/smartbasai?retryWrites=true&w=majority`

### Backend (Render / Heroku / DigitalOcean)
1. Push your code repository to GitHub.
2. Log into your cloud host (e.g., [Render](https://render.com)).
3. Create a new **Web Service** and connect it to your GitHub repository.
4. Set the build commands and environment variables:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:**
     - `MONGODB_URI`: *Your MongoDB Atlas Connection String*
     - `JWT_SECRET`: *A long secure random string*
     - `PORT`: `10000` (or leave default assigned by host)

### Frontend (Vercel / Netlify)
1. Log into Vercel or Netlify.
2. Select **New Project** and link your GitHub repository.
3. Configure the Root Directory to `frontend/`.
4. If you moved the API base URL into an environment variable, set `VITE_API_URL` to your deployed backend URL.
5. Click **Deploy**.

---

## Quick Verification Checklist
- Backend `/api/test` returns a success message at `http://localhost:5000/api/test`.
- Frontend opens at the Vite URL, usually `http://localhost:5173`.
- **Login** and **Sign Up** buttons open the authentication form.
- Admin login works with `admin@smartbasai.com` / `admin123`.
- Admin dashboard opens from **Admin Panel** or **Admin Analytics**.
npm install
PORT=3000
NODE_ENV=development



npm start
## 📂 Project Structure

smart-basai/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---







