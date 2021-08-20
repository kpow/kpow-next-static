/* eslint-disable arrow-body-style */
import React from 'react';
import Layout from '@components/Layout';
import { Container, Grid, Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import NavigateNextIcon from '@material-ui/icons/NavigateNextOutlined';
import Divider from '@material-ui/core/Divider';
import Title from '@components/shared/Title';

const Pmonk = ({ title, description }) => {
  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="md">

        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4} style={{ margin: '0 auto' }}>
            <Divider style={{ marginTop: '10px' }} />
            <Box style={{ display: 'flex' }}>
              <Title>
                artifacts
              </Title>
              <Link href="/pmonk-artifacts">
                <Button
                  style={{ marginTop: '15px' }}
                  size="small"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                >
                  go
                </Button>
              </Link>
            </Box>
            <Divider style={{ marginTop: '10px' }} />
            <Link href="/pmonk-artifacts">
              <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <img alt="pmonk" style={{ width: '100%' }} src="/static/pmonk_thumb.jpg" />
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ margin: '0 auto' }}>
            <Divider style={{ marginTop: '10px' }} />
            <Box style={{ display: 'flex' }}>
              <Title>
                firehose
              </Title>
              <Link href="/pmonk-firehose">
                <Button
                  style={{ marginTop: '15px' }}
                  size="small"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                >
                  drink
                </Button>
              </Link>
            </Box>
            <Divider style={{ marginTop: '10px' }} />
            <Link href="/pmonk-firehose">
              <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <img alt="pmonk" style={{ width: '100%' }} src="/static/pmonk_thumb.jpg" />
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ margin: '0 auto' }}>
            <Divider style={{ marginTop: '10px' }} />
            <Box style={{ display: 'flex' }}>
              <Title>
                video
              </Title>

              <Link href="/pmonk-youtube">
                <Button
                  style={{ marginTop: '15px' }}
                  size="small"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                >
                  checkit
                </Button>
              </Link>
            </Box>
            <Divider style={{ marginTop: '10px' }} />
            <Link href="/pmonk-youtube">
              <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <img alt="pmonk" style={{ width: '100%' }} src="/static/pmonk_thumb.jpg" />
              </Paper>
            </Link>
          </Grid>
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
