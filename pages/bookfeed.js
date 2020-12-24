import React from 'react'
import Layout from '@components/Layout';
import BookList from '@components/books/BookList';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery'


export default function Bookfeed({title, description, ...props }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const numberOfItems = matches ? 8 : 4;

  return (
    <Layout pageTitle={title} description={description}>
      <BookList howMany={numberOfItems}/>
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
