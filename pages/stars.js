import Layout from '@components/Layout';
import {
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import StarList from 'components/StarList'
import Title from '@components/Title'
import getStars from '../api/getStars.js'

const queryCache = new QueryCache()

const Stars = ({title, description, ...props }) => {
  const { status, data, error, isFetching } = getStars(12);

  return (
      <Layout pageTitle={title} description={description}>
         <Title>
          star feed
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
      </Layout>
  )
}

export default Stars

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
