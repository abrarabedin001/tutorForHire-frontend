import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@mui/material/Button';

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
  const [activeDot, setActiveDot] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
    setActiveDot((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
    setActiveDot((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
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
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </section>
        <section className="testimonial-section">
          <h2>Testimonials</h2>
          <div className="testimonial-slider">
            <div
              className="testimonial-wrapper"
              style={{
                transform: `translateX(-${activeTestimonial * 100}%)`,
                transition: 'transform 0.3s ease-in-out',
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
              <Button
                className={`prev-button ${
                  activeTestimonial === 0 ? 'disabled' : ''
                }`}
                onClick={handlePrevTestimonial}
                sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
              >
                &lt;
              </Button>
              <Button
                className={`next-button ${
                  activeTestimonial === testimonialsData.length - 1
                    ? 'disabled'
                    : ''
                }`}
                onClick={handleNextTestimonial}
                sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
              >
                &gt;
              </Button>
            </div>
            <div className="testimonial-dots">
              {testimonialsData.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === activeDot ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTestimonial(index);
                    setActiveDot(index);
                  }}
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