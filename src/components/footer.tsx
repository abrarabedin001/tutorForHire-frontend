import React from 'react';

const footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus mauris
            non urna finibus, sit amet bibendum justo blandit. Duis eu enim bibendum,
            eleifend nisl a, mattis sapien.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Email: info@example.com
            <br />
            Phone: +1234567890
          </p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default footer;