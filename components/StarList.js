import React from 'react';
import Link from 'next/link';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Divider from '@material-ui/core/Divider'

import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache
} from 'react-query';
import fetchStars from '../api/fetchStars.js';
import { ReactQueryDevtools } from '../node_modules/react-query-devtools/dist/react-query-devtools.production.min.js';
import StarCardBig from '@components/StarCard';
import Typography from '@material-ui/core/Typography';

import StarCardBigSkeleton from '@components/StarCardSkeleton';
import Paginate from '@components/Paginate';
import Hero from '@components/Hero';
import Title from 'components/Title';
import useMediaQuery from '@material-ui/core/useMediaQuery'


const queryCache = new QueryCache()

function StarList({howMany}) {
  const cache = useQueryCache()
  const [page, setPage] = React.useState(0)
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const flexDirect = matches ? 'row' : 'column';
  
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
    // this hasMore stops the home page from prefetching
    if (latestData?.hasMore) {
      const nextPage = page+1
      cache.prefetchQuery(['stars', nextPage], fetchStars)
    }
  }, [latestData, fetchStars, page])

  return (
    <>
      <Box>
        {/* this condition is for the home page list */}
        { howMany <= 5 ? 
            <Box 
            style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} 
            flexDirection={flexDirect}
            >
              <Box style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                <Title> Star feed </Title> 
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {resolvedData?.totalItems} starred articles :) 
                </Typography>
              
              </Box>
              <Box>  
                <Link href="/bookfeed">
                  <Button
                    size="small" 
                    variant="outlined" 
                    endIcon={<NavigateNextIcon />}
                    children="see more"
                  />
                </Link> 
              </Box>                
            </Box>
            
          : <>
              {/* this condition is for the first listing */}  
              <Box
                style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} 
                flexDirection={flexDirect}
              >
                  <Box style={{display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    {page==0 ? 
                      <Hero 
                        title="Star feed"
                        content={`I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :)`}
                      />
                    : <> 
                      <Title> book feed </Title> 
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {resolvedData?.totalItems} starred articles :) 
                      </Typography> 
                      </>
                    }
                  </Box>
                  <Box style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} >
                    {page==0 ? 
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {resolvedData?.totalItems} starred articles :) 
                      </Typography> 
                    : <> </>}
                    <Paginate 
                      page={page}
                      howMany={howMany}
                      total={resolvedData?.totalItems} 
                      latestData={latestData} 
                      isFetching={isFetching}
                      setPage={setPage}
                    />
                    
                  </Box> 
                </Box>
            </>
          }  
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
      :<></> }
      <ReactQueryDevtools />
    </>
  )
}

export default StarList
