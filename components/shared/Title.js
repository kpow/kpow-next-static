import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Slackey',
    fontWeight: 'bold',
    lineHeight: 1,
    paddingRight: '10px',
    paddingTop: '15px',
  },
}));

export default function Title({ props }) {
  const classes = useStyles();
  return (
    <Typography component="h2" variant="h4" className={classes.title}>
      {props.children}
    </Typography>
  );
}
