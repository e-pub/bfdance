import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AdminModule = ({ isAdmin, setIsAdmin }) => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://your-lambda-api-url/admin-login", credentials, {
        withCredentials: true, // HttpOnly 쿠키 사용
      });
      
      if (response.data.success) {
        setIsAdmin(true);
        setLoginPopup(false);
      } else {
        alert("Login failed. Check credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div>
      {!isAdmin ? (
        <Button onClick={() => setLoginPopup(true)}>Admin Login</Button>
      ) : (
        <Button onClick={() => setIsAdmin(false)}>Logout</Button>
      )}
      {loginPopup && (
        <div className="login-popup">
          <div className="login-popup-content">
            <h3>Admin Login</h3>
            <label>Username</label>
            <input type="text" name="username" onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={() => setLoginPopup(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModule;
