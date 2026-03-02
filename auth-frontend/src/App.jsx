import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/check-email" element={<CheckEmail />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/security"
        element={
          <ProtectedRoute>
            <Security />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;