import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* About / Address */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <p>123 Commerce St,<br /> Suite 100,<br /> Mumbai, Maharashtra, India - 400001</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: support@myshop.com</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
              <li><a href="/terms" className="text-white text-decoration-none">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaLinkedinIn />
              </a>
              <a href="mailto:support@myshop.com" className="text-white fs-4">
                <FaEnvelope />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">
          &copy; {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
