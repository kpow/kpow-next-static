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
import BookCard from 'components/BookCard';
import BookCardSkeleton from 'components/BookCardSkeleton';
import Paginate from 'components/Paginate';
import BookHero from 'components/BookHero';
import Title from 'components/Title'

const queryCache = new QueryCache()

function BookList({howMany}) {
  const cache = useQueryCache()
  const [page, setPage] = React.useState(1)
  
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
      cache.prefetchQuery(['books', (Number(page) + 1)], fetchBooks)
    }
  }, [latestData, fetchBooks, page])

  return (
    <>
      <Box style={{display:'flex'}} justifyContent="space-between" flexDirection={ page >= 1 ? "row" : "column" }>
        {page >= 1 || howMany == 3 ? 
          <Box style={{display:'flex'}} flexDirection="row">
            <Title> Book feed </Title> 

            {page > 0 ? null : 
              <div style={{display:'inline-block', textAlign:'right', margin:'20px 20px 20px'}}>
                <Link href="/Bookfeed">
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
          : <BookHero />} 
        
        <Paginate 
          howMany={howMany} 
          page={page} 
          latestData={latestData} 
          isFetching={isFetching}
          setPage={setPage}
        /> 
      </Box>
      
      <ReactQueryCacheProvider queryCache={queryCache}>
        {status === 'loading' ? (
          <Grid container spacing={2}>
            <BookCardSkeleton />
            <BookCardSkeleton />
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
                <BookCardSkeleton />
                <BookCardSkeleton />
              </>
            : <>
              {resolvedData.data.map(project => (       
                <BookCard key={project.id._text} article={project} />
              ))} 
              </>
            } 
          </Grid>
        )}
      </ReactQueryCacheProvider>

      <Paginate 
        howMany={howMany} 
        page={page} 
        latestData={latestData} 
        isFetching={isFetching}
        setPage={setPage}
      /> 
      <ReactQueryDevtools />
    </>
  )
}

export default BookList
