import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "Assets/logo.png";
import { Link } from "react-router-dom";
import "Assets/css/style-custom-25.css"; // 스타일 정의

function NavBar({ isAdmin, isMember, setIsAdmin, setIsMember, onShowAdminPopup, onShowMembershipPopup }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      updateNavbar(window.scrollY >= 20);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleLogout = () => {
    setIsAdmin(false);
    setIsMember(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isMember");
    alert("You have logged out.");
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
            ) : isAdmin ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/calendar-management">Calendar Management</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/member-board">Member Board</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/profile-settings">Profile Settings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/member-board">Member Board</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/profile-settings">Profile Settings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
