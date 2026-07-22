import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/upload" /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            <Login onLoginSuccess={() => (window.location.href = "/upload")} />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              onRegisterSuccess={() => (window.location.href = "/login")}
            />
          }
        />

        <Route
          path="/upload"
          element={token ? <Upload /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;