// import * as React from 'react';

// import Box from '@mui/material/Box';

// import Courses from '~/components/Courses';
// import HeaderSidebar from '~/components/HeaderSidebar';
// import { CookiesProvider, useCookies } from 'react-cookie';
// import axios from 'axios';
// import Menu from '~/components/Menu';
// import Container from '@mui/material/Container';
// import Footer from '~/components/Footer';
// import TextField from '@mui/material/TextField';
// import { Button } from '@mui/material';

// export default function LoginHome() {
//   const [cookies, setCookie] = useCookies(['data']);
//   const [courses, setCourses] = React.useState([]);
//   const [searchedCourses, setSearchedCourses] = React.useState([]);
//   const [query, setQuery] = React.useState('');
//   const search = React.useRef('');
//   React.useEffect(() => {
//     console.log('cookies', cookies?.data?.user?.type);
//     if (!cookies?.data?.user) {
//       window.location.href = '/';
//     }

//     const fetchCourses = async () => {
//       try {
//         const link = 'http://localhost:5000/course/showcourse';
//         const response = await axios.get(link, {
//           headers: {
//             'content-type': 'application/json',
//             Authorization: `token ${cookies?.data?.token}`,
//           },
//         });
//         console.log('kaj kore ki?', response.data.courseshow);
//         setCourses(response.data.courseshow);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, [cookies]);

//   const searchCourse = async () => {
//     try {
//       const link =
//         'http://localhost:5000/course/SearchTutor/' +
//         router.asPath.split('course/SearchTutor/')[1];
//       console.log(search.current.value);
//       const response = await axios.get(
//         link,

//         {
//           headers: {
//             'content-type': 'application/json',
//             Authorization: `token ${cookies?.data?.token}`,
//           },
//         },
//       );
//       console.log('kaj kore ki?', response.data.coursedetails);

//       setSearchedCourses(response.data.coursedetails);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   console.log('where are my courses', courses);
//   return (
//     <CookiesProvider>
//       <Menu />
//       <Container>
//         <Box className="flex  w-full justify-center space-x-5 p-4">
//           <TextField
//             id="outlined-basic"
//             inputRef={search}
//             variant="filled"
//             size="small"
//             onChange={(e) => {
//               setQuery(e.target.value);
//             }}
//           />
//           <button
//             className="rounded bg-blue-800 p-2 text-white"
//             onClick={() => {
//               searchCourse();
//             }}
//           >
//             Searched courses
//           </button>
//           {/* <button
//             className="rounded bg-blue-800 p-3 text-white"
//             onClick={() => {
//               console.log(searchedCourses);
//             }}
//           >
//             Search
//           </button> */}
//         </Box>
//         {query == '' ? (
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               minHeight: '1000px',
//             }}
//           >
//             <Courses courses={courses}></Courses>
//           </Box>
//         ) : (
//           ' '
//         )}
//         {/* {query != '' ? (
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               minHeight: '1000px',
//             }}
//           >
//             <Courses courses={searchedCourses}></Courses>
//           </Box>
//         ) : (
//           ''
//         )} */}
//       </Container>
//       <Footer />
//     </CookiesProvider>
//   );
// }
