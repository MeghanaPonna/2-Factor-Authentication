import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/profile")
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/"));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-root">
      {/* Top bar */}
      <div className="profile-navbar">
        <div className="brand">AuthApp</div>
        <button className="link-btn" onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
      </div>

      {/* Profile Card */}
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>

          <div className="profile-info">
            <div>
              <span>Two-Factor Authentication</span>
              <strong className={user.twoFactorEnabled ? "enabled" : "disabled"}>
                {user.twoFactorEnabled ? "Enabled" : "Disabled"}
              </strong>
            </div>

            <div>
              <span>Account Created</span>
              <strong>
                {new Date(user.createdAt).toLocaleDateString()}
              </strong>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/settings")}
            >
              Manage Security
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;