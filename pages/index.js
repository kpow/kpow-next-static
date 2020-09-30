import Layout from '@components/Layout';
import PostList from '@components/PostList';
import Title from '@components/Title';
import {
  useQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

import getStars from '../api/getStars.js'
import getPosts from '@utils/getPosts'

const queryCache = new QueryCache()

const Index = ({ posts, title, description, ...props }) => {

  const cache = useQueryCache();
  const { status, data, error, isFetching } = getStars(3);

  return (
    
      <Layout pageTitle={title} description={description}>
        <Title>
          k-projects
        </Title>
        <PostList posts={posts} />
        <Title>
          stars
        </Title>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <div>
              {status === "loading" ? (
                "Loading..."
              ) : status === "error" ? (
                <span>Error: {error.message}</span>
              ) : (
                <>
                  <div>
                    {data.map((post) => (
                      <p key={post.id}>
                        <span>
                        {post.id} - {post.title}
                        </span>
                      </p>
                    ))}
                  </div>
                  <div>{isFetching ? "Background Updating..." : " "}</div>
                </>
              )}
          </div>
        </ReactQueryCacheProvider>
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
