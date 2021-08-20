/* eslint-disable no-lonely-if */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useRouter } from 'next/router';
import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query-devtools/dist/react-query-devtools.production.min';
import StarCardBig from '@components/stars/StarCard';
import StarCardBigSkeleton from '@components/stars/StarCardSkeleton';
import Paginate from '@components/shared/Paginate';
import ListHeader from '@components/shared/ListHeader';
import fetchStars from '../../api/fetchStars';

let initalLoaded = false;
const queryCache = new QueryCache();

function StarList({ howMany }) {
  const cache = useQueryCache();
  const [page, setPage] = React.useState(0);
  const { query: { p } } = useRouter();
  const router = useRouter();
  const path = router.pathname;

  const skeletons = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < howMany; i++) {
    skeletons.push(i);
  }

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(['stars', page, howMany], fetchStars, { staleTime: Infinity });

  // Prefetch the next page!
  React.useEffect(() => {
    window.scrollTo(0, 0);

    // this added pgination to url, need to figure out better way breaks the back button
    if (p > 1 && !initalLoaded) {
      initalLoaded = true;
      setPage(Number(p));
      history.pushState(null, '', '?p=' + (page));
    } else {
      if (path !== '/') {
        history.pushState(null, '', '?p=' + (page + 1));
      }
    }
    // this hasMore stops the home page from prefetching
    if (latestData?.hasMore) {
      const nextPage = page + 1;
      cache.prefetchQuery(['stars', nextPage, howMany], fetchStars);
    }
  }, [latestData, fetchStars, page, howMany]);

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
        heroContent={"I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :)"}
        totalItemsLabel=" articles"
      />
      <ReactQueryCacheProvider queryCache={queryCache}>
        {status === 'loading' ? (
          <Grid container spacing={4}>
            {skeletons.map((id) => (
              <StarCardBigSkeleton key={id} />
            ))}
          </Grid>
        ) : status === 'error' ? (
          <div>
            Error:
            {' '}
            {error.message}
          </div>
        ) : (

          <Grid container spacing={4}>
            {isFetching
              ? (
                <>
                  {skeletons.map((id) => (
                    <StarCardBigSkeleton key={id} />
                  ))}
                </>
              ) : (
                <>
                  {resolvedData.data.map((article) => (
                    <StarCardBig key={article.id} article={article} />
                  ))}
                </>
              )}
          </Grid>
        )}
      </ReactQueryCacheProvider>

      {path !== '/'
        ? (
          <>
            <Divider style={{ marginBottom: '20px', marginTop: '20px' }} />
            <Paginate
              page={page}
              howMany={howMany}
              total={resolvedData?.totalItems}
              latestData={latestData}
              isFetching={isFetching}
              setPage={setPage}
            />
          </>
        )
        : <></> }
      <ReactQueryDevtools />
    </>
  );
}

export default StarList;
