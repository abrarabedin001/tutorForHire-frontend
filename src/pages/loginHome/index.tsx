import * as React from 'react';

import Box from '@mui/material/Box';

import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';

export default function LoginHome() {
  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderSidebar>
        <Courses></Courses>
      </HeaderSidebar>
    </Box>
  );
}
