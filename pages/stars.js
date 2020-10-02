import Layout from '@components/Layout';
import {
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import StarList from 'components/StarList'
import Title from '@components/Title'
import getStars from '../api/getStars.js'

const queryCache = new QueryCache()

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing( 0, 0),
  },
  heroButtons: { 
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  paperPadding: { 
    padding: theme.spacing(4),
    margin: theme.spacing(2,0)  
  },
}));


const Stars = ({title, description, ...props }) => {
  const { status, data, error, isFetching } = getStars(1,12);
  let screenData = data
  const classes = useStyles();

  const getMore = ()=>{
    console.log('noo')
    // let { data } = getStars(2,2);
    // screenData = data;
  }

  return (
      <Layout pageTitle={title} description={description}>
         {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
          <Paper elevation={3} className={classes.paperPadding}>
            <Title>
              star feed
            </Title>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :) 
            </Typography>
          </Paper>
          </Container> 
        </div>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <div>
              {status === "loading" ? ( "Loading...") : status === "error" ? ( <span>Error: {error.message}</span> ) : (
                <>
                  <div>
                    <StarList stars={screenData} />
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