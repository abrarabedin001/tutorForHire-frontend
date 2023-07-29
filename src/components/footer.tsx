import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaSkype,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer block">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Welcome to Tutor For Hire, where knowledge meets opportunity. We are
            committed to empowering learners with quality education and
            expert-led courses. Unlock your potential and explore new horizons
            with our diverse range of online learning offerings.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Email: info@example.com
            <br />
            Phone: +088 01778097713
          </p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="icon" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="icon" />
            </a>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="icon" />
            </a>
            <a
              href="https://www.skype.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSkype className="icon" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="icon" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="icon" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="icon" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Tutor For Hire. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
