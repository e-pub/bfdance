import React, { useState } from "react";

function PasswordResetPopup({ closePopup }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("New Password:", password);
    alert("Password reset successful!");
    closePopup();
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordResetPopup;
