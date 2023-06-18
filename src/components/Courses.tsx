import { Grid } from '@mui/material';
import CourseCard from './CourseCard';

const Courses = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CourseCard />
        </Grid>
        <Grid item xs={4}>
          <CourseCard />
        </Grid>
        <Grid item xs={4}>
          <CourseCard />
        </Grid>
        <Grid item xs={8}>
          <CourseCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Courses;
