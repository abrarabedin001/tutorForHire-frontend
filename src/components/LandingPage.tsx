import React from 'react';
import './LandingPage.css';
import img1 from './images/course4.jpg'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <nav className="navbar">
          <a className="logo" href="/">Tutor For Hire</a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/">Courses</a></li>
            <li><a href="/">Tutors</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
          <div className="auth-buttons">
            <button className="btn sign-in">Sign In</button>
            <button className="btn sign-up">Sign Up</button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Learn from the Best Tutors</h1>
            <p>Explore a wide range of courses taught by experts in their fields.</p>
            <button className="btn">Get Started</button>
          </div>
          <div className="course-card">
            <img src={img1} alt=""/>
          </div>
        </section>
        <section className="features-section">
          <h2>Why Choose Tutor For Hire?</h2>
          <div className="feature">
            <i className="fas fa-chalkboard-teacher"></i>
            <h3>Expert Tutors</h3>
            <p>Learn from experienced tutors who are passionate about teaching.</p>
          </div>
          <div className="feature">
            <i className="fas fa-certificate"></i>
            <h3>Certificates</h3>
            <p>Earn certificates upon completion to showcase your achievements.</p>
          </div>
          <div className="feature">
            <i className="fas fa-globe"></i>
            <h3>Global Community</h3>
            <p>Join a diverse community of learners from around the world.</p>
          </div>
        </section>
        <section className="cta-section">
          <h2>Start Your Learning Journey Today</h2>
          <p>Sign up now and unlock a world of knowledge.</p>
          <button className="btn">Sign Up</button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Tutor For Hire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;