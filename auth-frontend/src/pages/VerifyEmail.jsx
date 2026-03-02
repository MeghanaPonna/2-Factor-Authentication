import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const hasRun = useRef(false); // 🔑 prevents double call
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verify = async () => {
      try {
        await api.get(`/auth/verify-email/${token}`);
        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {status === "verifying" && (
          <>
            <h2>Verifying Email...</h2>
            <p>Please wait</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2>Email Verified ✅</h2>
            <p>Redirecting to login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2>Verification Link Invalid</h2>
            <p style={{ color: "#ef4444" }}>
              This link may have already been used or expired.
            </p>
            <button onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;