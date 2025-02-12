import React, { useState, useEffect } from "react";
import axios from "axios";  // GitHub API 호출용 라이브러리

const GITHUB_API_BASE = "https://api.github.com/repos";
const GITHUB_REPO = "your-username/your-repo";  // 자신의 GitHub 저장소 경로
const TOKEN = "YOUR_GITHUB_TOKEN";  // GitHub Personal Access Token

const AdminDashboard = () => {
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    fetchPendingList();
  }, []);

  const fetchPendingList = async () => {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        {
          headers: { Authorization: `token ${TOKEN}` }
        }
      );
      const data = JSON.parse(atob(response.data.content));  // Base64 디코딩
      setPendingList(data);
    } catch (error) {
      console.error("Failed to fetch pending list:", error);
    }
  };

  const approveUser = async (user) => {
    try {
      console.log("Approving user:", user);
      
      // AdminList.json 가져오기
      const AdminListResponse = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/AdminList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const AdminList = JSON.parse(atob(AdminListResponse.data.content));
      AdminList.push(user);  // 사용자 추가
  
      // AdminList.json 업데이트
      await updateGitHubFile(
        "data/AdminList.json",
        AdminList,
        AdminListResponse.data.sha
      );
  
      // pendingList.json 가져오기
      const pendingListResponse = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const updatedPendingList = pendingList.filter(
        (pendingUser) => pendingUser.username !== user.username
      );
      setPendingList(updatedPendingList);
  
      // pendingList.json 업데이트
      await updateGitHubFile(
        "data/pendingList.json",
        updatedPendingList,
        pendingListResponse.data.sha
      );
  
      alert(`${user.username} has been approved!`);
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };
  

  const rejectUser = async (username) => {
    try {
      console.log("Rejecting user:", username);
      const updatedPendingList = pendingList.filter(
        (user) => user.username !== username
      );
      setPendingList(updatedPendingList);

      // pendingList.json 업데이트
      const response = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/pendingList.json`,
        {
          headers: { Authorization: `token ${TOKEN}` }
        }
      );
      await updateGitHubFile(
        "data/pendingList.json",
        updatedPendingList,
        response.data.sha
      );

      alert(`${username} has been rejected.`);
    } catch (error) {
      console.error("Failed to reject user:", error);
    }
  };

  const updateGitHubFile = async (filePath, content, sha) => {
    try {
      const response = await axios.put(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/${filePath}`,
        {
          message: `Update ${filePath}`,
          content: btoa(JSON.stringify(content, null, 2)),  // Base64 인코딩
          sha
        },
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      console.log(`Updated ${filePath}:`, response);
    } catch (error) {
      console.error(`Failed to update ${filePath}:`, error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Pending Approvals</h3>
      {pendingList.length > 0 ? (
        <ul>
          {pendingList.map((user, index) => (
            <li key={index}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => approveUser(user)}>Approve</button>
              <button onClick={() => rejectUser(user.username)}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending approvals.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
