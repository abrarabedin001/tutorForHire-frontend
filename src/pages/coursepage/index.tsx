import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import HeaderSidebar from '~/components/HeaderSidebar';
import CourseMainBody from '~/components/CourseMainBody';
import Menu from '~/components/Menu';

export default function CoursePage() {
  return (
    <>
      <Menu />
      <Container>
        <CourseMainBody></CourseMainBody>
      </Container>
      <Footer />
    </>
  );
}
