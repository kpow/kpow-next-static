import React from 'react';
import { format, parseISO } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#999'
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
  fullContent:{
    '& img':{
      maxWidth:'100%'
    }

  }
}));

// const getFavicon = (siteUrl)=>{
  
//   return useQuery("stars", async () => {
//     const { data } = await axios.get(
//       'https://favicongrabber.com/api/grab/'+siteUrl
//     );
//     console.log(data.icons[0].src)
//   });
// }



export default function StarCardBigSkeleton() {
  const classes = useStyles();


  return (
    <Grid container item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <div>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src="https://www.producthunt.com/favicon.ico" />
              </Avatar>
            }
            // action={}
            title=""
           
          />
          <CardMedia
            className={classes.media}
            image=""
            title=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5"></Typography>
            <Typography variant="body2" color="textSecondary" component="p"></Typography>
          </CardContent>
        </div> 
        <CardActions disableSpacing>
          <Button 
            size="small" 
            variant="contained" 
            target="_blank" 
            endIcon={<OpenInNewIcon />}
          > </Button>
        
          <IconButton
            className={classes.expand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
