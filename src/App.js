import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import AdminAuthPopup from "./components/modules/admin/AdminAuthPopup";
import MembershipForm from "./components/modules/membership/MembershipForm";
import MemberBoard from "./components/modules/membership/MemberBoard";
import DirectUploadCalendar from "./components/modules/calendar/DirectUploadCalendar";
import InstagramCalendar from "./components/modules/calendar/InstagramCalendar";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, setLoad] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [isMember, setIsMember] = useState(() => localStorage.getItem("isMember") === "true");
  const [popupType, setPopupType] = useState(""); // "admin" or "membership"

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setPopupType("");

  return (
    <Router>
      <Preloader load={load} />
      <div className={`App ${load ? "no-scroll" : "scroll"}`}>
        <Navbar
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          isMember={isMember}
          setIsMember={setIsMember}
          onShowAdminPopup={() => setPopupType("admin")}
          onShowMembershipPopup={() => setPopupType("membership")}
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route
            path="/member-board"
            element={
              isMember ? (
                <MemberBoard />
              ) : (
                <p style={{ textAlign: "center", marginTop: "50px" }}>Please login to access the member board.</p>
              )
            }
          />
          <Route path="/direct-upload-calendar" element={<DirectUploadCalendar isAdmin={isAdmin} />} />
          <Route path="/instagram-calendar" element={<InstagramCalendar />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />

        {/* Admin 인증 팝업 */}
        {popupType === "admin" && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                X
              </button>
              <AdminAuthPopup setIsAdmin={setIsAdmin} closePopup={closePopup} />
            </div>
          </div>
        )}

        {/* Membership 등록 팝업 */}
        {popupType === "membership" && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                X
              </button>
              <MembershipForm closePopup={closePopup} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
