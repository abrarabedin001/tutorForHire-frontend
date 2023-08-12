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
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function LoginHome() {
  const [cookies, setCookie] = useCookies(['data']);
  const [courses, setCourses] = React.useState([]);
  const [searchedCourses, setSearchedCourses] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const search = React.useRef('');
  React.useEffect(() => {

    console.log('cookies', cookies?.data?.user?.type);
    // if (!cookies?.data?.user) {
    //   window.location.href = '/';
    // }

    const fetchCourses = async () => {
      try {
        const link = 'http://localhost:5000/course/showcourse';
        const response = await axios.get(link, {
          // headers: {
          //   'content-type': 'application/json',
          //   Authorization: `token ${cookies?.data?.token}`,
          // },
        });
        console.log('kaj kore ki?', response.data.courseshow);
        console.log(response.data.courseshow);
        setCourses(response.data.courseshow);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [cookies]);

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
      <Box className="flex justify-center space-x-2 p-4">
          <TextField
            id="outlined-basic"
            inputRef={search}
            // variant="filled"
            placeholder="Search"
            size="small"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            style={{ backgroundColor: "white",border:"1px",borderRadius:"8px",width:"300px" }} // Set the background color of the TextField
          />
          <IconButton
            onClick={() => {
              searchCourse();
            }}
            style={{ backgroundColor: "#327BE9",border:"1px",borderRadius:"8px" }} // Set the background color of the IconButton
          >
            <SearchIcon style={{ color: "white" }} /> {/* Assuming you have an icon named SearchIcon */}
          </IconButton>
        </Box>
        {query == '' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '1000px',
            }}
          >
            <Courses courses={courses}></Courses>
          </Box>
        ) : (
          ' '
        )}
        {query != '' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '1000px',
            }}
          >
            <Courses courses={searchedCourses}></Courses>
          </Box>
        ) : (
          ''
        )}
      </Container>
      <Footer />
    </CookiesProvider>
  );
}
