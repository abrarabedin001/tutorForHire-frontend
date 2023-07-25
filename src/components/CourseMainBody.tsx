import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';

import * as React from 'react';

import Container from '@mui/material/Container';
import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { add } from 'date-fns';

const CourseImage = ({ title }) => {
  const imageStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://rb.gy/h90m3)', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  };
  const titleStyle = {
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '1.5rem', // Adjust the font size as needed
    padding: '20px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border:'2px dotted white',
    textTransform:'uppercase'

  };
  return (
    <div style={imageStyle}>
      <Typography variant="h5" component="h5" style={titleStyle}>
        {title}
      </Typography>
    </div>
  );
};

const CourseMainBody = ({
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
  return (
    // <Box className="w-70 flex-row space-y-2 ">
    <Box className={classes}>
      <Card className="m-3  p-3 shadow-lg ">
        <Grid container spacing={2} className="mt-5 bg-blue-100 p-3 shadow-lg">
          <Grid item xs={8}>
            <Typography className="px-10 py-5">{title}</Typography>
            <Divider />
            <Box className="flex gap-x-3 p-5">
              <Button variant="contained">Enroll</Button>
              <a href={'/course/edit/' + slug}>
                <Button variant="contained">Edit</Button>
              </a>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <CourseImage title={title} />
          </Grid>
        </Grid>
        <Card className="m-3 bg-blue-500 p-3 shadow-lg">
          <Typography variant="p" component="p">
            {' '}
            Course Name: {title}
          </Typography>
        </Card>
        <Card className="m-3 bg-blue-500 p-3 shadow-lg">
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
      </Card>
    </Box>
  );
};

export default CourseMainBody;
