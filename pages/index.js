import Link from 'next/link'
import Layout from '@components/Layout';
import Button from '@material-ui/core/Button';
import ProjectList from '@components/ProjectList';
import Grid from '@material-ui/core/Grid'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import StarList from '@components/StarList';
import StarCardBigSkeleton from 'components/StarCardBigSkeleton'

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
          <div style={{display:'inline-block', textAlign:'right', margin:'20px 20px 20px'}}>
            <Link href="/starfeed">
              <Button
                size="small" 
                variant="outlined" 
                endIcon={<NavigateNextIcon />}
              >
                see more
              </Button>
            </Link>
          </div>
        </Title>
        
        <ReactQueryCacheProvider queryCache={queryCache}>
          {status === "loading" ? ( 

              <Grid container spacing={4}>
              <StarCardBigSkeleton />
              <StarCardBigSkeleton />
              <StarCardBigSkeleton />
              </Grid>

          ) : status === "error" ? ( <span>Error: {error.message}</span> ) : (
            <>
              <div>
                <StarList howMany={3}/>
              </div>
              <div>{isFetching ? "Background Updating..." : " "}</div>
            </>
          )}
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
