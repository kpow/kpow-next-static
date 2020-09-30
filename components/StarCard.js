import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#999'
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDescription: {
    fontSize:'.9rem',
  },
  siteUrl: {
    fontSize: 14,
  },
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
            <Typography className={classes.siteUrl} color="textSecondary" gutterBottom>
            {props.article?.site_url}
            </Typography>

            <Typography gutterBottom variant="h5">
              {props.article?.title}
            </Typography>
            <Typography component="p" className={classes.cardDescription}>
              {props.article?.summary}
            </Typography>
            
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" target="_blank" href={props.article.url}>Learn More</Button>
          </CardActions>

        </Card>
      </Grid>
  );
});

export default StarCard;