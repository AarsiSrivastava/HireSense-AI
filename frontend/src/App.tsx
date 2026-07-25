import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import History from "./pages/History";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Navigate to="/upload" replace /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            onLoginSuccess={() => {
              window.location.href = "/upload";
            }}
          />
        }
      />

      <Route
        path="/register"
        element={
          <Register
            onRegisterSuccess={() => {
              window.location.href = "/login";
            }}
          />
        }
      />

      <Route
        path="/upload"
        element={
          token ? <Upload /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/history"
        element={
          token ? <History /> : <Navigate to="/login" replace />
        }
      />

      {/* Debug fallback */}
      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
    </Routes>
  );
}

export default App;