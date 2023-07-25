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
    <header className="header bg-white ">
      <nav className="  flex  justify-between">
        <Link className="logo inline-block align-middle" href="/">
          Tutor For Hire
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/home" className="active">
              <Button color="inherit">Home</Button>
            </Link>
          </li>

          <li>
            <Link href="/createcourse">
              <Button color="inherit">Create Course</Button>
            </Link>
          </li>
          <li>
            <Link href="/enrolledcourses">
              <Button color="inherit">Enrolled Course</Button>
            </Link>
          </li>
        </ul>
        <Box className="auth-buttons">
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
                disabled
                className="text-black"
                style={{ color: 'black' }}
              >
                {user?.name}
              </Button>
              <Button
                className="text-black"
                style={{ color: 'black' }}
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
            <Button
              className="btn sign-in"
              // variant="contained"
              color="inherit"
              onClick={handleSignIn}
            >
              Log in
            </Button>
          )}
        </Box>
      </nav>
    </header>
  );
};

export default LandingPage;
