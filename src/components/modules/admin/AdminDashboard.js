import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingList();
  }, []);

  const fetchPendingList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://your-lambda-api-url/pending-list");
      setPendingList(response.data);
    } catch (error) {
      console.error("Failed to fetch pending list:", error);
      alert("Failed to load pending approvals.");
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (user) => {
    try {
      await axios.post("https://your-lambda-api-url/approve-user", { user });
      alert(`${user.username} has been approved!`);
      setPendingList((prev) => prev.filter((u) => u.username !== user.username));
    } catch (error) {
      console.error("Failed to approve user:", error);
      alert("An error occurred while approving the user.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Pending Approvals</h3>
      {loading ? (
        <p>Loading...</p>
      ) : pendingList.length > 0 ? (
        <ul>
          {pendingList.map((user) => (
            <li key={user.username}>
              <p>{user.username} - {user.email}</p>
              <button onClick={() => approveUser(user)}>Approve</button>
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
