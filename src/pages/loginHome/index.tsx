import * as React from 'react';
import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
