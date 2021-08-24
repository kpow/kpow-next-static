import React, { useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import Title from '@components/shared/Title';
import Layout from '@components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import VideoCard from '@components/VideoCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  videoContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%',
  },
  responsiveIframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
  },
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
          src={`https://www.youtube.com/embed/${selectedValue.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Dialog>
  );
}

export default function VideoPage({ data }) {
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
          youtube is full of great live music. Some of my favorites I&#39;ve run into.
        </p>

        <Grid container spacing={2}>
          {data.items.map(({ snippet = {} }) => {
            const { description, title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <VideoCard
                key={title}
                description={description}
                title={title}
                resourceId={resourceId}
                medium={medium}
                handleClickOpen={handleClickOpen}
              />
            );
          })}
        </Grid>
      </Container>
      <PlayerDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </Layout>
  );
}

export async function getStaticProps() {
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLLnMxi7_aEL7eyC1HiZ2d1d4ce5irHaTQ&key=${API_KEY}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
