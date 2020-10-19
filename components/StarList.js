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
import StarCardBig from '@components/StarCard';
import Typography from '@material-ui/core/Typography';

import StarCardBigSkeleton from '@components/StarCardSkeleton';
import StarPaginate from '@components/Paginate';
import Hero from '@components/Hero';
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
  } = usePaginatedQuery(['stars', page, howMany], fetchStars, {})

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0)
    // this howmany stops the home page from prefetching
    if (latestData?.hasMore) {
      const nextPage = page+1
      cache.prefetchQuery(['stars', nextPage], fetchStars)
    }
  }, [latestData, fetchStars, page])

  return (
    <>
      <Box style={{display:'flex'}} justifyContent="space-between" flexDirection={ page >= 1 ? "row" : "column" }>
        {page >= 1 || howMany == 3 ? 
            <Box style={{display:'flex',alignItems:'center'}} flexDirection="row">
              <Title> star feed </Title> 

            
              {page > 0 ? null : 
                <div style={{display:'flex', minWidth:'110px',textAlign:'right', margin:'20px 20px 20px'}}>
                  
                  {isFetching ? <></> : 
                    <Typography variant="subtitle1" color="textSecondary">
                      {resolvedData.totalStars} starred articles :) 
                    </Typography>
                  }
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
          : <Hero 
              title="star feed"
              content={`I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :)`}
            />
          }  
        
        {howMany>4 ?
          <Box style={{display:'flex',alignItems:'center', justifyContent:'flex-end'}} flexDirection="row"> 
            {isFetching ? <></> : 
              <>
              <Typography variant="subtitle1" color="textSecondary">
                {resolvedData.totalStars} starred articles :)&nbsp;&nbsp;
              </Typography>
              
              <StarPaginate 
                page={page}
                howMany={howMany}
                total={resolvedData.totalStars} 
                latestData={latestData} 
                isFetching={isFetching}
                setPage={setPage}
              /> 
            </>
            }  
          </Box>
          :<></> }
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
      {howMany>4 ?
        <>
        {isFetching ?  <></> : 
          <>
            <StarPaginate 
              page={page}
              howMany={howMany}
              total={resolvedData.totalStars}  
              latestData={latestData} 
              isFetching={isFetching}
              setPage={setPage}
            /> 
          </>
        }</> :<></> }
      <ReactQueryDevtools />
    </>
  )
}

export default StarList
