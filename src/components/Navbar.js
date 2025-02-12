import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "Assets/logo.png";
import { Link } from "react-router-dom";
import "Assets/css/style-custom-25.css"; // 스타일 정의

function NavBar({ isAdmin, setIsAdmin, onShowLogin, onShowMembership }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  useEffect(() => {
    function scrollHandler() {
      if (window.scrollY >= 20) {
        updateNavbar(true);
      } else {
        updateNavbar(false);
      }
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    alert("You have logged out.");
  };

  return (
    <Navbar expanded={expand} fixed="top" expand="md" className={navColour ? "sticky" : "navbar"}>
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* 항상 표시되는 메뉴 */}
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
            <Nav.Item>
              <Nav.Link href="https://example.com/blogs" target="_blank">Blogs</Nav.Link>
            </Nav.Item>

            {/* 조건부 메뉴: Admin 여부에 따라 다르게 표시 */}
            {!isAdmin ? (
              <>
                <Nav.Item>
                  <Nav.Link onClick={onShowLogin}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={onShowMembership}>Membership Request</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/dashboard">Admin Dashboard</Nav.Link>
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
