import * as React from 'react';

import Box from '@mui/material/Box';

import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';

export default function LoginHome() {
  const [cookies, setCookie] = useCookies(['data']);
  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    console.log('cookies', cookies?.data?.user?.type);
    if (cookies?.data?.user?.type === 'STUDENT') {
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
      <Box sx={{ display: 'flex' }}>
        <HeaderSidebar>
          <Courses courses={courses}></Courses>
        </HeaderSidebar>
      </Box>
    </CookiesProvider>
  );
}
