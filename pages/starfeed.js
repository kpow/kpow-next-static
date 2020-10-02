import React from 'react'
import Layout from '@components/Layout';
import StarList from 'components/StarList';

export default function Starfeed({title, description, ...props }) {
  return (
    <Layout pageTitle={title} description={description}>
      <StarList howMany={9}/>
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
