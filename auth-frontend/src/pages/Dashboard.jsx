// // // // // import api from "../api/axios";
// // // // // import { useEffect, useState } from "react";

// // // // // const Dashboard = () => {
// // // // //   const [user, setUser] = useState(null);

// // // // //   useEffect(() => {
// // // // //     api.get("/user/profile").then((res) => {
// // // // //       setUser(res.data.user);
// // // // //     });
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="auth-container">
// // // // //       <h2>Dashboard</h2>
// // // // //       {user && <p>Welcome {user.name}</p>}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;

// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import api from "../api/axios";
// // // // import { useAuth } from "../context/AuthContext";
// // // // import { Link } from "react-router-dom";

// // // // const Dashboard = () => {
// // // //   const [user, setUser] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");

// // // //   const navigate = useNavigate();
// // // //   const { logout } = useAuth();

// // // //   useEffect(() => {
// // // //     const fetchProfile = async () => {
// // // //       try {
// // // //         const res = await api.get("/user/profile");
// // // //         setUser(res.data.user);
// // // //       } catch (err) {
// // // //         setError("Failed to load profile");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchProfile();
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/");
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="dashboard">
// // // //         <p>Loading dashboard...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="dashboard">
// // // //         <p style={{ color: "#ef4444" }}>{error}</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="dashboard">
// // // //       <h2>Dashboard</h2>

// // // //       {user && (
// // // //         <>
// // // //           <p>Welcome back, <strong>{user.name}</strong></p>
// // // //               <Link to="/settings">Go to Settings</Link>


// // // //           <div className="profile-card">
// // // //             <p><strong>Name:</strong> {user.name}</p>
// // // //             <p><strong>Email:</strong> {user.email}</p>
// // // //             <p>
// // // //               <strong>Two-Factor Auth:</strong>{" "}
// // // //               {user.twoFactorEnabled ? "Enabled" : "Disabled"}
// // // //             </p>
// // // //           </div>

// // // //           <button
// // // //             className="logout-btn"
// // // //             onClick={handleLogout}
// // // //           >
// // // //             Logout
// // // //           </button>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;


// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import api from "../api/axios";
// // // import { useAuth } from "../context/AuthContext";

// // // const Dashboard = () => {
// // //   const [user, setUser] = useState(null);
// // //   const [showMenu, setShowMenu] = useState(false);
// // //   const navigate = useNavigate();
// // //   const { logout } = useAuth();

// // //   useEffect(() => {
// // //     api.get("/user/profile").then((res) => {
// // //       setUser(res.data.user);
// // //     });
// // //   }, []);

// // //   if (!user) return null;

// // //   return (
// // //     <div className="dashboard-wrapper">
// // //       {/* ===== TOP NAVBAR ===== */}
// // //       <nav className="navbar">
// // //         <h2 className="logo">AuthApp</h2>

// // //         <div
// // //           className="profile-wrapper"
// // //           onMouseEnter={() => setShowMenu(true)}
// // //           onMouseLeave={() => setShowMenu(false)}
// // //         >
// // //           <div className="avatar">
// // //             {user.name.charAt(0).toUpperCase()}
// // //           </div>

// // //           {showMenu && (
// // //             <div className="profile-menu">
// // //               <p onClick={() => navigate("/settings")}>Settings</p>
// // //               <p className="logout" onClick={logout}>
// // //                 Logout
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </nav>

// // //       {/* ===== MAIN DASHBOARD ===== */}
// // //       <div className="dashboard">
// // //         <h2>Welcome back, <span>{user.name}</span></h2>
// // //         <p className="muted">Manage your account and security</p>

// // //         <div className="user-card">
// // //           <p><strong>Name:</strong> {user.name}</p>
// // //           <p><strong>Email:</strong> {user.email}</p>
// // //           <p>
// // //             <strong>Two-Factor Auth:</strong>{" "}
// // //             {user.twoFactorEnabled ? "Enabled ✅" : "Disabled ❌"}
// // //           </p>
// // //         </div>

// // //         <button className="logout-btn" onClick={logout}>
// // //           Logout
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;

// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";
// // import { useAuth } from "../context/AuthContext";

// // const Dashboard = () => {
// //   const [user, setUser] = useState(null);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const navigate = useNavigate();
// //   const { logout } = useAuth();

// //   useEffect(() => {
// //     api.get("/user/profile").then((res) => {
// //       setUser(res.data.user);
// //     });
// //   }, []);

// //   if (!user) return null;

// //   return (
// //     <div className="app-layout">
// //       {/* ===== NAVBAR ===== */}
// //       <header className="navbar">
// //         <div className="navbar-left">AuthApp</div>

// //         <div className="navbar-right">
// //           <div
// //             className="avatar"
// //             onClick={() => setMenuOpen(!menuOpen)}
// //           >
// //             {user.name.charAt(0).toUpperCase()}
// //           </div>

// //           {menuOpen && (
// //             <div className="dropdown">
// //               <div onClick={() => navigate("/settings")}>Settings</div>
// //               <div className="danger" onClick={logout}>Logout</div>
// //             </div>
// //           )}
// //         </div>
// //       </header>

// //       {/* ===== CONTENT ===== */}
// //       <main className="dashboard-content">
// //         <h1>
// //           Welcome back, <span>{user.name}</span>
// //         </h1>
// //         <p className="subtitle">
// //           Manage your account and security
// //         </p>

// //         <div className="info-card">
// //           <p><strong>Name:</strong> {user.name}</p>
// //           <p><strong>Email:</strong> {user.email}</p>
// //           <p>
// //             <strong>Two-Factor Auth:</strong>{" "}
// //             {user.twoFactorEnabled ? "Enabled ✅" : "Disabled ❌"}
// //           </p>
// //         </div>

// //         <button className="logout-btn" onClick={logout}>
// //           Logout
// //         </button>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     api.get("/user/profile").then((res) => {
//       setUser(res.data.user);
//     });
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="dashboard-layout">
//       {/* ===== NAVBAR ===== */}
//       <header className="dashboard-navbar">
//         <div className="logo">AuthApp</div>

//         <div className="profile-area">
//           <div
//             className="profile-avatar"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {user.name.charAt(0).toUpperCase()}
//           </div>

//           {menuOpen && (
//             <div className="profile-dropdown">
//               <div onClick={() => navigate("/settings")}>Settings</div>
//               <div className="logout-item" onClick={logout}>
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ===== MAIN CONTENT ===== */}
//       <main className="dashboard-main">
//         {/* HERO */}
//         <section className="dashboard-hero">
//           <h1>
//             Welcome back, <span>{user.name}</span> 👋
//           </h1>
//           <p>Manage your account, security and preferences</p>
//         </section>

//         {/* INFO CARDS */}
//         <section className="dashboard-cards">
//           <div className="card">
//             <h3>Profile</h3>
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//           </div>

//           <div className="card">
//             <h3>Security</h3>
//             <p>
//               Two-Factor Auth:{" "}
//               <span className={user.twoFactorEnabled ? "enabled" : "disabled"}>
//                 {user.twoFactorEnabled ? "Enabled" : "Disabled"}
//               </span>
//             </p>
//             <button
//               className="secondary-btn"
//               onClick={() => navigate("/settings")}
//             >
//               Manage Security
//             </button>
//           </div>
//         </section>
//       </main>
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