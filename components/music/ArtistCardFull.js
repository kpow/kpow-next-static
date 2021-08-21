import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import jsonp from 'jsonp';
import artistImages from 'src/artist-images-cache';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
}));

export default function ArtistCardFull({ artist, index }) {
  const classes = useStyles();
  const [imageURL, setImageURL] = useState('/');

  useEffect(() => {
    let finalImageUrl = '/';
    artistImages.forEach((item) => {
      if (item.key === artist.key) {
        finalImageUrl = item.url;
      }
    });

    if (finalImageUrl !== '/') {
      setImageURL(finalImageUrl);
    } else {
      const url = `https://itunes.apple.com/search?term=${artist.key}&country=US&media=music&entity=musicTrack`;

      jsonp(url, null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          // eslint-disable-next-line no-lonely-if
          if (data.results.length > 0) {
            const resource = data.results[0].artworkUrl30.replace('30x30bb', '300x300bb');
            console.log(`{"key":"${artist.key}", "url":"${resource}"},`);
            setImageURL(resource);
          }
        }
      });
    }
  }, []);

  return (
    <Grid container item xs={12} sm={6} md={3}>
      <Card className={classes.root}>
        <div>
          <div className={classes.circle}>
            {index + 1}
          </div>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title={artist.key}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {artist.key}
            </Typography>

          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
