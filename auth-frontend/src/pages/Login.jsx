// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       // 🔐 Case 1: 2FA Disabled
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         navigate("/dashboard");
//         return;
//       }

//       // 🔐 Case 2: 2FA Enabled
//       if (res.data.userId) {
//         localStorage.setItem("tempUserId", res.data.userId);
//         navigate("/verify-otp");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h2>Login</h2>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {/* 🔐 PASSWORD WITH TOGGLE */}
//           <div style={{ position: "relative" }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: "absolute",
//                 right: "12px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#a5b4fc",
//                 fontSize: "0.9rem",
//                 userSelect: "none",
//               }}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="auth-link">
//           Don’t have an account? <Link to="/signup">Signup</Link>
//         </p>

//         <p className="auth-link">
//           <Link to="/forgot-password">Forgot password?</Link>
//         </p>
//       </div>
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // 🔐 Case 1: 2FA Disabled
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        return;
      }

      // 🔐 Case 2: 2FA Enabled
      if (res.data.userId) {
        // ✅ START OTP SESSION HERE (THIS WAS MISSING)
        localStorage.setItem("tempUserId", res.data.userId);

        localStorage.setItem(
          "otpExpiresAt",
          Date.now() + 5 * 60 * 1000 // 5 minutes
        );

        localStorage.setItem(
          "resendAvailableAt",
          Date.now() + 60 * 1000 // 60 seconds
        );

        navigate("/verify-otp");
      }
    } catch (error) {
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

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#a5b4fc",
                fontSize: "0.9rem",
                userSelect: "none",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

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