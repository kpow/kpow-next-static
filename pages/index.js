import Link from 'next/link'
import Layout from '@components/Layout';
import Button from '@material-ui/core/Button';
import ProjectList from '@components/ProjectList';
import Grid from '@material-ui/core/Grid'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Title from '@components/Title';
import {
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

import StarList from 'components/StarList';
import BookList from 'components/BookList';
import fetchStars from '../api/fetchStars.js';
import fetchBooks from '../api/fetchBooks.js';
import getPosts from '@utils/getPosts';

const queryCache = new QueryCache()
const bookQueryCache = new QueryCache()

const Index = ({ projects, title, description, ...props }) => {

  // const cache = useQueryCache();
  const { status, data, error, isFetching } = fetchStars(1,3);
  const { status:bookStatus, data:bookData, error:bookError, isFetching:bookIsFetching,} = fetchBooks(1,6);

  return (
    
      <Layout pageTitle={title} description={description}>
        
        <Title>
          k-projects
        </Title>
        <ProjectList projects={projects} />

        {bookStatus === "loading" ? ( 

          <Grid container spacing={4}>
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
          </Grid>

        ) : bookStatus === "error" ? ( <span>Error: {bookError.message}</span> ) : (
          <>
            <div>
              <ReactQueryCacheProvider queryCache={bookQueryCache}>
                <BookList howMany={6}/>
              </ReactQueryCacheProvider>  
            </div>
            <div>{bookIsFetching ? "Background Updating..." : " "}</div>
          </>
        )}
        
        {status === "loading" ? ( 

            <Grid container spacing={4}>
              <StarCardBigSkeleton />
              <StarCardBigSkeleton />
              <StarCardBigSkeleton />
            </Grid>

        ) : status === "error" ? ( <span>Error: {error.message}</span> ) : (
          <>
            <div>
            <ReactQueryCacheProvider queryCache={queryCache}>
              <StarList howMany={3}/>
            </ReactQueryCacheProvider>  
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}

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
