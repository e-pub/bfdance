import React, { useState } from "react";
import axios from "axios";

const PasswordReset = ({ closePopup, username }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.get(`https://api.github.com/repos/your-username/your-repo/contents/data/adminList.json`, {
        headers: { Authorization: `token YOUR_GITHUB_TOKEN` }
      });
      const adminList = JSON.parse(atob(response.data.content));
      const updatedAdminList = adminList.map((admin) =>
        admin.username === username ? { ...admin, password: password } : admin
      );

      await axios.put(
        `https://api.github.com/repos/your-username/your-repo/contents/data/adminList.json`,
        {
          message: "Password reset for admin",
          content: btoa(JSON.stringify(updatedAdminList, null, 2)),
          sha: response.data.sha
        },
        { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } }
      );

      alert("Password reset successfully!");
      closePopup();
    } catch (error) {
      console.error("Failed to reset password:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Reset Your Password</h2>
        <form onSubmit={handlePasswordReset}>
          <label>
            New Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Reset Password"}
          </button>
        </form>
        <button onClick={closePopup} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default PasswordReset;
