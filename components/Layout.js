import Head from 'next/head'
import { Box, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BigFooter from '@components/BigFooter';

import Header from './Header'

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  mainFeaturedPost: {
    position: 'relative',
    marginBottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100px',
  },
  mainContent: {
    // padding: theme.spacing(3)
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  }
}));

export default function Layout({ children, pageTitle, description, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const paperPadding = matches ? 4 : 0;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Paper className={classes.mainFeaturedPost} style={{ marginTop:'40px', backgroundImage: `url(https://source.unsplash.com/1200x300/?space,nasa)` }}>
          <div className={classes.overlay} />
        </Paper>
        <Container maxWidth="lg" className={classes.mainContent}>

          <Box component="main" mx={paperPadding}>
            {children}
          </Box>
         
        </Container>
        <Paper className={classes.mainFeaturedPost} style={{ marginTop:'40px', backgroundImage: `url(https://source.unsplash.com/1200x300/?space,nasa)` }}>
          <div className={classes.overlay} />
        </Paper>
        <BigFooter /> 

      </React.Fragment>      
    </>
  )
}
