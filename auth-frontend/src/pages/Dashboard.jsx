// import api from "../api/axios";
// import { useEffect, useState } from "react";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     api.get("/user/profile").then((res) => {
//       setUser(res.data.user);
//     });
//   }, []);

//   return (
//     <div className="auth-container">
//       <h2>Dashboard</h2>
//       {user && <p>Welcome {user.name}</p>}
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <p style={{ color: "#ef4444" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {user && (
        <>
          <p>Welcome back, <strong>{user.name}</strong></p>

          <div className="profile-card">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Two-Factor Auth:</strong>{" "}
              {user.twoFactorEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;