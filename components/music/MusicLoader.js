import React from 'react';
import Title from '@components/shared/Title';
import { Grid, Divider, Card, CardMedia, CardContent, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RangeSlider from '@components/music/RangeSlider';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
    backgroundColor: '#999',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  circle: {
    width: '50px',
    height: '50px',
    background: '#000',
    color: '#fff',
    borderRadius: '50%',
    position: 'absolute',
    border: '3px solid #fff',
    marginTop: -20,
    marginLeft: -20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: -2,

  },
  avatar: {
    backgroundColor: '#999',
    border: '3px solid #666',
  },
  fullContent: {
    '& img': {
      maxWidth: '100%',
    },

  },

  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  headerControls: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    order: 2,
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: '20px !important',
  },
  articleContent: {
    display: 'flex',
    maxHeight: 100,
    overflow: 'hidden',
  },
  read: {
    backgroundColor: '#00b5ad',
  },
  bandTitle: {
    fontSize: '1.50rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cover: {
    minWidth: 200,
    height: '100%',
    maxHeight: 200,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '5px',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#666',
    order: 1,
    [theme.breakpoints.up('sm')]: {
      order: 2,
      height: '150',
    },
  },
  coverImage: {
    height: '100%',
    width: '100%',
    maxWidth: 200,
    margin: '0 auto',
    backgroundColor: '#333',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  bookRating: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '15px',
  },
  songPlay: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    minHeight: 150,
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },

}));

const MusicLoader = () => {
  const classes = useStyles();

  return (
    <div>
      <Title>
        itune stats - 2015-2020
      </Title>

      <Divider style={{ marginTop: '10px' }} />

      <Grid container spacing={3} key="totals">
        <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
          <p className="lead">time: </p>
          <h2>Loading . . .</h2>

        </Grid>
        <Grid container item xs={12} sm={10} md={2} style={{ margin: '0 auto' }}>
          <p className="lead">plays: </p>
          <h2>Loading . . .</h2>

        </Grid>
        <Grid container item xs={12} sm={10} md={2} style={{ margin: '0 auto' }}>
          <p className="lead">songs: </p>
          <h2>Loading . . .</h2>

        </Grid>
        <Grid container item xs={12} sm={10} md={2} style={{ margin: '0 auto' }}>
          <p className="lead">artists: </p>
          <h2>Loading . . .</h2>

        </Grid>
      </Grid>

      <Divider />

      <div>

        <div className={classes.header}>
          <Title>
            top artists
          </Title>
          <div className={classes.headerControls}>
            <Button
              variant="outlined"
              style={{ backgroundColor: '#fafafa', marginRight: 20, marginLeft: 30 }}
            >
              prev
            </Button>
            <RangeSlider maxPages={523} />
            <Button
              variant="outlined"
              style={{ backgroundColor: '#fafafa', marginLeft: 20 }}
            >
              next
            </Button>
          </div>
        </div>
        <Divider style={{ marginTop: '20px' }} />
        <Grid container spacing={3}>

          <Grid container item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
              <div>
                <div className={classes.circle}>
                  0
                </div>
                <CardMedia className={classes.media}>
                  <h4>loading</h4>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Loading
                  </Typography>
                </CardContent>
              </div>

            </Card>
          </Grid>
          <Grid container item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
              <div>
                <div className={classes.circle}>
                  0
                </div>
                <CardMedia className={classes.media}>
                  <h4>loading</h4>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Loading
                  </Typography>
                </CardContent>
              </div>

            </Card>
          </Grid>
          <Grid container item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
              <div>
                <div className={classes.circle}>
                  0
                </div>
                <CardMedia className={classes.media}>
                  <h4>loading</h4>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Loading
                  </Typography>
                </CardContent>
              </div>

            </Card>
          </Grid>
          <Grid container item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
              <div>
                <div className={classes.circle}>
                  0
                </div>
                <CardMedia className={classes.media}>
                  <h4>loading</h4>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Loading
                  </Typography>
                </CardContent>
              </div>

            </Card>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: '20px' }} />

      </div>
      <Divider style={{ marginTop: '20px' }} />

      <Title>
        top songs
      </Title>
      <Divider style={{ marginTop: '10px' }} />
      <Grid container spacing={3}>

        <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
          <Card className={classes.card}>

            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" className={classes.bandTitle} variant="h5">
                  <span>XXXX</span>
                </Typography>
                <Typography component="h2" className={classes.bandTitle} variant="h2">
                  <span>Loading . . .</span>
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">XXXX</Typography>
                <Box className={classes.songPlay}>
                  <Box>XX Plays</Box>
                  {' '}
                  -
                  <Box> XXXX </Box>
                </Box>

              </CardContent>
            </div>
            <CardMedia className={classes.media}>
              <h4>loading</h4>
            </CardMedia>
          </Card>

        </Grid>
        <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
          <Card className={classes.card}>

            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" className={classes.bandTitle} variant="h5">
                  <span>XXXX</span>
                </Typography>
                <Typography component="h2" className={classes.bandTitle} variant="h2">
                  <span>Loading . . .</span>
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">XXXX</Typography>
                <Box className={classes.songPlay}>
                  <Box>XX Plays</Box>
                  {' '}
                  -
                  <Box> XXXX </Box>
                </Box>

              </CardContent>
            </div>
            <CardMedia className={classes.media}>
              <h4>loading</h4>
            </CardMedia>
          </Card>

        </Grid>
        <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
          <Card className={classes.card}>

            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" className={classes.bandTitle} variant="h5">
                  <span>XXXX</span>
                </Typography>
                <Typography component="h2" className={classes.bandTitle} variant="h2">
                  <span>Loading . . .</span>
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">XXXX</Typography>
                <Box className={classes.songPlay}>
                  <Box>XX Plays</Box>
                  {' '}
                  -
                  <Box> XXXX </Box>
                </Box>

              </CardContent>
            </div>
            <CardMedia className={classes.media}>
              <h4>loading</h4>
            </CardMedia>
          </Card>

        </Grid>
        <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
          <Card className={classes.card}>

            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" className={classes.bandTitle} variant="h5">
                  <span>XXXX</span>
                </Typography>
                <Typography component="h2" className={classes.bandTitle} variant="h2">
                  <span>Loading . . .</span>
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">XXXX</Typography>
                <Box className={classes.songPlay}>
                  <Box>XX Plays</Box>
                  {' '}
                  -
                  <Box> XXXX </Box>
                </Box>

              </CardContent>
            </div>
            <CardMedia className={classes.media}>
              <h4>loading</h4>
            </CardMedia>
          </Card>

        </Grid>

      </Grid>

    </div>
  );
};

export default MusicLoader;
