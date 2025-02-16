import React, { useState } from "react";

function AdminAuthPopup({ setIsAdmin, closePopup }) {
  const [formData, setFormData] = useState({ username: "", phone: "", password: "" });
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = () => {
    // 임시 검증 로직 (실제 API 연동 필요)
    console.log("Form Data:", formData);
    console.log("Verification Code:", verificationCode);

    if (verificationCode === "1234") {
      alert("Verification successful!");
      setIsAdmin(true);
      closePopup();
    } else {
      alert("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Admin Authentication</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Verification Code:
            <input
              type="text"
              name="verificationCode"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </label>
          <button type="button" onClick={handleVerify}>
            Verify
          </button>
        </form>
        <button onClick={closePopup} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default AdminAuthPopup;
