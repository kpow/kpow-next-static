/* eslint-disable arrow-body-style */
import React from 'react';
import Layout from '@components/Layout';
import { Container, Grid } from '@material-ui/core';
import IndexCard from '@components/shared/IndexCard';

const Pmonk = ({ title, description }) => {
  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="md">

        <Grid container spacing={5}>
          <IndexCard title="artifacts" button="go" link="/pmonk-artifacts" image="/static/pmonk_thumb.jpg" />
          <IndexCard title="firehose" button="drink" link="/pmonk-firehose" image="/static/pmonk_thumb.jpg" />
          <IndexCard title="video" button="checkit" link="/pmonk-youtube" image="/static/pmonk_thumb.jpg" />
        </Grid>
      </Container>
    </Layout>
  );
};

export default Pmonk;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
