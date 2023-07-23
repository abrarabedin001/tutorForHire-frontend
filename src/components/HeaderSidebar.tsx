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
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Link } from '@mui/material';
import Courses from '~/components/Courses';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer({
  children,
}: {
  children: React.ReactElement;
}) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const isActiveRoute = (href: string) => {
    console.log(router.pathname, href);
    return router.pathname === href;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            m={1}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            className="w-full"
          >
            <div className="center-buttons button.active">
              <Button>
                <Link
                  href="/home"
                  className={` ${
                    isActiveRoute('/home')
                      ? 'm-5 border-spacing-3 border-dashed border-gray-950 bg-black p-5 text-white'
                      : ''
                  }`}
                >
                  Home
                </Link>
              </Button>

              <Button
                className={`text-white ${
                  isActiveRoute('/course') ? 'active' : ''
                }`}
              >
                <Link href="/course" style={{ color: 'white' }}>
                  Courses
                </Link>
              </Button>

              <Button
                className={`text-white ${
                  isActiveRoute('/tutor') ? 'active' : ''
                }`}
              >
                <Link href="/tutor" style={{ color: 'white' }}>
                  Tutors
                </Link>
              </Button>

              <Button
                className={`text-white ${
                  isActiveRoute('/about') ? 'active' : ''
                }`}
              >
                <Link href="/about" style={{ color: 'white' }}>
                  About
                </Link>
              </Button>

              <Button
                className={`text-white ${
                  isActiveRoute('/contact') ? 'active' : ''
                }`}
              >
                <Link href="/contact" style={{ color: 'white' }}>
                  Contact
                </Link>
              </Button>
            </div>
          </Box>

          <Box
            m={1}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            className="w-full"
          >
            <Button
              className="text-white"
              style={{ color: 'white' }}
              onClick={() => {
                removeCookie('data', '/');
                removeCookie('token', '/');
                router.push('/login');
              }}
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
