import React, { useEffect } from 'react';
import { readRemoteFile } from 'react-papaparse';
import MusicLoader from './MusicLoader';

const Loader = ({ dataResponseHandler }) => {
  useEffect(() => {
    readRemoteFile('kpow-itunes-2015-2020-lite.csv', {
      header: true,
      complete: (data) => dataResponseHandler(data.data),
    });
  }, []);

  return (
    <MusicLoader />
  );
};

export default Loader;
