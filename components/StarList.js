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
import fetchStars from '../api/fetchStars.js';
import { ReactQueryDevtools } from 'react-query-devtools';
import StarCardBig from 'components/StarCardBig';
import StarCardBigSkeleton from 'components/StarCardBigSkeleton';
import StarPaginate from 'components/StarPaginate';
import StarHero from 'components/StarHero';
import Title from 'components/Title'

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
      <Box style={{display:'flex'}} justifyContent="space-between" flexDirection={ page >= 1 ? "row" : "column" }>
        {page >= 1 || howMany == 3 ? 

          <Box style={{display:'flex'}} flexDirection="row">
            <Title> star feed </Title> 

            {page > 0 ? null : 
              <div style={{display:'inline-block', textAlign:'right', margin:'20px 20px 20px'}}>
                <Link href="/starfeed">
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
          : <StarHero />} 
        
        <StarPaginate 
          howMany={howMany} 
          page={page} 
          latestData={latestData} 
          isFetching={isFetching}
          setPage={setPage}
        /> 
        
      </Box>
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
