import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    minHeight: 220,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingRight: 20,
  },
  content: {
    flex: '1 0 auto',
  },
  read: {
    backgroundColor: '#00b5ad',
  },
  bookTitle: {
    fontSize: '1.50rem',
  },
  cover: {
    minWidth: 150,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '5px',
    backgroundColor: '#fafafa',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  bookRating: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '15px',
  },
  bookRatingHolder: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

export default function BookCardFull() {
  const classes = useStyles();

  return (
    <Grid container item xs={12} sm={6} md={6}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" className={classes.bookTitle} variant="h5">
              <Skeleton variant="text" width={300} height={50} />
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Skeleton variant="text" width={300} height={50} />
            </Typography>
            <Box className={classes.bookRatingHolder} />
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <Skeleton variant="circle" width={40} height={40} animation="wave" />
            </IconButton>
            <Chip icon={<FaceIcon />} />
          </div>
        </div>
        <CardMedia className={classes.cover}>
          <Skeleton variant="rect" width={150} height="100%" animation="wave" />
        </CardMedia>
      </Card>
    </Grid>
  );
}
