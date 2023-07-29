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
    if (!cookies?.data?.user) {
      window.location.href = '/';
    }

    const fetchCourses = async () => {
      try {
        const link = 'http://localhost:5000/course/showcourse';
        const response = await axios.get(link, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies?.data?.token}`,
          },
        });
        console.log('kaj kore ki?', response.data.courseshow);
        setCourses(response.data.courseshow);
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
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '1000px' }}
        >
          <Courses courses={courses}></Courses>
        </Box>
      </Container>
      <Footer />
    </CookiesProvider>
  );
}
