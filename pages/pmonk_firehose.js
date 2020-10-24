import Layout from '@components/Layout'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Title from '@components/Title';
import React, { useState, useCallback } from "react";
import pmonks from "../src/pmonk";
import { Masonry } from "masonic";


const randomChoice = (items) => items[Math.floor(Math.random() * items.length)];

const ImageCard = ({ data: { id, src } }) =>{
  return (
  <div key={id} style={{ display:'flex', flexDirection:'column', width:'100%', transition:'transform 100ms ease-in-out' }}>
    <img style={{width:'100%', display:'block'}} src={src.src} />
  </div>
)};


const PmonkFirehose = ({ title, description, ...props }) => {

  const [items] = React.useState(() =>
    Array.from(Array(pmonks.length), (index) => ({
      id: index,
      src: randomChoice(pmonks)
    }))
  );
  
  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="lg">
      <Title>
        pmonk firehose
      </Title>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {pmonks.length} images randomly served up :)
      </Typography> 
      <div>
        <Masonry
          items={items}
          columnGutter={8}
          columnWidth={230}
          overscanBy={5}
          render={ImageCard}
        />
      </div> 
      </Container>
    </Layout> 
  );
}

export default PmonkFirehose

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
