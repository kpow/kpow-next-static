/* eslint-disable no-return-assign */
import Layout from '@components/Layout';
import { Container, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Title from '@components/shared/Title';

import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from '../src/photos';

const shuffle = (array) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  [...Array(array.length)]
    .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
    // eslint-disable-next-line no-param-reassign
    .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

shuffle(photos);

const PmonkPix = ({ title, description }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    console.log(event);
    console.log(photo);
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="md">
        <Title>
          pmonk artifacts
        </Title>
        <Paper>
          <Box component="div" style={{ maxHeight: '370px', overflow: 'hidden' }}>
            <img alt="pmonk" src="../static/pmonk/pheader.jpg" style={{ width: '100%' }} />
          </Box>
          <Gallery photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </Paper>
      </Container>
    </Layout>
  );
};

export default PmonkPix;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
