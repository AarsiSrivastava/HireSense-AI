import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
    "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.access_token);

alert("Login successful!");

onLoginSuccess();

navigate("/upload");

    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-6"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}