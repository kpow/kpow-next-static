import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import StarCard from 'components/StarCard'

const useStyles = makeStyles((theme) => ({ }));

export default function ProjectList({ stars }) {
  const classes = useStyles();
  const displayStars = stars;
  
  if (stars === 'undefined') return null

  return (
    <div>
      {!displayStars && <div>No posts!</div>}

      <Grid container spacing={4}>
        {displayStars &&
          displayStars.map((item) => {
            return (
            <StarCard article={item} />
            )
          })}
      </Grid>
    </div>
  )
}
