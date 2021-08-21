import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Title from '@components/shared/Title';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(0, 0),
  },
  paperPadding: {
    padding: theme.spacing(4),
    margin: theme.spacing(2, 0),
  },
}));

const StarHero = ({ title, content }) => {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm" style={{ padding: '0' }}>
        <Paper elevation={3} className={classes.paperPadding}>
          <Title>
            {title}
          </Title>
          <Typography variant="h5" align="left" color="textSecondary" paragraph>
            {content}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};
export default StarHero;
