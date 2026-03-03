// // // // // import { useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import api from "../api/axios";
// // // // // import { useAuth } from "../context/AuthContext";

// // // // // const VerifyOTP = () => {
// // // // //   const [otp, setOtp] = useState("");
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState("");

// // // // //   const navigate = useNavigate();
// // // // //   const { login } = useAuth();

// // // // //   const handleVerify = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setError("");

// // // // //     if (!otp || otp.length < 6) {
// // // // //       setError("Please enter a valid 6-digit OTP");
// // // // //       return;
// // // // //     }

// // // // //     const userId = localStorage.getItem("tempUserId");
// // // // //     if (!userId) {
// // // // //       setError("Session expired. Please login again.");
// // // // //       navigate("/");
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       setLoading(true);

// // // // //       const res = await api.post("/auth/verify-otp", {
// // // // //         userId,
// // // // //         otp,
// // // // //       });

// // // // //       // Save auth state
// // // // //       login(res.data.token, res.data.user);

// // // // //       // Cleanup temp data
// // // // //       localStorage.removeItem("tempUserId");

// // // // //       navigate("/dashboard");
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.message || "Invalid or expired OTP");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="auth-page">
// // // // //     <div className="auth-container">
// // // // //       <h2>Verify OTP</h2>

// // // // //       {error && (
// // // // //         <p style={{ color: "#ef4444", marginBottom: "10px" }}>
// // // // //           {error}
// // // // //         </p>
// // // // //       )}

// // // // //       <form onSubmit={handleVerify}>
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Enter 6-digit OTP"
// // // // //           value={otp}
// // // // //           onChange={(e) => setOtp(e.target.value)}
// // // // //           maxLength={6}
// // // // //           required
// // // // //         />

// // // // //         <button type="submit" disabled={loading}>
// // // // //           {loading ? "Verifying..." : "Verify OTP"}
// // // // //         </button>
// // // // //       </form>
// // // // //     </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default VerifyOTP;



// // // main logic is here



// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";
// // import { useAuth } from "../context/AuthContext";

// // const VerifyOTP = () => {
// //   const [otp, setOtp] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // 🔥 NEW STATES
// //   const [timer, setTimer] = useState(60);
// //   const [canResend, setCanResend] = useState(false);

// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const userId = localStorage.getItem("tempUserId");

// //   // ⏱ Countdown effect
// //   useEffect(() => {
// //     if (timer === 0) {
// //       setCanResend(true);
// //       return;
// //     }

// //     const interval = setInterval(() => {
// //       setTimer((prev) => prev - 1);
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [timer]);

// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!otp || otp.length < 6) {
// //       setError("Please enter a valid 6-digit OTP");
// //       return;
// //     }

// //     if (!userId) {
// //       setError("Session expired. Please login again.");
// //       navigate("/login");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const res = await api.post("/auth/verify-otp", {
// //         userId,
// //         otp,
// //       });

// //       login(res.data.token, res.data.user);
// //       localStorage.removeItem("tempUserId");
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Invalid or expired OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 🔁 RESEND OTP
// //   const handleResendOTP = async () => {
// //     try {
// //       setError("");
// //       await api.post("/auth/resend-otp", { userId });

// //       setTimer(60);
// //       setCanResend(false);
// //     } catch {
// //       setError("Failed to resend OTP. Try again.");
// //     }
// //   };

// //   return (
// //     <div className="auth-page">
// //       <div className="auth-container">
// //         <h2>Verify OTP</h2>

// //         {error && (
// //           <p style={{ color: "#ef4444", marginBottom: "10px" }}>
// //             {error}
// //           </p>
// //         )}

// //         <form onSubmit={handleVerify}>
// //           <input
// //             type="text"
// //             placeholder="Enter 6-digit OTP"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //             maxLength={6}
// //             required
// //           />

// //           <button type="submit" disabled={loading}>
// //             {loading ? "Verifying..." : "Verify OTP"}
// //           </button>
// //         </form>

// //         {/* 🔁 RESEND SECTION */}
// //         <div style={{ marginTop: "16px", textAlign: "center" }}>
// //           {!canResend ? (
// //             <p>Resend OTP in {timer}s</p>
// //           ) : (
// //             <button
// //               type="button"
// //               onClick={handleResendOTP}
// //               className="link-btn"
// //             >
// //               Resend OTP
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VerifyOTP;




