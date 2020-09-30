import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDescription: {
    fontSize:'.9rem',
  },
  a:{
    display:'flex'
  }
}));

const StarCard = React.memo(function StarCard(props) {

  const classes = useStyles();
  return (
      <Grid container item key={props.article.published} xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <a href={props.article.url} target="_blank"> 
            <CardMedia
              className={classes.cardMedia}
              image={props.article?.lead_image_url}
              title={props.article?.title}
            />
          </a>  

          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.article?.title}
            </Typography>
            <Typography component="p" className={classes.cardDescription}>
              {props.article?.summary}
            </Typography>
          </CardContent>
      
        </Card>
      </Grid>
  );
});

export default StarCard;