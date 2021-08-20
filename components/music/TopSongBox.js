/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Computation from '@utils/musicComputation';

const TopSongBox = ({ song }) => {
  const topSong = song;

  return (
    <div>
      <h3>Your most played song on Apple Music is</h3>
      <h1>{topSong.key}</h1>
      <p>
        You've played this
        {' '}
        <strong>{topSong.value.plays}</strong>
        {' '}
        times for a total of
        <strong>{Computation.convertTime(topSong.value.time)}</strong>
      </p>
    </div>
  );
};

export default TopSongBox;
