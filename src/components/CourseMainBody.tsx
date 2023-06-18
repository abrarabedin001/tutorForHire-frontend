import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';

import * as React from 'react';

import Container from '@mui/material/Container';
import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';

export default function CourseMainBody() {
  return (
    <Container maxWidth="lg">
      <Box className="w-70 flex-row space-y-2">
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography className="px-10 py-5">CSE471</Typography>
              <Divider />
              <Box className="p-5">
                <Button variant="contained">Enroll</Button>
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
        </Card>
        <Card>
          <Typography variant="h1" component="h2">
            {' '}
            Course Name
          </Typography>
          <Typography variant="h3" component="h3">
            {' '}
            Course Name
          </Typography>
        </Card>
        <Card>
          <Typography variant="h4" component="h4">
            {' '}
            Course Detail
          </Typography>
        </Card>
      </Box>
    </Container>
  );
}
