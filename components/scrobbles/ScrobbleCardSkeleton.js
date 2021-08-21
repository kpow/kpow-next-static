import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
  fullContent: {
    '& img': {
      maxWidth: '100%',
    },
  },
}));

export default function ScrobbleCardBigSkeleton() {
  const classes = useStyles();

  return (
    <Grid container item xs={12} sm={6} md={4}>
      <Card className={classes.root}>

        <div>
          <CardHeader
            avatar={
              <Skeleton variant="circle" width={40} height={40} animation="wave" />
            }
            title={<Skeleton variant="text" animation="wave" />}
          />
          <Skeleton variant="rect" width={400} height={200} animation="wave" />

          <CardContent>
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="text" width={300} height={150} />
          </CardContent>
        </div>

        <CardActions disableSpacing>
          <Button size="small" variant="contained">
            <Skeleton variant="text" width={120} />
          </Button>

          <IconButton className={classes.expand}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

      </Card>
    </Grid>
  );
}
