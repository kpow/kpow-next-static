import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
import StarCardBigSkeleton from '@components/StarCardSkeleton';
import Paginate from '@components/Paginate';;
import ListHeader from '@components/ListHeader';
import { useRouter, withRouter } from "next/router";

let initalLoaded = false;
const queryCache = new QueryCache()

function StarList({howMany}) {
  const cache = useQueryCache()
  const [page, setPage] = React.useState(0)
  const theme = useTheme();
  const { query: { p } } = useRouter();

  // let i = 0
  // const skeletons = Array.from(Array(howMany), () => ({id: i++}))

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
  } = usePaginatedQuery(['stars', page, howMany], fetchStars, {})

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0)

    if(p>1 && !initalLoaded){
      initalLoaded = true;
      setPage(Number(p))
      history.pushState(null, '', '?p='+(page));
    }else{
      history.pushState(null, '', '?p='+(page+1));
    }
    
    // this hasMore stops the home page from prefetching
    if (latestData?.hasMore) {
      const nextPage = page+1
      cache.prefetchQuery(['stars', nextPage], fetchStars)
    }
  }, [latestData, fetchStars, page])

  return (
    <>
      <ListHeader 
        howMany={howMany} 
        resolvedData={resolvedData} 
        latestData={latestData} 
        isFetching={isFetching} 
        page={page} 
        setPage={setPage}
        seeMore="/starfeed"
        title="star feed"
        heroContent={`I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :)`}
        totalItemsLabel=" starred articles :)"
      />
      <ReactQueryCacheProvider queryCache={queryCache}>
        {status === 'loading' ? (
          <Grid container spacing={4} >
            {skeletons.map(id => (       
              <StarCardBigSkeleton key={id}/>
            ))} 
          </Grid>
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (

          <Grid container spacing={4}>
            {isFetching ? 
              <>
                {skeletons.map(id => (       
                  <StarCardBigSkeleton key={id}/>
                ))} 
              </>
            : <>
              {resolvedData.data.map(article => (       
                <StarCardBig key={article.id} article={article} />
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
