import * as React from 'react';

import Box from '@mui/material/Box';

import Courses from '~/components/Courses';
import HeaderSidebar from '~/components/HeaderSidebar';
import { CookiesProvider } from 'react-cookie';

export default function LoginHome() {
  return (
    <CookiesProvider>
      <Box sx={{ display: 'flex' }}>
        <HeaderSidebar>
          <Courses></Courses>
        </HeaderSidebar>
      </Box>
    </CookiesProvider>
  );
}
