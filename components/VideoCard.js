/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    width: '100%',
  },
  media: {
    height: 240,
  },
  content: {
    maxHeight: 185,
    overflow: 'hidden',
    marginBottom: 35,
  },
  videoContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%',
  },
  responsiveIframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
  },
});

export default function VideoCard({ title, description, resourceId, medium, id, handleClickOpen }) {
  const classes = useStyles();

  return (
    <Grid key={id} container item xs={12} sm={6} md={4} style={{ margin: '0 auto' }}>

      <Card className={classes.root} onClick={() => { handleClickOpen({ id: resourceId.videoId }); }}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={medium.url}
            title={title}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              { title }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
