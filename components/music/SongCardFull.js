/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import jsonp from 'jsonp';
import numeral from 'numeral';
import Computation from '@utils/musicComputation';
import artistImages from 'src/artist-images-cache';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    minHeight: 150,
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
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

}));

export default function SongCardFull(props) {
  const classes = useStyles();

  const [imageURL, setImageURL] = useState('/');
  const year = props.year.value[0];
  const displayYear = props.year.key;

  useEffect(() => {
    let finalImageUrl = '/';
    artistImages.forEach((item) => {
      if (item.key === year.value.artist) {
        finalImageUrl = item.url;
      }
    });

    if (finalImageUrl !== '/') {
      setImageURL(finalImageUrl);
    } else {
      const url = `https://itunes.apple.com/search?term=${year.value.artist}&country=US&media=music&entity=musicTrack`;

      jsonp(url, null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else if (data.results.length > 0) {
          const resource = data.results[0].artworkUrl30.replace('30x30bb', '300x300bb');
          console.log(`{"key":"${year.value.artist}", "url":"${resource}"},`);
          setImageURL(resource);
        }
      });
    }
  }, []);

  return (
    <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
      <Card className={classes.root}>

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" className={classes.bandTitle} variant="h5">
              <span>{displayYear}</span>
            </Typography>
            <Typography component="h2" className={classes.bandTitle} variant="h2">
              <span>{year.value.name}</span>
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">{year.value.artist}</Typography>
            <Box className={classes.songPlay}>
              <Box>
                {numeral(year.value.plays).format('0,0')}
                {' '}
                Plays
              </Box>
              {' '}
              -
              <Box>
                {' '}
                {Computation.convertTime(year.value.time)}
              </Box>
            </Box>

          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          title={year.value.key}
        >
          <img alt="artist" src={imageURL} className={classes.coverImage} />
        </CardMedia>
      </Card>

    </Grid>
  );
}
