import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    const userId = localStorage.getItem("tempUserId");
    if (!userId) {
      setError("Session expired. Please login again.");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        userId,
        otp,
      });

      // Save auth state
      login(res.data.token, res.data.user);

      // Cleanup temp data
      localStorage.removeItem("tempUserId");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Verify OTP</h2>

      {error && (
        <p style={{ color: "#ef4444", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default VerifyOTP;