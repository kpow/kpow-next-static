import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {
  usePaginatedQuery,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools/dist/react-query-devtools.production.min';
import ListHeader from '@components/shared/ListHeader';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info'; import fetchScrobbles from '../../api/fetchScrobbles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minHeight: '240px',

  },
  tile: {
    backgroundColor: '#666',
    minHeight: '240px',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function ScrobbleList({ howMany }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const totalScrobbleDisplay = matches ? 5 : 1.5;

  const [page, setPage] = React.useState(0);

  const {
    resolvedData,
    latestData,
    isFetching,
  } = usePaginatedQuery(['scrobbles', page, howMany], fetchScrobbles, { staleTime: Infinity });

  return (
    <>
      <ListHeader
        howMany={howMany}
        resolvedData={resolvedData}
        latestData={latestData}
        isFetching={isFetching}
        page={page}
        setPage={setPage}
        seeMore="/music"
        title="recently played . . ."
        heroContent=""
        totalItemsLabel=""
      />
      <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />

      <div className={classes.root}>
        <GridList
          cellHeight={240}
          className={classes.gridList}
          cols={totalScrobbleDisplay}
        >

          {resolvedData
              && resolvedData.data.map((article) => (
                <GridListTile className={classes.tile} key={article?.name}>
                  <img alt="music" src={article?.image[2]['#text']} />
                  <GridListTileBar
                    title={article?.name}
                    subtitle={(
                      <span>
                        by:
                        {article?.artist['#text']}
                      </span>
)}
                    actionIcon={(
                      <IconButton aria-label={`info about ${article?.artist['#text']}`} className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                      )}
                  />
                </GridListTile>
              ))}

        </GridList>
      </div>

      <ReactQueryDevtools />
    </>
  );
}

export default ScrobbleList;
