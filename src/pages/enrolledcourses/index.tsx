// http://localhost:5000/enrollcourse/enrolledcourses
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';

import Box from '@mui/material/Box';

import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';
import Menu from '~/components/Menu';
import Container from '@mui/material/Container';
import Footer from '~/components/Footer';

export default function LoginHome() {
  const [cookies, setCookie] = useCookies(['data']);
  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    console.log('cookies', cookies?.data?.user?.type);
    if (cookies?.data?.user?.type === 'TEACHER') {
      window.location.href = '/';
    }

    const fetchCourses = async () => {
      try {
        const link = 'http://localhost:5000/enrollcourse/enrolledcourses';
        console.log('link', link);
        const response = await axios.get(link, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies?.data?.token}`,
          },
        });
        console.log('response', response.data.enrolledCourses);
        const courses = response.data.enrolledCourses.map(
          (course) => course['Course'],
        );
        console.log(courses);
        setCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [cookies]);

  console.log('where are my courses', courses);
  return (
    <CookiesProvider>
      <Menu />
      <Container>
        <Box sx={{ display: 'flex', minHeight: '1000px' }}>
          <Courses courses={courses}></Courses>
        </Box>
      </Container>
      <Footer />
    </CookiesProvider>
  );
}
