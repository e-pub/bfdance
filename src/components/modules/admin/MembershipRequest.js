import React, { useState } from "react";
import axios from "axios"; 
import "Assets/css/style-custom-25.css"; 

const GITHUB_API_BASE = "https://api.github.com/repos";
const GITHUB_REPO = "my-username/my-repo";  // 실제 GitHub 저장소 경로로 변경 (예: "john-doe/my-awesome-project")
const TOKEN = "ghp_xxxxxxx";  // GitHub Personal Access Token


const MembershipRequest = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "admin",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\d{3})-(\d{3,4})-(\d{4})$/;  // 010-XXX-XXXX 또는 010-XXXX-XXXX 형식 지원
  
    if (!formData.username) {
      alert("Username is required.");
      return false;
    }
    if (!emailPattern.test(formData.email)) {
      alert("Invalid email format.");
      return false;
    }
    if (!phonePattern.test(formData.phone)) {
      alert("Invalid phone number. Use the format 010-XXXX-XXXX.");
      return false;
    }
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );

      const pendingList = JSON.parse(atob(response.data.content));
      pendingList.push(formData);

      await axios.put(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        {
          message: "Add new pending request",
          content: btoa(JSON.stringify(pendingList, null, 2)),
          sha: response.data.sha,
        },
        { headers: { Authorization: `token ${TOKEN}` } }
      );

      alert("Your membership request has been submitted!");
      setFormData({ username: "", email: "", phone: "", role: "admin" });
    } catch (error) {
      console.error("Failed to submit request:", error);
      alert("Failed to submit your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={closePopup}>X</button>
        <h2>Membership Request</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              required
            />
          </label>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="specialMember">Special Member</option>
            </select>
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MembershipRequest;
