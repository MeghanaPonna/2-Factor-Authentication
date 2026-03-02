import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState(null);
  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
        setTwoFA(res.data.user.twoFactorEnabled);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const toggle2FA = async () => {
    try {
      await api.put("/user/toggle-2fa");
      setTwoFA(!twoFA);
    } catch {
      alert("Failed to update 2FA");
    }
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading settings...</p>;
  }

  return (
    <div className="settings-root">
      {/* NAVBAR */}
      <header className="settings-navbar">
        <h2>Settings</h2>
        <button className="link-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </header>

      <main className="settings-container">
        {/* ACCOUNT */}
        <section className="settings-section">
          <h3>Account</h3>
          <div className="settings-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Account Created:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* SECURITY */}
        <section className="settings-section">
          <h3>Security</h3>

          <div className="settings-card space-between">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p className="muted">
                Protect your account with email-based OTP verification.
              </p>
              <p>
                Status:{" "}
                <span className={twoFA ? "enabled" : "disabled"}>
                  {twoFA ? "Enabled" : "Disabled"}
                </span>
              </p>
            </div>
            <button className="secondary-btn" onClick={toggle2FA}>
              {twoFA ? "Disable" : "Enable"}
            </button>
          </div>

          <div className="settings-card space-between">
            <div>
              <h4>Password</h4>
              <p className="muted">Change your account password.</p>
            </div>
            <button
              className="secondary-btn"
              onClick={() => navigate("/forgot-password")}
            >
              Change Password
            </button>
          </div>
        </section>

        {/* PREFERENCES */}
        {/* <section className="settings-section">
          <h3>Preferences</h3>

          <div className="settings-card space-between">
            <div>
              <h4>Email Notifications</h4>
              <p className="muted">
                Receive security and login notifications via email.
              </p>
            </div>
            <span className="muted">Enabled (default)</span>
          </div>

          <div className="settings-card space-between">
            <div>
              <h4>Theme</h4>
              <p className="muted">Dark mode (default)</p>
            </div>
            <span className="muted">Dark</span>
          </div>
        </section> */}
        <section className="settings-section">
  <h3>Preferences</h3>

  <div className="settings-card space-between">
    <div>
      <h4>Theme</h4>
      <p className="muted">
        Switch between dark and light mode.
      </p>
    </div>

    <button className="secondary-btn" onClick={toggleTheme}>
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  </div>
</section>

        {/* DANGER ZONE */}
        <section className="settings-section">
          <h3 className="danger-title">Danger Zone</h3>

          <div className="settings-card space-between">
            <p>Logout from your account</p>
            <button className="danger-btn" onClick={logout}>
              Logout
            </button>
          </div>

          <div className="settings-card space-between">
            <p>Delete your account (disabled)</p>
            <button className="danger-btn disabled-btn" disabled>
              Delete Account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;