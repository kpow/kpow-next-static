import React from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache
} from 'react-query';

import fetchBooks from '../api/fetchBooks.js';
import { ReactQueryDevtools } from 'react-query-devtools';
import BookCardFull from 'components/BookCardFull';
import BookCardSkeleton from 'components/BookSkeleton';
import Paginate from 'components/Paginate';
import Hero from 'components/Hero';
import Title from 'components/Title'

const queryCache = new QueryCache()

function BookList({howMany}) {
  const cache = useQueryCache()
  const [page, setpage] = React.useState(0)
  
  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(['books', page, howMany], fetchBooks, {})

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (latestData?.hasMore) {
      const nextPage = page+1
      cache.prefetchQuery(['books', nextPage], fetchBooks)
    }
  }, [latestData, fetchBooks, page])

  return (
    <>
      <Box style={{display:'flex'}} justifyContent="space-between" flexDirection={ page >= 1 ? "row" : "column" }>
        {page >= 1 || howMany == 4 ? 
          <Box style={{display:'flex', alignItems:'flex-end'}} flexDirection="row">
            <Title> Book feed </Title> 

            {page > 0 ? null : 
              <div style={{display:'inline-block', minWidth:'110px',textAlign:'right', margin:'20px 20px 20px'}}>
                <Link href="/bookfeed">
                  <Button
                    size="small" 
                    variant="outlined" 
                    endIcon={<NavigateNextIcon />}
                    children="see more"
                  />
                </Link>
              </div>
            }

          </Box>
          : <Hero 
              title="book feed"
              content={`Here is my list of books - I have a "thing" for science fiction.`}
            />
          } 
        
        {howMany > 4 ? 
          <Paginate 
            page={page} 
            latestData={latestData} 
            isFetching={isFetching}
            setPage={setpage}
          /> 
        : <></> }  
      </Box>
      
      <ReactQueryCacheProvider queryCache={queryCache}>
        {status === '!loading' ? (
          <Grid container spacing={2}>
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
         
          </Grid>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (

          <Grid container spacing={3}>
            {isFetching ? 
              <>
                <BookCardSkeleton />
                <BookCardSkeleton />
                <BookCardSkeleton />
                <BookCardSkeleton />
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

      {howMany > 4 ? 
        <Paginate 
          page={page} 
          latestData={latestData} 
          isFetching={isFetching}
          setPage={setpage}
        /> 
      : <></> }           
     
      <ReactQueryDevtools />
    </>
  )
}

export default BookList
