/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/FlashOn';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    minHeight: 250,
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
  bookTitle: {
    fontSize: '1.50rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cover: {
    minWidth: 180,
    height: '100%',
    maxHeight: '260px',
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
      height: '250px',
    },
  },
  coverImage: {
    height: '100%',
    width: '100%',
    maxWidth: '175px',
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
  bookRatingHolder: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

}));

const StyledRating = withStyles({
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

export default function BookCardFull({ article }) {
  const classes = useStyles();

  const ratingExist = article.rating._text === 0 ? 'none' : 'block';

  return (
    <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
      <Card className={classes.root}>

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" className={classes.bookTitle} variant="h5">
              <span>
                {article.book.title_without_series._text}
              </span>
              <IconButton
                target="_blank"
                style={{ padding: 0 }}
                href={article.book.link._text}
                aria-label="GoodReads Link"
              >
                <OpenInNewIcon />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {article.book.authors.author.name._text}
              {article.book.publication_year._text
                ? <> - published: {article.book.publication_year._text}</> : <></> }

            </Typography>
            <Box className={classes.bookRatingHolder}>
              <Box mr={3} style={{ display: ratingExist }}>
                <Typography className={classes.bookRating} color="textSecondary">my rating: </Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={Number(article.rating._text)}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.5}
                  readOnly
                  icon={<FavoriteIcon fontSize="inherit" />}
                />
              </Box>
              <Box>
                <Typography className={classes.bookRating} color="textSecondary">avg. rating: </Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={Number(article.book.average_rating._text)}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.1}
                  readOnly
                  icon={<FavoriteIcon fontSize="inherit" />}
                />
              </Box>
            </Box>
            <Box className={classes.articleContent}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                dangerouslySetInnerHTML={{ __html: article.book.description._text }}
              />
            </Box>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          title={article.book.title_without_series._text}
        >
          <Chip
            icon={<FaceIcon />}
            style={{ position: 'absolute', marginBottom: 10, marginRight: 5 }}
            label={article.shelves?.shelf._attributes?.name === 'currently-reading' ? 'reading' : article.shelves?.shelf._attributes?.name}
            color={article.shelves?.shelf._attributes?.name === 'read' ? 'primary' : 'secondary'}
          />
          <img alt="book cover" src={article.book.image_url._text} className={classes.coverImage} />
        </CardMedia>
      </Card>
    </Grid>
  );
}
