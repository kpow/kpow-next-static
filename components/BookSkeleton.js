import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:'100%',
    justifyContent:'space-between',
    minHeight: 250,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  articleContent:{
    display:'flex', 
    maxHeight:100, 
    overflow:'hidden',
  },
  read:{
    backgroundColor: '#00b5ad'
  },
  bookTitle:{
    fontSize:'1.50rem',
    display:'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cover: {
    minWidth:180,
    height:'100%',
    maxHeight: '260px',
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
    maxWidth: '175px',
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


export default function BookSkeleton({article}) {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const flexDirect = matches ? 'row' : 'column';
  const coverHeight = matches ? '100%' : '250px';
  const coverOrder = matches ? 2 : 1;
  const detailsOrder = matches ? 1 : 2;

  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Grid container item xs={12} sm={10} md={6} style={{margin:'0 auto'}}>
      <Card className={classes.root} style={{flexDirection:flexDirect}}>

        <div style={{order:detailsOrder}} className={classes.details}>
          <CardContent className={classes.content} style={{width:'100%'}}>
            <Typography component="h5" className={classes.bookTitle} variant="h5" style={{width:'100%'}}>
              <span style={{width:'100%'}}>
                 <Skeleton animation="wave" style={{width:'100%'}}/>
              </span>
              <IconButton
                target="_blank"
                style={{padding:0}} 
                aria-label="GoodReads Link"
                children={<OpenInNewIcon />}
               />
            </Typography>
       
            
            <Typography variant="subtitle1" color="textSecondary" style={{width:'100%'}}>
              
           
                  <Skeleton animation="wave" style={{width:'100%'}}/>
        

            </Typography>
            <Box className={classes.bookRatingHolder} style={{width:'100%'}}>
              <Box mr={3} style={{display:'block'}} style={{width:'100%'}}>
                <Typography className={classes.bookRating} color="textSecondary">
                  <Skeleton animation="wave" style={{width:'100%'}}/>
                </Typography>
                 <Skeleton animation="wave" style={{width:'100%'}}/>
              </Box>
              <Box style={{width:'100%'}}>
                <Typography className={classes.bookRating} color="textSecondary">
                  <Skeleton animation="wave" style={{width:'100%'}}/>
                </Typography>
                 <Skeleton animation="wave" style={{width:'100%'}}/>
              </Box>
            </Box>
            <Box className={classes.articleContent} style={{width:'100%'}}>
              
              <Typography variant="body2" color="textSecondary" style={{width:'100%'}} component="p">
                <Skeleton animation="wave" style={{width:'100%'}}/>
                <Skeleton animation="wave" style={{width:'100%'}}/>
                <Skeleton animation="wave" style={{width:'100%'}}/>
              </Typography>
           

            </Box>
          </CardContent>
          
          
        </div>
        <CardMedia
          className={classes.cover}
          style={{height:coverHeight, order:coverOrder}}
          // image={article.book.image_url._text}
          children={<Skeleton 
                      variant="rect" 
                      width={150} 
                      height="100%" 
                      animation="wave" 
                      className={classes.coverImage} 
                    />}
        />
           
      </Card>
     
    </Grid>
  );
}
