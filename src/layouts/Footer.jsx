import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.jpg"; // Adjust path if needed
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left: Logo Image */}
        <div className="footer-left">
          <img src={logo} alt="Boot's Buy Logo" className="footer-logo" />
        </div>

        {/* Center: Navigation Links */}
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right: Social Links */}
        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="icon" /> Facebook <span className="arrow">→</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="icon" /> Instagram <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Boot's Buy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
