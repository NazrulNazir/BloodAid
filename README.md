# 🩸 BloodAid - Blood Donation Management System

BloodAid is a full-stack Blood Donation Management System that connects blood donors with people in need. Users can create blood donation requests, search for available donors, manage donation requests, and perform role-based actions through a secure dashboard.

---

## 🔗 Live Demo

### Client
https://your-client-url.vercel.app

### Server
https://blood-aid-server-xi.vercel.app/

---

## ✨ Features

### 🔐 Authentication
- Secure Login & Registration
- JWT Authentication
- Protected Routes
- Role-Based Authorization

### 👤 User Roles
- Admin
- Donor
- Volunteer

### 🩸 Donation Management
- Create Donation Request
- Edit Donation Request
- Delete Donation Request
- View Donation Details
- Update Donation Status
- Recent Donation Requests

### 🔍 Search Donors
- Search by Blood Group
- Search by District
- Search by Upazila

### 👨‍💼 Admin Dashboard
- Manage Users
- Change User Role
- Block / Unblock Users
- Manage Donation Requests
- Dashboard Statistics

### 🙋 Donor Dashboard
- My Donation Requests
- Create Donation Request
- Edit Request
- Update Request Status

### 📱 Responsive Design
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React 19
- Tailwind CSS
- HeroUI
- React Hot Toast
- React Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Better Auth

---

## Database

MongoDB Atlas

---

# 📂 Folder Structure



# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/NazrulNazir/BloodAid
```

Go to client

```bash
cd client
```

Install packages

```bash
npm install
```

Run Client

```bash
npm run dev
```

Go to server

```bash
cd server
```

Install packages

```bash
npm install
```

Run Server

```bash
npm run dev
```

---

# ⚙ Environment Variables

## Client (.env.local)

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Server (.env)

```env
PORT=5000

MONGODB_URI=Your MongoDB URI

CLIENT_URL=http://localhost:3000

BETTER_AUTH_SECRET=Your Secret

BETTER_AUTH_URL=http://localhost:3000
```

---

# 📌 Main Functionalities

- User Authentication
- JWT Verification
- Role Management
- Protected Dashboard
- Donation Request CRUD
- Donation Status Update
- Search Donors
- Recent Donation Requests
- Responsive Dashboard
- Secure API

---

# 🔒 User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full Access |
| Donor | Create & Manage Own Donation Requests |
| Volunteer | View & Manage Donation Requests |


# 📡 API Endpoints

### Authentication

```
POST /api/auth/sign-in
POST /api/auth/sign-up
```

# 👨‍💻 Developed By

**Nazrul Nazir**


# ⭐ If you like this project

Please give this repository a ⭐ on GitHub.