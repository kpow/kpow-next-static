import React from 'react';
import Link from 'next/link';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Divider from '@material-ui/core/Divider'

import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache
} from 'react-query';

import fetchBooks from '../api/fetchBooks.js';
import { ReactQueryDevtools } from 'react-query-devtools';
import BookCardFull from 'components/BookCardFull';
import BookCardSkeleton from 'components/BookCardSkeleton';
import Paginate from 'components/Paginate';
import Hero from 'components/Hero';
import Title from 'components/Title';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const queryCache = new QueryCache()

function BookList({howMany}) {
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
      <Box>
        {/* this condition is for the home page list */}
        { howMany <= 5 ? 
            <Box 
            style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} 
            flexDirection={flexDirect}
            >
              <Box style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                <Title> book feed </Title> 
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {resolvedData?.totalItems} books in shelves :) 
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
                        title="book feed"
                        content={`Here is my list of books; I've read, want to read, or currently reading - I have a "thing" for science fiction.`}
                      />
                    : <> 
                      <Title> book feed </Title> 
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {resolvedData?.totalItems} books in shelves :) 
                      </Typography> 
                      </>
                    }
                  </Box>
                  <Box style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} >
                    {page==0 ? 
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {resolvedData?.totalItems} books in shelves :) 
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
        {status === '!loading' ? (
          <Grid container spacing={0}>
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
