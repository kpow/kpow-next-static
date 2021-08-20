/* eslint-disable no-plusplus */
import React from 'react';
import numeral from 'numeral';

const Wrapped = ({ year }) => {
  const artistCount = (year.artists.length > 10 ? 10 : year.artists.length);
  const songCount = (year.songs.length > 10 ? 10 : year.songs.length);

  const artistsDivs = [];
  for (let index = 0; index < artistCount; index++) {
    const div = <div className="item" key={year.artists[index].key}>{year.artists[index].key}</div>;
    artistsDivs.push(div);
  }

  const songDivs = [];
  for (let index = 0; index < songCount; index++) {
    const div = (
      <div className="item" key={year.songs[index].key}>
        {year.songs[index].value.name}
        {' '}
        <span className="artist">
          —
          {year.songs[index].value.artist}
        </span>
      </div>
    );
    songDivs.push(div);
  }

  const div = (
    <div className="wrapped" id="annualwrapped">
      {/* <h1 className="title">{titleString}</h1> */}
      <div className="wrapped-content">
        <div className="left">
          <h2 className="subtitle">I listened to</h2>
          <div className="number">{numeral(parseInt(year.totalTime, 10) / 1000 / 60).format('0,0')}</div>
          <h3 className="small">minutes of music</h3>
        </div>
        <div className="right">
          <h2 className="subtitle">Top Artists</h2>
          {artistsDivs}

          <h2 className="subtitle">Top Songs</h2>
          {songDivs}

        </div>
      </div>

    </div>
  );

  return (
    <div className="box" style={{ maxWidth: 'calc(2em + 700px)' }}>
      {div}
    </div>
  );
};

export default Wrapped;
