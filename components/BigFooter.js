import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#FFF',
    paddingBottom:'100px',
    flexGrow: 1,
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
    margin: theme.spacing(2),
  },
  paper: {
    display:'flex',
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    flexGrow: 1,
    backgroundColor: '#000'
  },
}));

const BigFooter = React.memo(function BigFooter() {
  const classes = useStyles();

  return (
      <Box bgcolor="#000" width={'100%'} height={'100%'} px={{ xs: 2, sm: 3, lg: 4 }} >
        <Container maxWidth="lg">
          <div className={classes.root}>
            <Grid container spacing={3} justify="space-between">
              <Grid item lg={4} md={6} sm={12}>
                <Paper className={classes.paper}>
                  <Box>
                    <Avatar alt="kpow" src="../static/headshot.png" className={classes.large} />
                  </Box>
                  <div>
                    <Typography variant="h5" className={classes.title}>
                      About Kpow
                    </Typography>
                    <Typography paragraph className={classes.text}>
                        Digital Architect - Leader - Developer - Pixel Farmer.
                        <br></br>
                        Voracious Reader and Dad. 
                        <br></br>
                        I'm into travel, ukes, pugs, live music, and pixels
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <Paper className={classes.paper}>
                  <div> 
                    <Typography variant="h5" className={classes.title}>
                      Site
                    </Typography>
                    <Typography paragraph className={classes.text}>
                      This is built with Next.js, React, Material-UI, React-Query, and some content in Markdown. Hosted as a static site using Instagram, GoodReads, Feedbin, Unsplash, faviconkit and whatever other API's I'm playing with :)
                    </Typography>  
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
  );
});

export default BigFooter;