import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import navLogo from "./assets/images/BCR2.png";
import "./CSS/CssStyles.css";
import "./CSS/CustomDropdown.css";

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <div className="background">
        <Navbar
          collapseOnSelect
          fixed="top"
          expand="lg"
          bg="light"
          variant="dark"
        >
          <Container fluid className="navbar-container">
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center"
            >
              <img
                src={navLogo}
                height="100"
                width="150"
                alt="Your Logo"
                className="navbar-logo ml-auto"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <div
                  className="custom-dropdown"
                  onMouseEnter={toggleDropdown}
                  onMouseLeave={toggleDropdown}
                >
                  <a href="#" onClick={toggleDropdown} className="bold-white">
                    Programs & Courses
                  </a>
                  {showDropdown && (
                    <div className="custom-dropdown-content">
                      <Link to="/programs">Software Development(SD)</Link>
                      <Link to="/program-2">Program 2</Link>
                    </div>
                  )}
                </div>
                <Nav.Link href="/aboutus" className="bold-white">
                  About Us
                </Nav.Link>
                <Nav.Link
                  style={{ float: "right" }}
                  href="/login-option"
                  className="bold-white ml-auto"
                >
                  Login to Portal <span style={{ color: "dark" }}>⏎</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
export default Navigation;
