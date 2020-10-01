import React from 'react';
import axios from "axios";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  usePaginatedQuery,
  useQueryCache,
} from 'react-query'
import fetchStars from '../api/fetchStars.js';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { ReactQueryDevtools } from 'react-query-devtools'
import StarCardBig from 'components/StarCardBig'
import StarCardBigSkeleton from 'components/StarCardBigSkeleton'


const Pager = ({page, latestData, isFetching, howMany, setPage}) =>{
  if(howMany > 8){
    return(
        <div style={{textAlign:'right', margin:'20px 0 20px'}}>
          {isFetching ? <Chip size="small" label='loading . . .'/>: null}{' '}
          <Button
            size="small" 
            variant="outlined" 
            startIcon={<NavigateBeforeIcon />}
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Prev
          </Button>
          <span style={{margin:'10px'}}>
            <Chip size="medium" label={page + 1}/>
          </span>
          <Button
            size="small" 
            variant="outlined" 
            endIcon={<NavigateNextIcon />}
            onClick={() => setPage(old => (!latestData || !latestData.hasMore ? old : old + 1)) }
            disabled={!latestData || !latestData.hasMore}
          >
            Next
          </Button>
        </div>
    )
  }else{
    return null
  }
}

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
    if (latestData?.hasMore) {
      cache.prefetchQuery(['stars', (Number(page) + 1)], fetchStars)
    }
  }, [latestData, fetchStars, page])

  return (
    <div>

     <Pager 
        howMany={howMany} 
        page={page} 
        latestData={latestData} 
        isFetching={isFetching}
        setPage={setPage}
      /> 

      {status === 'loading' ? (
        <Grid container spacing={4}>
          <StarCardBigSkeleton />
          <StarCardBigSkeleton />
          <StarCardBigSkeleton />
        </Grid>
      ) : status === 'error' ? (
        <div>Error: {error.message}</div>
      ) : (
       
        <Grid container spacing={4}>
          {resolvedData.data.map(project => (       
            <StarCardBig key={project.id} article={project} />
          ))} 
        </Grid>

      )}

      <Pager 
        howMany={howMany} 
        page={page} 
        latestData={latestData} 
        isFetching={isFetching}
        setPage={setPage}
      /> 
      
      <ReactQueryDevtools />
    </div>
  )
}

export default StarList
