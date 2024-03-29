import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Container, Box } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FaceIcon from '@material-ui/icons/Face';
import StarsIcon from '@material-ui/icons/Stars';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import WebIcon from '@material-ui/icons/Web';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import HomeIcon from '@material-ui/icons/Home';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ContactModal from '@components/ContactModal';
import Hidden from '@material-ui/core/Hidden';
import SecurityIcon from '@material-ui/icons/Security';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mode: {
    flexGrow: 40,
  },
  pageHeader: {
    backgroundColor: '#000',
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Slackey',
    lineHeight: 1,
    paddingRight: '10px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },

}));
const linkz = ['/', '/about', '/starfeed', '/bookfeed', '/youtube', '/battle', '/pmonk', '/music'];
const labelz = ['home', 'about kpow', 'star feed', 'book feed', 'youtube live', 'hero battle', 'pmonk', 'itunes beta'];
const iconz = (index) => {
  switch (index) {
    case 0:
      return <HomeIcon />;
    case 1:
      return <FaceIcon />;
    case 2:
      return <StarsIcon />;
    case 3:
      return <MenuBookIcon />;
    case 4:
      return <VideoLibraryIcon />;
    case 5:
      return <SecurityIcon />;
    case 6:
      return <CameraRollIcon />;
    case 7:
      return <MusicNoteIcon />;
    case 8:
      return <WebIcon />;
    default:
      return <HomeIcon />;
  }
};

