import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';

import * as React from 'react';

import Container from '@mui/material/Container';
import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { add } from 'date-fns';
import TeacherCard from './TeacherCard';
import { useCookies, CookiesProvider } from 'react-cookie';
import axios from 'axios';

const CourseMainBody = ({
  id,
  slug,
  title,
  description,
  categories,
  seatStatus,
  address,
  endDate,
  cookies,
  classes,
}: {
  id: string;
  slug: string;
  title: string;
  description: string;
  categories: string;
  seatStatus: number;
  address: string;
  endDate: Date;
  cookies: Date;
  classes: string;
}) => {
  const data = useCookies(['data']);
  const cookie = data[0].data;
  const enrollCourse = async () => {
    try {
      const link = 'http://localhost:5000/enrollcourse/enroll';
      console.log(id, 'course');
      console.log(cookie.user.id, 'studentProfileId');
      const user = await axios.post(
        link,
        {
          courseId: id,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `token ${cookie.token}`,
          },
        },
      );
      console.log(user);
      // await router.push('/home');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    // <Box className="w-70 flex-row space-y-2 ">
    <Box className={classes}>
      <Card className="m-3  flex flex-col justify-center p-3 shadow-lg ">
        <Grid container spacing={2} className="mt-5 bg-blue-100 p-3 shadow-lg">
          <Grid item xs={8}>
            <Typography className="px-10 py-5">{title}</Typography>
            <Divider />
            <Box className="flex gap-x-3 p-5">
              <Button variant="contained" onClick={enrollCourse}>
                Enroll
              </Button>
              <a href={'/course/edit/' + slug}>
                <Button variant="contained">Edit</Button>
              </a>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <img
              src="https://placehold.co/400x200"
              alt="just a photo"
              loading="lazy"
            />
          </Grid>
        </Grid>
        <Card className="m-3 bg-blue-500 p-3 shadow-lg">
          <Typography variant="p" component="p">
            {' '}
            Course Name: {title}
          </Typography>
        </Card>
        <Box className="flex justify-center">
          <Card className="m-3  w-[70%]  bg-blue-500 p-3 shadow-lg">
            <Typography variant="p" component="p">
              {'Description: '}
              {description}
            </Typography>
            <Typography variant="p" component="p">
              {' '}
              {address}
            </Typography>
            <Typography variant="p" component="p">
              {' '}
              {seatStatus}
            </Typography>
            <Typography variant="p" component="p">
              {' '}
              {categories}
            </Typography>
            <Typography variant="p" component="p">
              {' '}
              {endDate}
            </Typography>
          </Card>
          <TeacherCard className="w-[30%] " />
        </Box>
      </Card>
    </Box>
  );
};

export default CourseMainBody;
