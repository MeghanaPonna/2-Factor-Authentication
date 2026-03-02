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

      // ✅ Correct flow
      navigate("/check-email");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Account</h2>

        {error && (
          <p style={{ color: "#ef4444", marginBottom: "10px" }}>
            {error}
          </p>
        )}

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
    </div>
  );
};

export default Signup;