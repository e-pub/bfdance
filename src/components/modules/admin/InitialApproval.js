import React, { useState } from "react";
import axios from "axios";

const InitialApproval = ({ nextStep }) => {
  const [formData, setFormData] = useState({ username: "", phone: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://your-lambda-url/initial-approval", formData);
      if (response.data.message === "초기 승인 성공") {
        nextStep();
      }
    } catch (error) {
      alert("초기 승인 실패. 다시 시도하세요.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Initial Approval</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default InitialApproval;
