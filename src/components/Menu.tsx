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
  );
};

export default LandingPage;
