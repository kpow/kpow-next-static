import Layout from '@components/Layout';
import Divider from '@material-ui/core/Divider'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useTheme } from '@material-ui/core/styles';
import Title from '@components/Title';
import {
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

import StarList from 'components/StarList';
import BookList from 'components/BookList';
import ProjectListImages from '@components/ProjectListImages';
import fetchStars from '../api/fetchStars.js';
import fetchBooks from '../api/fetchBooks.js';
import getPosts from '@utils/getPosts';

const queryCache = new QueryCache()
const bookQueryCache = new QueryCache()

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Index = ({ projects, title, description, ...props }) => {
  const theme = useTheme();
  const { status, data, error, isFetching } = fetchStars(1,3);
  const { status:bookStatus, data:bookData, error:bookError, isFetching:bookIsFetching,} = fetchBooks(1,4);

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    
      <Layout pageTitle={title} description={description}>
        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          open={open} autoHideDuration={8000} 
          onClose={handleClose}
        >
          <Alert 
            onClose={handleClose} 
            severity="info" 
            style={{textAlign:'left', marginTop: theme.spacing(7) }}
          >
            Hi! this my site :) You'll find my digital collections, coding experiments and my public info. Hopefully, it's working and have fun poking around.
          </Alert>
        </Snackbar>

        <Divider style={{marginTop:'40px'}} />
        
        <Title>
          projects
        </Title>

        <ProjectListImages projects={projects} />

        <Divider style={{marginTop:'40px'}} />
        
        {bookStatus === "loading" ? ( 
          <></>
        ) : bookStatus === "error" ? ( <span>Error: {bookError.message}</span> ) : (
          <>
            <div>
              <ReactQueryCacheProvider queryCache={bookQueryCache}>
                <BookList howMany={4}/>
              </ReactQueryCacheProvider>  
            </div>
            <div>{bookIsFetching ? "Background Updating..." : " "}</div>
          </>
        )}
        
        <Divider style={{marginTop:'40px'}}/>

        {status === "loading" ? ( 
          <></>
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

        <Divider style={{marginTop:'40px'}}/>
        
        <Title>
          instagram
        </Title>
        <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2"></div>

        <Divider style={{marginTop:'40px'}} />
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
