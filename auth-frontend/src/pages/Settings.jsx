import { useState, useEffect } from "react";
import api from "../api/axios";

const Settings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setTwoFactorEnabled(user.twoFactorEnabled);
    }
  }, []);

  const toggle2FA = async () => {
    try {
      setLoading(true);

      const res = await api.patch("/user/toggle-2fa", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTwoFactorEnabled(res.data.twoFactorEnabled);

      // update localStorage user
      const user = JSON.parse(localStorage.getItem("user"));
      user.twoFactorEnabled = res.data.twoFactorEnabled;
      localStorage.setItem("user", JSON.stringify(user));

      alert(res.data.message);
    } catch (error) {
      alert("Failed to update 2FA setting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-card">
      <h2>Security Settings</h2>

      <div className="setting-row">
        <span>Two-Factor Authentication</span>

        <button onClick={toggle2FA} disabled={loading}>
          {twoFactorEnabled ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default Settings;