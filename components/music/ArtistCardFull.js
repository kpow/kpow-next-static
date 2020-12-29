import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import jsonp from 'jsonp';
import Computation from "@utils/musicComputation";
import numeral from 'numeral';
import artistImages from 'src/artist-images-cache';


import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width:'100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
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

export default function ArtistCardFull(props) {
  const classes = useStyles();
  const [imageURL, setImageURL]= useState("/");
  const [artist, setArtist] = useState(props.artist);
  const [index, setIndex] = useState(props.index)

  // console.log(props.artist)

 

  useEffect(() => {

    let finalImageUrl = "/"
    artistImages.forEach((item)=>{
      if(item.key == artist.key){
        finalImageUrl = item.url
      }
    })

    if(finalImageUrl != "/"){

      setImageURL(finalImageUrl)

    }else{
      const url = "https://itunes.apple.com/search?term=" + artist.key + "&country=US&media=music&entity=musicTrack"
    
      jsonp(url, null, (err, data) => {
          if (err) {
              console.error(err.message);
          } else {
              if (data.results.length > 0) {
                const resource = data.results[0].artworkUrl30.replace('30x30bb', '300x300bb')
                console.log(`{"key":"${artist.key}", "url":"${resource}"},`)
                setImageURL(resource)
              }
          }
      });
    }
      
  }, [])

  return (
    <Grid container item xs={12} sm={6} md={3}>
    <Card className={classes.root}>
      <div>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={artist.key}
        >
        </CardMedia>  
        <CardContent>
          <Typography gutterBottom variant="h5">
          {index + 1}: {artist.key}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
            {numeral(artist.value.plays).format('0,0')} Plays : {Computation.convertTime(artist.value.time)}
          </Typography>
        </CardContent>
      </div> 

    </Card>
    </Grid>
  );
}
