import React from 'react';
import axios from "axios";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  usePaginatedQuery,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from 'react-query'
import fetchStars from '../api/fetchStars.js';
import Button from '@material-ui/core/Button';
import { ReactQueryDevtools } from 'react-query-devtools'

import StarCard from 'components/StarCard'
import StarCardBig from 'components/StarCardBig'

const useStyles = makeStyles((theme) => ({ }));

function StarList() {

  const cache = useQueryCache()
  const [page, setPage] = React.useState(0)
  
  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(['stars', page], fetchStars, {})

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0)
    if (latestData?.hasMore) {
      cache.prefetchQuery(['stars', page + 1], fetchStars)
    }
  }, [latestData, fetchStars, page])

  return (
    <div>
      <div>
        <span>Current Page: {page + 1}</span>
        <Button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </Button>{' '}
        <Button
          onClick={() => setPage(old => (!latestData || !latestData.hasMore ? old : old + 1)) }
          disabled={!latestData || !latestData.hasMore}
        >
          Next Page
        </Button>
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <div>Error: {error.message}</div>
      ) : (
       
        <Grid container spacing={4}>
          {resolvedData.data.map(project => (       
            <StarCardBig key={project.id} article={project} />
          ))} 
        </Grid>

      )}
      <div>
        <span>Current Page: {page + 1}</span>
        <Button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </Button>{' '}
        <Button
          onClick={() => setPage(old => (!latestData || !latestData.hasMore ? old : old + 1)) }
          disabled={!latestData || !latestData.hasMore}
        >
          Next Page
        </Button>
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
      <ReactQueryDevtools />
    </div>
  )
}

export default StarList
