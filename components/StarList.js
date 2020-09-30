import React from 'react';
import axios from "axios";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import StarCard from 'components/StarCard'
import StarCardBig from 'components/StarCardBig'

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
            <StarCardBig article={item} />
            )
          })}
      </Grid>
    </div>
  )
}
