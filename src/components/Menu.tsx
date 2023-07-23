import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@mui/material/Button';

const LandingPage = () => {
  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
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
              <Link href="/" className="active">
                <Button color="inherit">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button color="inherit">Courses</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button color="inherit">Tutors</Button>
              </Link>
            </li>
            <li>
              <Link href="/">
                <Button color="inherit">About</Button>
              </Link>
            </li>
            <li>
              <Link href="/" className="active">
                <Button color="inherit">Contact</Button>
              </Link>
            </li>
          </ul>
          <div className="auth-buttons">
            <Button
              className="btn sign-in"
              variant="contained"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className="btn sign-up"
              variant="contained"
              color="primary"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Learn from the Best Tutors</h1>
            <p>
              Explore a wide range of courses taught by experts in their fields.
            </p>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
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
            <p>Join a diverse community of learners from around the world.</p>
          </div>
        </section>
        <section className="cta-section">
          <h2>Start Your Learning Journey Today</h2>
          <p>Sign up now and unlock a world of knowledge.</p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;