// // corrected version with refresh-safe timer

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// const getRemainingSeconds = () => {
//   const expiry = localStorage.getItem("resendAvailableAt");
//   if (!expiry) return 60;
//   return Math.max(0, Math.floor((expiry - Date.now()) / 1000));
// };

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🔥 TIMER (refresh-safe)
//   const [timer, setTimer] = useState(() => getRemainingSeconds());
//   const [canResend, setCanResend] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const userId = localStorage.getItem("tempUserId");

//   /* ===================== TIMER EFFECT ===================== */
//   useEffect(() => {
//     if (timer === 0) {
//       setCanResend(true);
//       return;
//     }

//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);

//   /* ===================== VERIFY OTP ===================== */
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!otp || otp.length < 6) {
//       setError("Please enter a valid 6-digit OTP");
//       return;
//     }

//     if (!userId) {
//       setError("Session expired. Please login again.");
//       navigate("/login");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/verify-otp", {
//         userId,
//         otp,
//       });

//       login(res.data.token, res.data.user);

//       // cleanup
//       localStorage.removeItem("tempUserId");
//       localStorage.removeItem("resendAvailableAt");

//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid or expired OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===================== RESEND OTP ===================== */
//   const handleResendOTP = async () => {
//     try {
//       setError("");
//       await api.post("/auth/resend-otp", { userId });

//       // 🔑 store timestamp (THIS FIXES REFRESH ISSUE)
//       localStorage.setItem(
//         "resendAvailableAt",
//         Date.now() + 60 * 1000
//       );

//       setTimer(60);
//       setCanResend(false);
//     } catch {
//       setError("Failed to resend OTP. Try again.");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h2>Verify OTP</h2>

//         {error && (
//           <p style={{ color: "#ef4444", marginBottom: "10px" }}>
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleVerify}>
//           <input
//             type="text"
//             placeholder="Enter 6-digit OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength={6}
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         {/* 🔁 RESEND SECTION */}
//         <div style={{ marginTop: "16px", textAlign: "center" }}>
//           {!canResend ? (
//             <p>Resend OTP in {timer}s</p>
//           ) : (
//             <button
//               type="button"
//               onClick={handleResendOTP}
//               className="link-btn"
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOTP;






// FINAL VERSION WITH OTP EXPIRY TIMER

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

/* ===== helpers ===== */
const getRemaining = (key, fallback) => {
  const expiry = localStorage.getItem(key);
  if (!expiry) return fallback;
  return Math.max(0, Math.floor((expiry - Date.now()) / 1000));
};

const formatTime = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 EXISTING (resend – 60s)
  const [timer, setTimer] = useState(() =>
    getRemaining("resendAvailableAt", 60)
  );
  const [canResend, setCanResend] = useState(false);

  // 🔥 NEW (OTP validity – 5 mins)
  const [otpValid, setOtpValid] = useState(() =>
    getRemaining("otpExpiresAt", 300)
  );

  const navigate = useNavigate();
  const { login } = useAuth();
  const userId = localStorage.getItem("tempUserId");

  /* ===== tick both timers ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getRemaining("resendAvailableAt", 0));
      setOtpValid(getRemaining("otpExpiresAt", 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) setCanResend(true);
  }, [timer]);

  /* ===== verify otp ===== */
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (otpValid === 0) {
      setError("OTP expired. Please resend OTP.");
      return;
    }

    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        userId,
        otp,
      });

      login(res.data.token, res.data.user);

      localStorage.removeItem("tempUserId");
      localStorage.removeItem("resendAvailableAt");
      localStorage.removeItem("otpExpiresAt");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ===== resend otp ===== */
  const handleResendOTP = async () => {
    try {
      await api.post("/auth/resend-otp", { userId });

      // reset both timers
      localStorage.setItem(
        "resendAvailableAt",
        Date.now() + 60 * 1000
      );
      localStorage.setItem(
        "otpExpiresAt",
        Date.now() + 5 * 60 * 1000
      );

      setCanResend(false);
    } catch {
      setError("Failed to resend OTP. Try again.");
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

        {/* OTP INPUT (only if valid) */}
        {otpValid > 0 && (
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
        )}

        {/* TIMERS */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <p>OTP valid for: {formatTime(otpValid)}</p>

          {!canResend ? (
            <p>Resend OTP in {timer}s</p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              className="link-btn"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;