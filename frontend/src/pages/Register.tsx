
import { useState } from "react";
import axios from "axios";

interface RegisterProps {
  onRegisterSuccess: () => void;
}

export default function Register({
  onRegisterSuccess,
}: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
  "https://hiresense-ai-yjuo.onrender.com/auth/signup",
  {
      full_name: name,
      email,
      password,
  }
);

      alert("Registration successful!");

      onRegisterSuccess();

    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Register
        </button>

      </div>

    </div>
  );
}