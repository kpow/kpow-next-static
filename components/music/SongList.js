/* eslint-disable no-plusplus */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import SongCardFull from '@components/music/SongCardFull';
import Title from '@components/shared/Title';
import Divider from '@material-ui/core/Divider';

const TopYears = ({ years }) => {
  const yearsBoxes = [];

  for (let index = 0; index < years.length; index++) {
    const year = years[index];
    const div = <SongCardFull year={year} key={year.key} />;
    yearsBoxes.push(div);
  }

  return (
    <>
      <Title>
        top songs
      </Title>
      <Divider style={{ marginTop: '10px' }} />
      <Grid container spacing={3}>{yearsBoxes}</Grid>
    </>
  );
};

export default TopYears;
