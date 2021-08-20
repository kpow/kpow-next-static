import React from 'react';
import Computation from '@utils/musicComputation';
import numeral from 'numeral';
import Grid from '@material-ui/core/Grid';

const TotalsBoxes = (props) => {
  const { totals } = props;
  const { songs } = props;
  const { artists } = props;

  return (
    <Grid container spacing={3} key="totals">
      <Grid container item xs={12} sm={10} md={6} style={{ margin: '0 auto' }}>
        <p className="lead">time: </p>
        <h2>{Computation.convertTime(totals.totalTime)}</h2>

      </Grid>
      <Grid container item xs={12} sm={10} md={2} style={{ margin: '0 auto' }}>
        <p className="lead">plays: </p>
        <h2>{numeral(totals.totalPlays).format('0,0')}</h2>

      </Grid>
      <Grid container item xs={12} sm={10} md={2} style={{ margin: '0 auto' }}>
        <p className="lead">songs: </p>
        <h2>{numeral(songs).format('0,0')}</h2>

      </Grid>
      <Grid container item xs={12} sm={10} md={2} style={{ margin: '0 auto' }}>
        <p className="lead">artists: </p>
        <h2>{numeral(artists).format('0,0')}</h2>

      </Grid>
    </Grid>
  );
};

export default TotalsBoxes;
