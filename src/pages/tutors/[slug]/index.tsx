import * as React from 'react';

import Box from '@mui/material/Box';

import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';
import Menu from '~/components/Menu';
import Container from '@mui/material/Container';
import Footer from '~/components/Footer';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ro } from 'date-fns/locale';
import { useRouter } from 'next/router';

export default function LoginHome() {
  const [cookies, setCookie] = useCookies(['data']);
  const [courses, setCourses] = React.useState([]);
  const [searchedCourses, setSearchedCourses] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const search = React.useRef('');
  const router = useRouter();

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!router.isReady) return;
        console.log('router', router.query.slug);
        const link =
          'http://localhost:5000/tutor/searchtutor/' + router.query.slug;
        console.log('link', link);
        const response = await axios.get(link, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies?.data?.token}`,
          },
        });
        console.log('Teachers course?', response.data.data);
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [router.isReady]);

  const searchCourse = async () => {
    try {
      const link =
        'http://localhost:5000/course/categories/' + search.current.value;
      console.log(search.current.value);
      const response = await axios.get(
        link,

        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies?.data?.token}`,
          },
        },
      );
      console.log('kaj kore ki?', response.data.coursedetails);

      setSearchedCourses(response.data.coursedetails);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  console.log('where are my courses', courses);
  return (
    <CookiesProvider>
      <Menu />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '1000px',
          }}
        >
          <Courses courses={courses}></Courses>
        </Box>
      </Container>
      <Footer />
    </CookiesProvider>
  );
}
