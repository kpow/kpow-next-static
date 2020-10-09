import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#FFF',
    paddingBottom:'100px'
  },
  title: {
    fontFamily: 'Slackey',
    color:'#FFF',
  },
  text:{
    color:'#fff',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const BigFooter = React.memo(function BigFooter() {
  const classes = useStyles();

  return (
      <Box bgcolor="#000" width={'100%'} height={'100%'} px={{ xs: 2, sm: 3, lg: 4 }} >
        <Container maxWidth="lg">
          <Box alignItems="stretch" pt={6} pb={{ md: 6 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} lg={3}>
              
              </Grid>
              <Grid item xs={12} md={8} lg={5}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h5" className={classes.title}>
                      About
                    </Typography>
                    <Typography paragraph className={classes.text}>
                        Digital Architect - Leader - Developer - Pixel Farmer.
                        <br></br>
                        Voracious Reader and Dad. 
                        <br></br>
                        I'm into travel, ukes, pugs, live music, and pixels
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="h5" className={classes.title}>
                      Site
                    </Typography>
                    <Typography paragraph className={classes.text}>
                      This is built with Next.js, React, Material-UI, React-Query, Markdown. Hosted as a static site using a stack of APIs to get it all here :)
                    </Typography>  
                  </Grid>
                  <Grid item xs={6} sm={4} style={{paddingLeft:60}}>
                    <Box>
                      <Avatar alt="kpow" src="../static/headshot.png" className={classes.large} />
                    </Box>
                    <Box>
                    <Typography variant="h5" className={classes.title}>
                        kpow
                    </Typography>    
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </Container>
      </Box>
  );
});

export default BigFooter;