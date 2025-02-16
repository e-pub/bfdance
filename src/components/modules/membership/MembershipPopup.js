import React, { useState } from "react";

function MembershipPopup({ closePopup }) {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    className: "",
    startDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with actual API call to send membership request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
      alert("Membership request submitted! Please wait for admin approval.");
      closePopup();
    } catch (error) {
      console.error("Error submitting membership request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Membership Request</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="010-XXXX-XXXX"
              required
            />
          </label>
          <label>
            Class Name:
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default MembershipPopup;
