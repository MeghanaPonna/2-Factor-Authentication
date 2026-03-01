// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       console.log("Login payload:", { email, password }); // 🔍 debug

//       const res = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       // backend returns userId after password verification
//       localStorage.setItem("userId", res.data.userId);

//       alert(res.data.message || "OTP sent");
//       navigate("/verify-otp");
//     } catch (error) {
//       console.error("Login error:", error.response);
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div style={{ maxWidth: "400px", margin: "80px auto" }}>
//     <div className="auth-container">
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p style={{ marginTop: "12px" }}>
//         Don’t have an account? <Link to="/signup">Signup</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      /* =====================
         CASE 1: 2FA DISABLED
         ===================== */
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful");
        navigate("/dashboard");
        return;
      }

      /* =====================
         CASE 2: 2FA ENABLED
         ===================== */
      if (res.data.userId) {
        localStorage.setItem("tempUserId", res.data.userId);

        alert("OTP sent to your email");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-link">
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>

      <p className="auth-link">
        <Link to="/forgot-password">Forgot password?</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;