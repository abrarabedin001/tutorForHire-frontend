import { Grid } from '@mui/material';
import CourseCard from './CourseCard';

const Courses = ({ courses }: { courses?: any[] }) => {
  return (
    <Grid container spacing={2}>
      {courses.map((course) => (
        <Grid item xs={4} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Courses;
