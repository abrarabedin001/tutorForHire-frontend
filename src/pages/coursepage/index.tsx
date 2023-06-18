import * as React from 'react';

import Box from '@mui/material/Box';

import HeaderSidebar from '~/components/HeaderSidebar';
import CourseMainBody from '~/components/CourseMainBody';

export default function CoursePage() {
  return (
    <HeaderSidebar>
      <CourseMainBody></CourseMainBody>
    </HeaderSidebar>
  );
}
