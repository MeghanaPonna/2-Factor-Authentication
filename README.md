# 🔐 MERN Authentication System with Email Verification & 2FA

A **secure authentication system** built using the **MERN stack** that implements email verification, OTP-based two-factor authentication (2FA), and password reset functionality using industry-standard security practices.

This project demonstrates how modern web applications handle **secure user authentication and account protection**.

---

# 🚀 Features

* User registration with **email verification**
* **JWT-based secure login**
* **OTP-based Two Factor Authentication (2FA)**
* OTP expiry **(5 minutes)** with resend cooldown
* **Forgot password & reset password via email**
* **Protected routes** using JWT middleware
* **Password hashing** using bcrypt

---

# 🧠 Authentication Flow

1. User registers → Verification email is sent
2. User verifies email → Account becomes active
3. User logs in
4. If **2FA is enabled** → OTP sent to email
5. OTP verified → JWT issued → User accesses dashboard

---

# 🛠 Tech Stack

### Frontend

* React
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Security & Authentication

* JWT (JSON Web Tokens)
* bcrypt
* Nodemailer

---

# 🔐 Security Implementation

* Passwords hashed using **bcrypt**
* **JWT authentication** for secure sessions
* **Time-bound OTP and reset tokens**
* OTP stored as **hashed values in the database**
* **Protected API routes** using middleware

---

# 📡 API Endpoints

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | `/auth/register`              |
| GET    | `/auth/verify-email/:token`   |
| POST   | `/auth/login`                 |
| POST   | `/auth/verify-otp`            |
| POST   | `/auth/resend-otp`            |
| POST   | `/auth/forgot-password`       |
| POST   | `/auth/reset-password/:token` |

---

# 📂 Project Structure

```
client/
 ├── components
 ├── pages
 ├── services
 └── App.js

server/
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 ├── utils
 └── server.js
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/authentication-system.git
cd 2-factor-authentication
```

### 2️⃣ Install dependencies

Backend

```bash
cd server
npm install
```

Frontend

```bash
cd client
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the **server** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4️⃣ Run the application

Backend

```bash
npm run dev
```

Frontend

```bash
npm start
```

---

# 👩‍💻 Author

**Ponna Meghana**
Full Stack Developer (MERN)
