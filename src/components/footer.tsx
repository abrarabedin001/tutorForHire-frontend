import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaSkype, FaTiktok, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone } from 'react-icons/fi';
import { GiEarthAmerica } from 'react-icons/gi'; // Importing the Unicef icon
import { RiGroup2Line } from 'react-icons/ri'; // Importing the Association for Experiential Education icon
import { FaUniversity } from 'react-icons/fa'; // Correct import for the UNESCO icon
import { FaGraduationCap } from 'react-icons/fa'; // Correct import for the UNESCO icon


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Welcome to Tutor For Hire, where knowledge meets opportunity. We are committed to empowering learners with quality education and expert-led courses. Unlock your potential and explore new horizons with our diverse range of online learning offerings.
          </p>
        </div>
        <div className="footer-section">
          <h3>Subjects We Offer</h3>
          <ul>
            <li>Mathematics</li>
            <li>Science</li>
            <li>English</li>
            <li>History</li>
            <li>Computer Science</li>
            <li>Agriculture Science</li>
            <li>Robotic Science</li>
            <li>Medical Science</li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <FiMail className="contact-icon" />
              <span className="contact-text">Email: info@example.com</span>
            </p>
            <p>
              <FiPhone className="contact-icon" />
              <span className="contact-text">Phone: +088 01778097713</span>
            </p>
          </div>
        </div>
        <div className="footer-section partner-section">
          <h3>Partner</h3>
          <div className="partner-icons">
            <a href="https://www.unicef.org/" target="_blank" rel="noopener noreferrer">
              <GiEarthAmerica className="partner-icon" />
            </a>
            <a href="https://www.aee.org/" target="_blank" rel="noopener noreferrer">
              <RiGroup2Line className="partner-icon" />
            </a>
            <a href="https://www.universityofknowledge.com" target="_blank" rel="noopener noreferrer">
              <FaUniversity className="partner-icon" />
            </a>
            <a href="https://www.enlightenedscholarsacademy.edu" target="_blank" rel="noopener noreferrer">
              <FaGraduationCap className="partner-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="follow-us">
        <div className="footer-content">
          <h3>Follow Us</h3>
        </div>
        <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon" />
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="icon" />
            </a>
            <a href="https://www.skype.com" target="_blank" rel="noopener noreferrer">
              <FaSkype className="icon" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Tutor For Hire. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;