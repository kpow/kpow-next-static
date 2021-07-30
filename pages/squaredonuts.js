import Layout from '@components/Layout'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import dynamic from "next/dynamic";

const Donuts = ({ title, description, ...props }) => {

  // filter array by a property 
  const filter = (arr, prop, value) => arr.filter(item => item[prop] === value);
  // remove duplicates from array
  const unique = (arr) => arr.filter((item, pos, self) => self.indexOf(item) === pos);
  // sort array by property
  const sort = (arr, prop) => arr.sort((a, b) => a[prop] - b[prop]);
      
  const MapWithNoSSR = dynamic(() => import("../components/DonutMap"), {
    ssr: false
  });

  return (
    <Layout pageTitle={`${title} | Donuts`} description={description}>
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


