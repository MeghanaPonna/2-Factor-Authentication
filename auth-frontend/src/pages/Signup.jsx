// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value, // 🔥 now works
//     });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/auth/register", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       alert("Signup successful! Please login.");
//       navigate("/");
//     } catch (error) {
//       alert(error.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div style={{ maxWidth: "400px", margin: "80px auto" }}>
//     <div className="auth-container">
//       <h2>Signup</h2>

//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           name="name"              // ✅ REQUIRED
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"             // ✅ REQUIRED
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"          // ✅ REQUIRED
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating account..." : "Signup"}
//         </button>
//       </form>

//       <p style={{ marginTop: "12px" }}>
//         Already have an account? <Link to="/">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      {error && <p style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>

      <p className="auth-link" style={{ marginTop: "12px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;