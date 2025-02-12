import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import MembershipRequest from "./components/modules/admin/MembershipRequest";
import AdminLogin from "./components/modules/admin/AdminLogin";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showMembershipPopup, setShowMembershipPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          onShowLogin={() => setShowLoginPopup(true)}
          onShowMembership={() => setShowMembershipPopup(true)}
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />

        {/* Login Popup */}
        {showLoginPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowLoginPopup(false)}>X</button>
              <AdminLogin setIsAdmin={setIsAdmin} closePopup={() => setShowLoginPopup(false)} />
            </div>
          </div>
        )}

        {/* Membership Request Popup */}
        {showMembershipPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowMembershipPopup(false)}>X</button>
              <MembershipRequest closePopup={() => setShowMembershipPopup(false)} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
