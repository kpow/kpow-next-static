import Layout from '@components/Layout';
import PostList from '@components/PostList';
import Title from '@components/Title';

import getPosts from '@utils/getPosts'

const Index = ({ posts, title, description, ...props }) => {
  return (
    
      <Layout pageTitle={title} description={description}>
        <Title>
          k-projects
        </Title>
        <PostList posts={posts} />
      </Layout>
    
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
