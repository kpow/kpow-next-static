import React, { useState, useCallback } from "react";
import { Box, Container, Grid } from '@material-ui/core';
import Title from '@components/Title';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Layout from '@components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 240,
  },
  content: {
    maxHeight:185,
    height: 185,
    overflow:'hidden',
    marginBottom: 35
  },
  videoContainer: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    paddingTop: "56.25%"
  },
  responsiveIframe: {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    width: "100%",
    height: "100%"
  }
});

function PlayerDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} fullWidth maxWidth="lg" open={open}>
      <Box className={classes.videoContainer}>
        <embed 
          className={classes.responsiveIframe}
          src={"https://www.youtube.com/embed/"+selectedValue.id} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></embed> 
      </Box>
    </Dialog>
  );
}

export default function VideoPage({ data }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});

  const handleClickOpen = (value) => {
    setOpen(true);
    setSelectedValue(value);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Layout pageTitle="youtube" description="youtube">
      <Container maxWidth="lg">
        <Title>
          live youtube
        </Title>
        <p>
          youtube is full of great live music. Some of my favorites I've run into.
        </p>

        <Grid container spacing={2}>
          {data.items.map(({ id, snippet = {} }) => {
            const { description, title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <Grid key={id} container item xs={12} sm={6} md={4} style={{margin:'0 auto'}}>
                <Card className={classes.root} onClick={ ( ) => { handleClickOpen({id:resourceId.videoId}) } }>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={medium.url}
                      title={ title }
                    />
                    <CardContent className={classes.content}>
                      <Typography gutterBottom variant="h5" component="h2">
                        { title }
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
      <PlayerDialog selectedValue={selectedValue} open={open} onClose={handleClose} />  
    </Layout>
  )
}

export async function getStaticProps() {
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLLnMxi7_aEL7eyC1HiZ2d1d4ce5irHaTQ&key=${API_KEY}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
