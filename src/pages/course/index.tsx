// localhost:3000/course/personal
import * as React from 'react';

import Box from '@mui/material/Box';

import HeaderSidebar from '~/components/HeaderSidebar';
import CourseMainBody from '~/components/CourseMainBody';
import Menu from '~/components/Menu';
import Container from '@mui/material/Container/Container';

export default function CoursePage() {
  return (
    <>
      <Menu />
      <Container>
        <CourseMainBody></CourseMainBody>
      </Container>
    </>
  );
}
