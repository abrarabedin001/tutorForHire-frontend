import Link from 'next/link';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box,Menu, MenuItem } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const LandingPage = () => {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const user = cookie?.data?.user;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };
  
  const handleProfileClick = () => {
    router.push('/showprofile');
    setAnchorEl(null); // Close the dropdown menu after clicking
  };

  const handleEditProfileClick = () => {
    router.push('/editprofile');
    setAnchorEl(null); // Close the dropdown menu after clicking
  };

  const isLinkActive = (route) => {
    return router.pathname === route ? 'active' : '';
  };

  return (
    <header className="header mb-5">
      <nav className="  flex  justify-between align-middle">
        <Link
          className="logo m-5 inline-block align-middle opacity-100"
          href="/"
        >
          Tutor For Hire
        </Link>
        {user && (
          <ul className="nav-links m-5 flex justify-center text-center">
            <li>
              <Link
                href="/home"
                aria-current="page"
                className={isLinkActive('/home')}
              >
                <Button color="inherit">Home</Button>
              </Link>
            </li>

            {user?.type === 'TEACHER' && (
              <li>
                <Link href="/mycourses" className={isLinkActive('/mycourses')}>
                  <Button color="inherit">My Courses</Button>
                </Link>
              </li>
            )}
            {user?.type === 'TEACHER' && (
              <li>
                <Link
                  href="/createcourse"
                  className={isLinkActive('/createcourse')}
                >
                  <Button color="inherit">Create Course</Button>
                </Link>
              </li>
            )}
            {user?.type === 'STUDENT' && (
              <li>
                <Link
                  href="/enrolledcourses"
                  className={isLinkActive('/enrolledcourses')}
                >
                  <Button color="inherit">Enrolled Course</Button>
                </Link>
              </li>
            )}

            {/* <li>
              <Link
                href="/editprofile"
                className={isLinkActive('/editprofile')}
              >
                <Button color="inherit">Edit Profile</Button>
              </Link>
            </li> */}

            <li>
              <Link href="#about" className={isLinkActive('#about')}>
                <Button color="inherit">About</Button>
              </Link>
            </li>
          </ul>
        )}

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
                // disabled
                className="name"
                style={{ color: anchorEl ? 'red' : 'black', boxShadow: 'none' }}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                {user?.name}
                {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                keepMounted
              >
                <MenuItem  onClick={handleProfileClick} className='center-text'>Profile</MenuItem>
                <MenuItem onClick={handleEditProfileClick} className='center-text'>Edit Profile</MenuItem>
              </Menu>
    
              <Button
                className="text-black"
                color="inherit"
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
