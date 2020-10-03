import React from 'react'
import Layout from '@components/Layout';
import BookList from 'components/BookList';

export default function Bookfeed({title, description, ...props }) {
  return (
    <Layout pageTitle={title} description={description}>
      <BookList howMany={12}/>
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
