import Layout from '@components/Layout';
import ProjectList from '@components/ProjectList';
import StarList from '@components/StarList';
import Title from '@components/Title';
import {
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

import getStars from '../api/getStars.js'
import getPosts from '@utils/getPosts'

const queryCache = new QueryCache()

const Index = ({ projects, title, description, ...props }) => {

  const cache = useQueryCache();
  const { status, data, error, isFetching } = getStars(1,3);

  return (
    
      <Layout pageTitle={title} description={description}>
        
        <Title>
          k-projects
        </Title>
        <ProjectList projects={projects} />
        <Title>
          stars
        </Title>

        <ReactQueryCacheProvider queryCache={queryCache}>
          <div>
              {status === "loading" ? ( "Loading...") : status === "error" ? ( <span>Error: {error.message}</span> ) : (
                <>
                  <div>
                    <StarList stars={data} />
                  </div>
                  <div>{isFetching ? "Background Updating..." : " "}</div>
                </>
              )}
          </div>
        </ReactQueryCacheProvider>
        <Title>
          books
        </Title>
  
      </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const projects = ((context) => {
    return getPosts(context)
  })(require.context('../projects', true, /\.md$/))

  return {
    props: {
      projects,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
