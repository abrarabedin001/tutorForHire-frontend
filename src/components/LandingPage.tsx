import Link from 'next/link';

import React, { useState } from 'react';

// import './LandingPage.css';

const LandingPage = () => {
  const testimonialsData = [
    {
      id: 1,
      image: './images/course4.jpg',
      description: 'Testimonial 1',
    },
    {
      id: 2,
      image: './images/course4.jpg',
      description: 'Testimonial 2',
    },
    {
      id: 3,
      image: './images/course4.jpg',
      description: 'Testimonial 3',
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownX, setMouseDownX] = useState(null);
  const [testimonialPosition, setTestimonialPosition] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1,
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1,
    );
  };

  const handleMouseDown = (event) => {
    setMouseDown(true);
    setMouseDownX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (mouseDown) {
      const deltaX = event.clientX - mouseDownX;
      setTestimonialPosition(deltaX);
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setMouseDownX(null);
    setTestimonialPosition(0);
  };
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Courses</Link>
            </li>
            <li>
              <Link href="/">Tutors</Link>
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
              Explore a wide range of courses taught by experts in their fields.
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
            <p>Join a diverse community of learners from around the world.</p>
          </div>
        </section>
        <section className="cta-section">
          <h2>Start Your Learning Journey Today</h2>
          <p>Sign up now and unlock a world of knowledge.</p>
          <button className="btn">Sign Up</button>
        </section>
        <section className="testimonial-section">
          <h2>Testimonials</h2>
          <div
            className="testimonial-slider"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="testimonial-wrapper"
              style={{
                transform: `translateX(calc(${testimonialPosition}px - ${
                  activeTestimonial * 100
                }%))`,
                transition: mouseDown ? 'none' : 'transform 0.3s ease-in-out',
              }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`testimonial-item ${
                    index === activeTestimonial ? 'active' : ''
                  }`}
                >
                  <img src={testimonial.image} alt="Testimonial" />
                  <p>{testimonial.description}</p>
                </div>
              ))}
            </div>
            <div className="testimonial-controls">
              <button className="prev-button" onClick={handlePrevTestimonial}>
                &lt;
              </button>
              <button className="next-button" onClick={handleNextTestimonial}>
                &gt;
              </button>
            </div>
            <div className="testimonial-dots">
              {testimonialsData.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${
                    index === activeTestimonial ? 'active' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Tutor For Hire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
