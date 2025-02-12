import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const AdminModule = ({ isAdmin, setIsAdmin }) => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const ADMIN_CREDENTIALS = { username: "admin", password: "password123" }; // 관리자 계정

  const handleLogin = () => {
    const { username, password } = credentials;
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      setLoginPopup(false);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.setItem("isAdmin", "false");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {!isAdmin ? (
        <Button onClick={() => setLoginPopup(true)}>Admin Login</Button>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}

      {loginPopup && (
        <div className="login-popup">
          <div className="login-popup-content">
            <h3>Admin Login</h3>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={() => setLoginPopup(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModule;
