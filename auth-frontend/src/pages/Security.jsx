import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Security = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch security status
  useEffect(() => {
    const fetchSecurity = async () => {
      try {
        const res = await api.get("/user/profile");
        setTwoFA(res.data.user.twoFactorEnabled);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurity();
  }, []);

  // Toggle 2FA
  const toggle2FA = async () => {
    try {
      await api.put("/user/toggle-2fa");
      setTwoFA(!twoFA);
    } catch (err) {
      alert("Failed to update 2FA");
    }
  };

  return (
    <div className="dashboard-root">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div className="brand">AuthApp</div>
        <button className="link-btn" onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
      </nav>

      {/* MAIN */}
      <main className="security-container">
        <h1>Security Settings</h1>
        <p className="subtitle">
          Manage your account security, authentication methods and password.
        </p>

        {loading ? (
          <p>Loading security settings...</p>
        ) : (
          <>
            {/* 2FA CARD */}
            <div className="security-card">
              <h3>Two-Factor Authentication</h3>
              <p>
                Status:{" "}
                <span className={twoFA ? "enabled" : "disabled"}>
                  {twoFA ? "Enabled" : "Disabled"}
                </span>
              </p>
              <p className="muted">
                Adds an extra layer of security by sending an OTP to your email
                during login.
              </p>

              <button className="secondary-btn" onClick={toggle2FA}>
                {twoFA ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>

            {/* PASSWORD CARD */}
            <div className="security-card">
              <h3>Password</h3>
              <p className="muted">
                Change your password regularly to keep your account secure.
              </p>

              <button
                className="secondary-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Change Password
              </button>
            </div>

            {/* SESSION CARD */}
            <div className="security-card danger-card">
              <h3>Logout</h3>
              <p className="muted">
                Logout from this session and remove authentication tokens.
              </p>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Security;