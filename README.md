# 🔐 Authentication System with Email Verification & 2FA

A **secure, production-ready authentication system** built using **React, Node.js, Express, MongoDB**, featuring **email verification**, **email-based OTP (2FA)**, and **password reset** with time-bound tokens.

---

## 🚀 Features

* ✅ User Signup with Email Verification
* 🔐 Secure Login with JWT Authentication
* 📧 Optional Email-based Two-Factor Authentication (2FA)
* ⏱ OTP Expiry (5 minutes) & Resend Cooldown (60 seconds)
* 🔁 Forgot Password & Reset Password via Email
* 🛡️ Protected Routes with JWT Middleware
* 👁️ Show / Hide Password Support
* 🔒 Industry-standard security practices

---

## 🧠 Authentication Flow (High-Level)

1. **Signup**

   * User registers with name, email, and password
   * Password is hashed using bcrypt
   * Email verification link is sent

2. **Email Verification**

   * User clicks verification link
   * Backend validates token
   * Account is activated

3. **Login**

   * User enters email and password
   * If **2FA disabled** → direct login
   * If **2FA enabled** → OTP sent to email

4. **OTP Verification (2FA)**

   * User enters OTP
   * OTP valid for **5 minutes**
   * Resend allowed after **60 seconds**
   * On success → JWT issued

5. **Dashboard**

   * Accessible only with valid JWT

6. **Forgot Password**

   * Reset link sent to email
   * Token valid for limited time
   * User sets new password

---

## 🏗️ System Architecture

```
Frontend (React)
│
├── Signup
│   └── Email Verification
│
├── Login
│   ├── 2FA Disabled → Dashboard
│   └── 2FA Enabled → Verify OTP → Dashboard
│
├── Forgot Password
│   └── Reset Password
│
└── Dashboard (Protected)
     ↑
     JWT Auth Middleware
     │
Backend (Node.js / Express)
│
├── Auth Controller
│   ├── Register
│   ├── Verify Email
│   ├── Login
│   ├── Send OTP
│   ├── Verify OTP
│   ├── Forgot Password
│   └── Reset Password
│
├── JWT Middleware
│
└── MongoDB (User Data)
```

---

## 🗄️ Database Schema (User)

```js
{
  name: String,
  email: String,
  password: String,        // hashed
  isEmailVerified: Boolean,
  twoFactorEnabled: Boolean,

  emailVerificationToken: String,
  emailVerificationExpiry: Date,

  twoFactorOTP: String,
  twoFactorOTPExpiry: Date,

  resetPasswordToken: String,
  resetPasswordExpiry: Date,
}
```

---

## 🔐 Security Measures

* Password hashing using **bcrypt**
* JWT-based stateless authentication
* Time-bound tokens for:

  * Email verification
  * OTP verification
  * Password reset
* OTP hashing before storage
* OTP resend cooldown to prevent abuse
* Protected routes via middleware

---

## ⏱ OTP Strategy (Industry-Standard)

| Feature         | Value            |
| --------------- | ---------------- |
| OTP Validity    | 5 minutes        |
| Resend Cooldown | 60 seconds       |
| OTP Storage     | Hashed           |
| Attempts        | Server-validated |

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT
* bcrypt
* crypto
* Nodemailer

---

## 📦 Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## ▶️ How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 API Endpoints (Auth)

| Method | Endpoint                    | Description     |
| ------ | --------------------------- | --------------- |
| POST   | /auth/register              | Register user   |
| GET    | /auth/verify-email/:token   | Verify email    |
| POST   | /auth/login                 | Login user      |
| POST   | /auth/verify-otp            | Verify OTP      |
| POST   | /auth/resend-otp            | Resend OTP      |
| POST   | /auth/forgot-password       | Send reset link |
| POST   | /auth/reset-password/:token | Reset password  |

---

## 💡 Key Learnings

* Implemented real-world authentication flow
* Understood secure token handling
* Learned OTP lifecycle management
* Built refresh-safe timers using timestamps
* Applied backend-driven security logic

---

## 📌 Future Enhancements

* 🔒 OTP attempt limit & account lock
* 🌐 Social login (Google, GitHub)
* 📱 SMS-based OTP
* 🔔 Login alerts
* 🧾 Audit logs

---

## 👩‍💻 Author

**Ponna Meghana**
Full-Stack Developer
Passionate about building secure and scalable systems 🚀

---

## ⭐ Final Note

This project follows **real industry authentication standards**, not just tutorial-level code.
It is **resume-worthy**, **interview-ready**, and **production-ready**.

---

