import React, { useState } from "react";
import axios from "axios";  // axios import 추가
import "Assets/css/style-custom-25.css";  // 경로 확인

const GITHUB_API_BASE = "https://api.github.com/repos";
const GITHUB_REPO = "your-username/your-repo";  // 자신의 GitHub 저장소 경로
const TOKEN = "YOUR_GITHUB_TOKEN";  // GitHub Personal Access Token

const MembershipRequest = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "admin",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setFormData({ username: "", email: "", role: "admin" });
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
