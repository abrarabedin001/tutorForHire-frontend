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
import TeacherCard from '~/components/TeacherCard';
import TeacherGrid from '~/components/TeacherGrid';

export default function LoginHome() {
  const [cookies, setCookie] = useCookies(['data']);
  const [tutors, setTutors] = React.useState([]);
  const [searchedCourses, setSearchedCourses] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const search = React.useRef('');
  React.useEffect(() => {
    console.log('cookies', cookies?.data?.user?.type);
    if (!cookies?.data?.user) {
      window.location.href = '/';
    }

    const fetchCourses = async () => {
      try {
        const link = 'http://localhost:5000/tutor/getall';
        const response = await axios.get(link, {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookies?.data?.token}`,
          },
        });
        console.log('kaj kore ki2?', response.data.data);
        console.log(
          'sanitixes:',
          response.data.data.map((teach) => ({
            id: teach.id,
            name: teach.user.name,
            email: teach.user.email,
            bio: teach.bio,
          })),
        );
        setTutors(
          response.data.data.map((teach) => ({
            id: teach.id,
            name: teach.user.name,
            email: teach.user.email,
            bio: teach.bio,
          })),
        );
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [cookies]);

  console.log('where are my tutors', tutors);
  return (
    <CookiesProvider>
      <Menu />
      <Container>
        <Box className="m-7 rounded bg-blue-400 p-7 shadow">
          <TeacherGrid tutors={tutors}></TeacherGrid>
        </Box>
      </Container>
      <Footer />
    </CookiesProvider>
  );
}
