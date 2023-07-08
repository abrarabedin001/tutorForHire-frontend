import Link from 'next/link';
import React from 'react';

// import './LandingPage.css';
import img1 from '~/images/course4.jpg';

const LandingPage = () => {


  const handleSignIn = () => {
    window.location.href = "/login";
  };

  const handleSignUp = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="landing-page">
      <header className="header">
        <nav className="navbar">
          <Link className="logo" href="/">
            Tutor For Hire
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/course">Courses</Link>
            </li>
            <li>
              <Link href="/tutor">Tutors</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
          <div className="auth-buttons">
            <button className="btn sign-in" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="btn sign-up" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Learn from the Best Tutors</h1>
            <p>
              Explore Link wide range of courses taught by experts in their
              fields.
            </p>
            <button className="btn">Get Started</button>
          </div>
          <div className="course-card">
            <img src="./images/course4.jpg" alt="" />
          </div>
        </section>
        <section className="features-section">
          <h2>Why Choose Tutor For Hire?</h2>
          <div className="feature">
            <i className="fas fa-chalkboard-teacher"></i>
            <h3>Expert Tutors</h3>
            <p>
              Learn from experienced tutors who are passionate about teaching.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-certificate"></i>
            <h3>Certificates</h3>
            <p>
              Earn certificates upon completion to showcase your achievements.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-globe"></i>
            <h3>Global Community</h3>
            <p>
              Join Link diverse community of learners from around the world.
            </p>
          </div>
        </section>
        <section className="cta-section">
          <h2>Start Your Learning Journey Today</h2>
          <p>Sign up now and unlock Link world of knowledge.</p>
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
