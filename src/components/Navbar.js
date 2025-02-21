import React, { useState, useEffect, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "Assets/logo.png";
import { Link } from "react-router-dom";
import "Assets/css/style-custom-25.css";
import axios from "axios";
import AuthContext from "../context/AuthContext"; // ✅ default import

function NavBar({ onShowAdminPopup, onShowMembershipPopup }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { isAdmin, isMember, setIsAdmin, setIsMember } = useContext(AuthContext);

  useEffect(() => {
    function scrollHandler() {
      updateNavbar(window.scrollY >= 20);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://your-lambda-api-url/logout", {}, { withCredentials: true });
      setIsAdmin(false);
      setIsMember(false);
      alert("You have logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <Navbar expanded={expand} fixed="top" expand="md" className={navColour ? "sticky" : "navbar"}>
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => updateExpanded(!expand)}>
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/project">Projects</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/resume">Resume</Nav.Link>
            </Nav.Item>

            {!isAdmin && !isMember ? (
              <>
                <Nav.Item>
                  <Nav.Link onClick={onShowAdminPopup}>Admin Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={onShowMembershipPopup}>Membership</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
