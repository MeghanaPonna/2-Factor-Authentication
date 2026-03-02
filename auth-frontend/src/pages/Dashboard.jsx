import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    api.get("/user/profile").then((res) => {
      setUser(res.data.user);
    });
  }, []);

  if (!user) return null;

  return (
    <div className="dashboard-root">
      {/* NAVBAR */}
      <header className="dashboard-navbar">
        <div className="brand">AuthApp</div>

        <div className="profile">
          <div
            className="avatar"
            onClick={() => setOpen(!open)}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {open && (
            <div className="menu">
              <div onClick={() => navigate("/profile")}>Profile</div>
              <div onClick={() => navigate("/security")}>Security</div>
              <div onClick={() => navigate("/settings")}>Settings</div>
              <div className="danger" onClick={logout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard-container">
        <h1>
          Welcome back, <span>{user.name}</span> 👋
        </h1>

        <p className="subtitle">
          This application helps you manage authentication and security
          with email-based OTP verification and two-factor authentication.
        </p>

        <ul className="features">
          <li>🔐 Secure login with email OTP</li>
          <li>📧 Password reset via email</li>
          <li>🛡️ Two-factor authentication protection</li>
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;