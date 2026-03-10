# 🔐 Authentication System with Email Verification & 2FA

A **secure MERN stack authentication system** implementing **email verification, OTP-based two-factor authentication (2FA), and password reset** using industry-standard security practices.

---

## 🚀 Features

* User **Signup with Email Verification**
* **JWT-based Secure Login**
* **Email OTP Two-Factor Authentication (2FA)**
* **OTP Expiry (5 minutes) & Resend Cooldown**
* **Forgot Password & Reset Password via Email**
* **Protected Routes using JWT Middleware**
* **Password Hashing using bcrypt**

---

## 🧠 Authentication Flow

1. User **registers** → verification email sent
2. User **verifies email** → account activated
3. User **logs in**
4. If **2FA enabled** → OTP sent to email
5. OTP verified → **JWT issued → dashboard access**

---

## 🛠 Tech Stack

**Frontend**

* React
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT
* bcrypt
* Nodemailer

---

## 🔐 Security Implementation

* **Hashed passwords (bcrypt)**
* **JWT authentication**
* **Time-bound OTP and reset tokens**
* **OTP hashed before database storage**
* **Protected API routes with middleware**

---

## 📡 API Endpoints

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | /auth/register              |
| GET    | /auth/verify-email/:token   |
| POST   | /auth/login                 |
| POST   | /auth/verify-otp            |
| POST   | /auth/resend-otp            |
| POST   | /auth/forgot-password       |
| POST   | /auth/reset-password/:token |

---

## 👩‍💻 Author

**Ponna Meghana**
Full Stack Developer (MERN)

---

⭐ This project demonstrates **secure authentication architecture used in real-world applications.**

---
