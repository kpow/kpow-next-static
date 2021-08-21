/* eslint-disable no-plusplus */
import React from 'react';
import numeral from 'numeral';
import Computation from '@utils/musicComputation';

const YearCollapse = ({ year }) => {
  const songsYearBox = [];
  for (let index = 0; index < 40; index++) {
    const element = year.value[index];

    if (typeof element === 'undefined') {
      // eslint-disable-next-line no-continue
      continue;
    }

    const box = (
      <div className="box reason" key={element.key}>
        <h3>{element.value.name}</h3>
        <h5>{element.value.artist}</h5>
        <p className="lead">
          {Computation.convertTime(element.value.time)}
          {' '}
          (
          {numeral(element.value.plays).format('0,0')}
          {' '}
          Plays)
        </p>
      </div>
    );
    songsYearBox.push(box);
  }

  return (
    <div className="box" key={year.key}>
      <div>
        <h1>
          {year.key}
          {' '}
          Top Songs
          {' '}
        </h1>
      </div>

      <div className="reasons">
        {' '}
        {songsYearBox}
        {' '}
      </div>

    </div>
  );
};

export default YearCollapse;
