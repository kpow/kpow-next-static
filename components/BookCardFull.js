import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';

import { format, parseISO} from 'date-fns'
import { withStyles } from '@material-ui/core/styles';

import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/FlashOn';

import FaceIcon from '@material-ui/icons/Face';
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:'100%',
    justifyContent:'space-between',
    minHeight: 220
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingRight:20
  },
  content: {
    flex: '1 0 auto',
  },
  read:{
    backgroundColor: '#00b5ad'
  },
  bookTitle:{
    fontSize:'1.50rem'
  },
  cover: {
    minWidth:150,
    height:'100%',
    maxHeight: '225px',
    display:'flex',
    justifyContent:"flex-end",
    alignItems: "flex-end",
    padding: '5px',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor:'#666'
  },
  coverImage:{
    height:'100%',
    width: '100%',
    maxWidth: 150,
    margin: '0 auto',
    backgroundColor: '#333'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    width:'100%',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  bookRating:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '15px'
  },
  bookRatingHolder:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  }
}));

const StyledRating = withStyles({
  
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);


export default function BookCardFull({article}) {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const flexDirect = matches ? 'row' : 'column';
  const coverHeight = matches ? '100%' : '250px';
  const coverOrder = matches ? 2 : 1;
  const detailsOrder = matches ? 1 : 2;
  const ratingExist = article.rating._text == 0 ? 'none' : 'block' ;

  const [expanded, setExpanded] = React.useState(false);
  // const publishedDate = parseISO(props.article?.published)
  // const formatDate = format(publishedDate, "M.d.yyyy" )

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container item xs={12} sm={6} md={6}>
      <Card className={classes.root} style={{flexDirection:flexDirect}}>
        

        <div style={{order:detailsOrder}} className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" className={classes.bookTitle} variant="h5">
              {article.book.title_without_series._text}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              
              {article.book.authors.author.name._text} 
            
              {article.book.publication_year._text ? 
                <> - published: {article.book.publication_year._text}</> : <></> } 

            </Typography>
            <Box className={classes.bookRatingHolder}>
              <Box mr={3} style={{display:ratingExist}}>
                <Typography variant="span" className={classes.bookRating} color="textSecondary">my rating: </Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={article.rating._text}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.5}
                  readOnly
                 
                  icon={<FavoriteIcon fontSize="inherit" />}
                />
              </Box>
              <Box>
                <Typography variant="span" className={classes.bookRating} color="textSecondary">avg. rating: </Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={article.book.average_rating._text}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={0.1}
                  readOnly
                   
                  icon={<FavoriteIcon fontSize="inherit" />}
                />
              </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Full Text:</Typography>
            <Typography 
              paragraph 
              className={classes.fullContent} 
              color="textSecondary" 
              // dangerouslySetInnerHTML={{ __html: props.article.book.description._text }}
            />
          </CardContent>
        </Collapse>
          </CardContent>
          <div className={classes.controls}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              children={<ExpandMoreIcon />}
            />

            <Chip
              icon={<FaceIcon />}
              label={article.shelves?.shelf._attributes?.name == 'currently-reading' ? 'reading' : article.shelves?.shelf._attributes?.name}
              color={article.shelves?.shelf._attributes?.name == 'read' ? 'primary' : 'secondary'}
            />
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          style={{height:coverHeight, order:coverOrder}}
          // image={article.book.image_url._text}
          title={article.book.title_without_series._text}
        >
         <img src={article.book.image_url._text} className={classes.coverImage} />
        </CardMedia>      
      </Card>
     
    </Grid>
  );
}
