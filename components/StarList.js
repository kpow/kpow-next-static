import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache
} from 'react-query';
import fetchStars from '../api/fetchStars.js';
import { ReactQueryDevtools } from 'react-query-devtools';
import StarCardBig from 'components/StarCardBig';
import StarCardBigSkeleton from 'components/StarCardBigSkeleton';
import StarPaginate from 'components/StarPaginate';
import StarHero from 'components/StarHero';

const queryCache = new QueryCache()

function StarList({howMany}) {
  const cache = useQueryCache()
  const [page, setPage] = React.useState(0)
  
  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(['projects', page, howMany], fetchStars, {})

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (latestData?.hasMore) {
      cache.prefetchQuery(['projects', (Number(page) + 1)], fetchStars)
    }
  }, [latestData, fetchStars, page])

  return (
    <>
      {page >= 1 || howMany == 3 ? null : <StarHero />} 
      
      <StarPaginate 
        howMany={howMany} 
        page={page} 
        latestData={latestData} 
        isFetching={isFetching}
        setPage={setPage}
      /> 
      <ReactQueryCacheProvider queryCache={queryCache}>
        {status === 'loading' ? (
          <Grid container spacing={4}>
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
            <StarCardBigSkeleton />
          </Grid>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (

          <Grid container spacing={4}>
            {isFetching ? 
              <>
                <StarCardBigSkeleton />
                <StarCardBigSkeleton />
                <StarCardBigSkeleton />
                <StarCardBigSkeleton />
                <StarCardBigSkeleton />
                <StarCardBigSkeleton />
              </>
            : <>
              {resolvedData.data.map(project => (       
                <StarCardBig key={project.id} article={project} />
              ))} 
              </>
            } 
          </Grid>
        )}
      </ReactQueryCacheProvider>

      <StarPaginate 
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

export default StarList
