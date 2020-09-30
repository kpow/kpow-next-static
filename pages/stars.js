import Layout from '@components/Layout';
import {
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import getStars from '../api/getStars.js'

const queryCache = new QueryCache()

function Posts() {
  const { status, data, error, isFetching } = getStars(10);
  return (
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
                  <img
                    src={post.lead_image_url}
                    />
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
    </div>
  );
}

const Stars = ({title, description, ...props }) => {

  return (
      <Layout pageTitle={title} description={description}>
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Posts />
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
