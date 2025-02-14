import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // 팝업 스타일

const GITHUB_API_BASE = "https://api.github.com/repos";
const GITHUB_REPO = "your-username/your-repo"; // 실제 GitHub 저장소 경로
const TOKEN = "YOUR_GITHUB_TOKEN"; // GitHub Personal Access Token

const AdminDashboard = () => {
  const [pendingList, setPendingList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingList();
  }, []);

  const fetchPendingList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const data = JSON.parse(atob(response.data.content));
      setPendingList(data);
    } catch (error) {
      console.error("Failed to fetch pending list:", error.response || error);
      alert("Failed to load pending approvals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateGitHubFile = async (filePath, content, sha) => {
    try {
      await axios.put(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/${filePath}`,
        {
          message: `Update ${filePath}`,
          content: btoa(JSON.stringify(content, null, 2)),
          sha: sha,
        },
        { headers: { Authorization: `token ${TOKEN}` } }
      );
    } catch (error) {
      console.error(`Failed to update ${filePath}:`, error.response || error);
      throw new Error("Failed to update file");
    }
  };

  const approveUser = async (user) => {
    try {
      const AdminListResponse = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/AdminList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const AdminList = JSON.parse(atob(AdminListResponse.data.content));
      AdminList.push(user);

      await updateGitHubFile("data/AdminList.json", AdminList, AdminListResponse.data.sha);

      const pendingListResponse = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const updatedPendingList = pendingList.filter((pendingUser) => pendingUser.username !== user.username);
      setPendingList(updatedPendingList);

      await updateGitHubFile("data/pendingList.json", updatedPendingList, pendingListResponse.data.sha);

      alert(`${user.username} has been approved!`);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to approve user:", error.response || error);
      alert("An error occurred while approving the user. Please try again.");
    }
  };

  const rejectUser = async (username) => {
    try {
      const pendingListResponse = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const updatedPendingList = pendingList.filter((user) => user.username !== username);
      setPendingList(updatedPendingList);

      await updateGitHubFile("data/pendingList.json", updatedPendingList, pendingListResponse.data.sha);

      alert(`${username} has been rejected.`);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to reject user:", error.response || error);
      alert("An error occurred while rejecting the user. Please try again.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Pending Approvals</h3>

      {loading ? (
        <p>Loading pending approvals...</p>
      ) : pendingList.length > 0 ? (
        <ul>
          {pendingList.map((user, index) => (
            <li key={index}>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <button onClick={() => setSelectedUser(user)}>View Details</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending approvals.</p>
      )}

      {/* 팝업 창 */}
      {selectedUser && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Membership Request Details</h3>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <button onClick={() => approveUser(selectedUser)}>Approve</button>
            <button onClick={() => rejectUser(selectedUser.username)}>Reject</button>
            <button className="close-btn" onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
