import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';;
import Divider from '@material-ui/core/Divider'
import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache
} from 'react-query';
import fetchBooks from '../../api/fetchBooks.js';
import { ReactQueryDevtools } from 'react-query-devtools';
import BookCardFull from '@components/books/BookCardFull';
import BookCardSkeleton from '@components/books/BookCardSkeleton';
import Paginate from '@components/shared/Paginate';
import ListHeader from '@components/shared/ListHeader';
import { useRouter, withRouter } from "next/router";

let initalLoaded = false;
const queryCache = new QueryCache()

function BookList({howMany}) {
  const cache = useQueryCache()
  const [page, setPage] = React.useState(0)
  const theme = useTheme();
  const { query: { p } } = useRouter()
  const router = useRouter();
  const path = router.pathname;

  let skeletons = []
  for(let i=0; i<howMany; i++){
    skeletons.push(i)
  } 
  
  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(['books', page, howMany], fetchBooks, {staleTime:Infinity})

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0)

    // this added pgination to url, need to figure out better way breaks the back button
    if(p>1 && !initalLoaded){
      initalLoaded = true;
      setPage(Number(p))
      history.pushState(null, '', '?p='+(page));
    }else{
      if(path != '/'){
        history.pushState(null, '', '?p='+(page+1));
      }
    }

    if (latestData?.hasMore) {
      const nextPage = page+1
      cache.prefetchQuery(['books', nextPage, howMany], fetchBooks)
    }
  }, [latestData, fetchBooks, page. howMany])

  return (
    <>
      <ListHeader 
        howMany={howMany} 
        resolvedData={resolvedData} 
        latestData={latestData} 
        isFetching={isFetching} 
        page={page} 
        setPage={setPage}
        seeMore="/bookfeed"
        title="book feed"
        heroContent={`Here is my list of books; I've read, want to read, or reading - I have a "thing" for science fiction.`}
        totalItemsLabel=" books on the shelf "
      />  
      <ReactQueryCacheProvider queryCache={queryCache}>
        {status === '!loading' ? (
          <Grid container spacing={0}>
            {skeletons.map(id => (       
              <BookCardSkeleton key={id}/>
            ))} 
          </Grid>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (

          <Grid container spacing={3}>
            {isFetching ? 
              <>
                {skeletons.map(id => (       
                  <BookCardSkeleton key={id}/>
                ))} 
              </>
            : <>
              {resolvedData.data.map(project => (       
                <BookCardFull key={project.id._text} article={project} />
              ))} 
              </>
            } 
          </Grid>
          
        )}
      </ReactQueryCacheProvider>
      {path != '/' ? 
        <>
          <Divider style={{marginBottom:'20px',marginTop:'20px'}}/>            
          <Paginate 
            page={page}
            howMany={howMany}
            total={resolvedData?.totalItems}  
            latestData={latestData} 
            isFetching={isFetching}
            setPage={setPage}
          /> 
        </>
      : <></> }           
     
      <ReactQueryDevtools />
    </>
  )
}

export default BookList
