import React from 'react'
import Layout from '@components/Layout';
import StarList from '@components/stars/StarList';
import { useRouter, withRouter } from "next/router";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery'


export default function Starfeed({title, description, ...props }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const numberOfItems = matches ? 9 : 4;

  return (
    <Layout pageTitle={title} description={description}>
  
      <StarList howMany={numberOfItems}/>
      
    </Layout>
  )
}

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
