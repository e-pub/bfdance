import React, { useState } from "react";
import axios from "axios";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    contact: "",
    birthMonthYear: "",
    classInfo: "",
    startDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/membership-request", formData);
      alert("Membership request submitted!");
    } catch (error) {
      console.error("Failed to submit request:", error);
      alert("Failed to submit request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Membership Request</h3>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} required />
      <input type="tel" name="contact" placeholder="Contact" onChange={handleChange} required />
      <input type="text" name="birthMonthYear" placeholder="Birth Month/Year" onChange={handleChange} required />
      <input type="text" name="classInfo" placeholder="Class Information" onChange={handleChange} required />
      <input type="date" name="startDate" placeholder="Start Date" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MembershipForm;
