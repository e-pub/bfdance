import React, { useState } from "react";
import axios from "axios";

const SmsVerification = ({ nextStep }) => {
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://your-lambda-url/sms-verification", { code });
      if (response.data.message === "인증 성공") {
        nextStep();
      }
    } catch (error) {
      alert("인증 실패. 다시 시도하세요.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>SMS Verification</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Code" value={code} onChange={(e) => setCode(e.target.value)} required />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default SmsVerification;
