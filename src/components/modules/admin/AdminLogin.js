import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ setIsAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://your-lambda-api-url/admin-login", {
        username,
        password,
      });
      if (response.status === 200) {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
        alert("Logged in successfully!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid username or password!");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
