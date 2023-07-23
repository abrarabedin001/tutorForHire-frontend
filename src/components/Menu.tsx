import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const user = cookie?.data?.user;
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
            <Link href="/home" className="active">
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
          {user ? (
            <Box
              m={1}
              //margin
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              className="w-full"
            >
              <Button
                className="text-white"
                style={{ color: 'white' }}
                onClick={() => {
                  removeCookie('data', '/');
                  removeCookie('token', '/');
                  router.push('/login');
                }}
              >
                Log Out
              </Button>
            </Box>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LandingPage;