export default function Header({ pageMode, handleMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const modelabel = pageMode;
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setMode(!mode);
    handleMode(mode === false ? 'dark' : 'light');
  };

  React.useEffect(() => {
    // thise set default for the ios switch
    const storedPageMode = localStorage.getItem('pageMode');
    // eslint-disable-next-line no-unneeded-ternary
    const storedMode = storedPageMode === 'dark' ? true : false;
    setMode(storedMode);
  }, []);

  const IOSSwitch = withStyles(() => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#3f51b5',
          opacity: 1,
          border: 'none',
        },
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: '#999',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
  // eslint-disable-next-line arrow-body-style
  }))(({ ...props }) => {
    return (
      <Switch
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
        checked={mode}
      />
    );
  });

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.pageHeader}>
        <Container maxWidth="lg">
          <Toolbar>
            <Link href="/">
              <Box
                component="img"
                width={60}
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgOTIuMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDkyLjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KCS5zdDF7ZGlzcGxheTpub25lO30KCS5zdDJ7ZGlzcGxheTppbmxpbmU7ZmlsbDojMUIxQzFEO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDN7ZmlsbDojMUIxQzFEO30KPC9zdHlsZT4KPGcgaWQ9IkxheWVyXzIiPgoJPGc+CgkJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNTAiIGN5PSI0NSIgcj0iNDMiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTAsMTFjMTYuNCwwLDI5LjgsMTEuNSwyOS44LDI1LjdjMCw3LjEtMy4zLDEzLjUtOC43LDE4LjJjMi4zLDIuNywzLjIsNS42LDIuMSw4Yy0xLjYsMy4zLTYuOCw0LjItMTIuMSwyLjEKCQkJdjEwLjVjMCwxLjktMS43LDMuNS0zLjcsMy41aC0wLjFjLTEuNywwLTMuMi0xLjEtMy42LTIuNmMtMC41LDEuNS0xLjksMi42LTMuNiwyLjZINTBjLTEuNywwLTMuMi0xLjEtMy42LTIuNgoJCQljLTAuNSwxLjUtMS45LDIuNi0zLjYsMi42aC0wLjFjLTIuMSwwLTMuNy0xLjYtMy43LTMuNVY2NWMtNS4zLDIuMS0xMC41LDEuMy0xMi4xLTIuMWMtMS4xLTIuNC0wLjItNS40LDIuMS04CgkJCWMtNS40LTQuNy04LjctMTEuMS04LjctMTguMkMyMC4yLDIyLjUsMzMuNiwxMSw1MCwxMXoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDUuNSw1OC4xYy0wLjcsMS0wLjcsMi41LDAuMiwzLjNsMC4zLDAuM2MwLjEsMC4xLDAuMiwwLjIsMC4zLDAuMmMwLjgsMC42LDEuOCwwLjQsMi41LTAuNWwxLjMtMS44bDEuMiwxLjcKCQkJYzAuNiwwLjgsMS40LDEuMSwyLjIsMC44YzAuMy0wLjEsMC42LTAuMywwLjgtMC41YzAuOS0xLDEtMi42LDAuMi0zLjZsLTEtMS4zbC0xLjctMi40Yy0wLjQtMC41LTAuOC0wLjgtMS4yLTAuOWgtMC4xCgkJCWMtMC40LTAuMS0wLjgtMC4xLTEuMSwwcy0wLjcsMC40LTAuOSwwLjdsLTIuMywzLjFMNDUuNSw1OC4xeiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNy41LDU0LjZjMSwwLDEuOS0wLjEsMi44LTAuNGMwLjctMC4yLDEuNC0wLjUsMi0wLjhjMy4yLTEuNyw1LjUtNS4yLDUuNS05LjFjMC01LjYtNC43LTEwLjMtMTAuNC0xMC4zCgkJCXMtMTAuMyw0LjYtMTAuMywxMC4yQzI3LjEsNTAsMzEuNyw1NC42LDM3LjUsNTQuNnoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTcuNyw1My4zYzAuNywwLjQsMS4zLDAuNiwyLDAuOGMwLjksMC4zLDEuOCwwLjQsMi44LDAuNGM1LjcsMCwxMC40LTQuNiwxMC40LTEwLjMKCQkJYzAtNS43LTQuNy0xMC4zLTEwLjQtMTAuM3MtMTAuNCw0LjYtMTAuNCwxMC4zQzUyLjIsNDguMiw1NC40LDUxLjYsNTcuNyw1My4zeiIvPgoJPC9nPgo8L2c+CjxnIGlkPSJMYXllcl8xXzFfIj4KCTxnIGNsYXNzPSJzdDEiPgoJCTxyZWN0IHg9Ii02OTQuNiIgeT0iLTUyIiBjbGFzcz0ic3QyIiB3aWR0aD0iMTI5My42IiBoZWlnaHQ9IjEyNzAuMSIvPgoJPC9nPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTUwLDkwYzI0LjksMCw0NS0yMC4xLDQ1LTQ1Uzc0LjksMCw1MCwwUzUsMjAuMSw1LDQ1UzI1LjEsOTAsNTAsOTB6IE01MCw5LjRjMTcuMiwwLDMxLjIsMTIsMzEuMiwyNi45CgkJCWMwLDcuNC0zLjUsMTQuMS05LjEsMTljMi40LDIuOCwzLjQsNS45LDIuMiw4LjRjLTEuNywzLjUtNy4xLDQuNC0xMi43LDIuMnYxMWMwLDItMS44LDMuNy0zLjksMy43aC0wLjFjLTEuOCwwLTMuMy0xLjItMy44LTIuNwoJCQljLTAuNSwxLjYtMiwyLjctMy44LDIuN2gtMC4xYy0xLjgsMC0zLjMtMS4yLTMuOC0yLjdjLTAuNSwxLjYtMiwyLjctMy44LDIuN2gtMC4xYy0yLjIsMC0zLjktMS43LTMuOS0zLjd2LTExCgkJCWMtNS41LDIuMi0xMSwxLjQtMTIuNy0yLjJjLTEuMi0yLjUtMC4yLTUuNiwyLjItOC40Yy01LjYtNC45LTkuMS0xMS42LTkuMS0xOUMxOC44LDIxLjUsMzIuOCw5LjQsNTAsOS40eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik00NS4zLDU4LjdjLTAuNywxLTAuNywyLjYsMC4yLDMuNWwwLjMsMC4zYzAuMSwwLjEsMC4yLDAuMiwwLjMsMC4yYzAuOCwwLjYsMS45LDAuNCwyLjYtMC41bDEuNC0xLjlsMS4zLDEuOAoJCQljMC42LDAuOCwxLjUsMS4xLDIuMywwLjhjMC4zLTAuMSwwLjYtMC4zLDAuOC0wLjVjMC45LTEsMS0yLjcsMC4yLTMuOGwtMS0xLjRsLTEuOC0yLjVjLTAuNC0wLjUtMC44LTAuOC0xLjMtMC45aC0wLjEKCQkJYy0wLjQtMC4xLTAuOC0wLjEtMS4yLDBjLTAuMywwLjEtMC43LDAuNC0wLjksMC43TDQ2LDU3LjdMNDUuMyw1OC43eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zNi45LDU1YzEsMCwyLTAuMSwyLjktMC40YzAuNy0wLjIsMS41LTAuNSwyLjEtMC44YzMuNC0xLjgsNS44LTUuNCw1LjgtOS41YzAtNS45LTQuOS0xMC44LTEwLjktMTAuOAoJCQlTMjYsMzguMywyNiw0NC4yQzI2LDUwLjIsMzAuOSw1NSwzNi45LDU1eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik01OC4xLDUzLjdjMC43LDAuNCwxLjQsMC42LDIuMSwwLjhjMC45LDAuMywxLjksMC40LDIuOSwwLjRjNiwwLDEwLjktNC44LDEwLjktMTAuOHMtNC45LTEwLjgtMTAuOS0xMC44CgkJCXMtMTAuOSw0LjgtMTAuOSwxMC44QzUyLjMsNDguMyw1NC42LDUxLjksNTguMSw1My43eiIvPgoJPC9nPgo8L2c+Cjwvc3ZnPg=="
                alt="kpow"
              />
            </Link>
            <Typography variant="h5" className={classes.title}>
              kpow
            </Typography>
            <FormControlLabel
              className={classes.mode}
              control={<IOSSwitch checked={mode} onChange={toggleDarkMode} name="darkMode" />}
              label={modelabel}
            />
            <Box>
              <Hidden xsDown>
                <ContactModal />
              </Hidden>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer}
                className={clsx(open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Box m={0}>
            <Hidden smUp>
              <ContactModal />
            </Hidden>
          </Box>
        </div>
        <Divider />
        <List>
          {linkz.map((item, index) => (
            <Link href={item} key={item}>
              <ListItem button>
                <ListItemIcon>
                  {iconz(index)}
                </ListItemIcon>
                <ListItemText primary={labelz[index]} />
              </ListItem>
            </Link>
          ))}
          <a target="_blank" rel="noreferrer" href="https://gatsby.kpow-wow.com">
            <ListItem button key="gatsby">
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="gatsby version" />
            </ListItem>
          </a>
        </List>
      </Drawer>

    </div>

  );
}
