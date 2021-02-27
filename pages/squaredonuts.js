import Layout from '@components/Layout'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Link from 'next/link';
import NavigateNextIcon from '@material-ui/icons/NavigateNextOutlined'
import Divider from '@material-ui/core/Divider'
import Title from '@components/shared/Title';
import dynamic from "next/dynamic";

const Donuts = ({ title, description, ...props }) => {

  const MapWithNoSSR = dynamic(() => import("../components/DonutMap"), {
    ssr: false
  });

  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="md">

        <MapWithNoSSR />

      </Container>
    </Layout> 
  );
}

export default Donuts

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}


