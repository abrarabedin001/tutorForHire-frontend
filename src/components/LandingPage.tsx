import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '~/components/Menu';
import DemoCourseSection from '~/components/DemoCourseSection';
import InfiniteImageRotation from '~/components/InfiniteImageRotation';
import Footer from '~/components/Footer';

const LandingPage = () => {
  const testimonialsData = [
    {
      id: 1,
      image: './images/img2.png',
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
      prev === 0 ? testimonialsData.length - 1 : prev - 1,
    );
    setActiveDot((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1,
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1,
    );
    setActiveDot((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1,
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
      <main className="main-content">
        <section className="hero-section flex flex-row rounded-sm bg-gray-200/80  p-5  shadow-md">
          <div className="hero-content w-1/2 rounded bg-white p-5 text-black  shadow-md">
            <h1>Learn from the Best Tutors</h1>
            <p>
              Explore a wide range of courses taught by experts in their fields.
            </p>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </div>
          <InfiniteImageRotation className="z-50 w-1/2  rounded shadow-md" />
        </section>
        <section className="features-section flex flex-col rounded-sm bg-gray-200/80 p-5  shadow-md">
          <h1 className="m-2 text-center text-2xl font-bold ">
            Why Choose Tutor For Hire?
          </h1>
          <div className="flex flex-row justify-between space-x-5 p-5 ">
            <div className="feature min-w-[30%] bg-white text-black shadow-md">
              <i className="fas fa-chalkboard-teacher"></i>
              <h3 className="text-2xl font-bold">Expert Tutors</h3>
              <p>
                Learn from experienced tutors who are passionate about teaching.
              </p>
            </div>
            <div className="feature min-w-[30%] bg-white text-black  shadow-md">
              <i className="fas fa-certificate"></i>
              <h3 className="text-2xl font-bold">Certificates</h3>
              <p>
                Earn certificates upon completion to showcase your achievements.
              </p>
            </div>
            <div className="feature min-w-[30%] bg-white text-black shadow-md">
              <i className="fas fa-globe"></i>
              <h3 className="text-2xl font-bold">Global Community</h3>
              <p>Join a diverse community of learners from around the world.</p>
            </div>
          </div>
        </section>

        <section className="testimonial-section rounded-sm bg-gray-200/80 p-5  shadow-md">
          <div className="testimonial-slider">
            <DemoCourseSection />
          </div>
        </section>
        <section className="cta-section rounded-sm bg-gray-200/80 p-5  shadow-md">
          <div className="rounded-md  p-5">
            <h2 className="text-2xl font-bold">
              Start Your Learning Journey Today
            </h2>
            <p>Sign up now and unlock a world of knowledge.</p>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
