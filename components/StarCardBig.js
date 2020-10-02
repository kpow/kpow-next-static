import React from 'react';
import { format, parseISO, formatDistance, formatRelative, subDays } from 'date-fns'
import axios from "axios";

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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarsIcon from '@material-ui/icons/Stars';
import Grid from '@material-ui/core/Grid';
import { useQuery } from "react-query";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
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
    backgroundColor: '#999',
    border: '3px solid #666',
  },
  fullContent:{
    '& img':{
      maxWidth:'100%'
    }

  }
}));

const getFavicon = (siteUrl) =>{

    const { data } = axios.get(
      'https://favicongrabber.com/api/grab/'+siteUrl
    ).then(
      console.log(data)
    )
   

}



export default function StarCardBig(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const publishedDate = parseISO(props.article?.published)
  const formatDate = format(publishedDate, "M.d.yyyy" )
  
  getFavicon(props.article?.site_url);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // getFavicon(props.article?.site_url)

  return (
    <Grid container item xs={12} sm={6} md={4}>
    <Card className={classes.root}>
      <div>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {/* <StarsIcon /> */}
              <img src={`https://api.faviconkit.com/${props.article?.site_url}/35`} />
            </Avatar>
          }
          // action={}
          title={props.article?.site_url}
          subheader={formatDate}
        />
        <CardMedia
          className={classes.media}
          image={props.article?.lead_image_url}
          title={props.article?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {props.article?.title}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
            {props.article?.summary}
          </Typography>
        </CardContent>
      </div> 
      <CardActions disableSpacing>
        <Button 
          size="small" 
          variant="contained" 
          target="_blank" 
          href={props.article.url}
          endIcon={<OpenInNewIcon />}
        >
          go to article
        </Button>
      
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Full Text:</Typography>
          <Typography 
            paragraph 
            className={classes.fullContent} 
            color="textSecondary" 
            dangerouslySetInnerHTML={{ __html: props.article.content }}
          >
       
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
  );
}
