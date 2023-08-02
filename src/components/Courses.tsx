import { Grid, Box } from '@mui/material';
import CourseCard from './CourseCard';
import { Container } from 'postcss';

const Courses = ({ courses }: { courses?: any[] }) => {
  // If courses is undefined, set it to an empty array
  console.log('courses', courses);
  const coursesArray: typeof courses = courses;
  return (
    <Box className="m-3 p-3">
      <Grid container spacing={2}>
        {coursesArray!.map((course) => (
          <Grid item key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
