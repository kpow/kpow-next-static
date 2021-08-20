import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    width: '100%',
    minWidth: 200,
    minHeight: 200,
    backgroundColor: '#999',
  },
  fullContent: {
    '& img': {
      maxWidth: '100%',
    },
  },
}));

export default function ScrobbleCardBig({ article }) {
  const classes = useStyles();
  return (
    <Grid container item xs={6} sm={3} md={2}>
      <Card className={classes.root}>
        <div>

          <CardMedia
            className={classes.media}
            image={article?.image[2]['#text']}
            title={article?.artist['#text']}
          >
            {article?.name}
          </CardMedia>
        </div>
      </Card>
    </Grid>
  );
}
