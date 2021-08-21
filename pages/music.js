import { React, useState } from 'react';
import Loader from '@components/music/Loader';
import Results from '@components/music/Results';
import ErrorBoundary from '@components/music/ErrorBoundary';
import Layout from '@components/Layout';

const Music = () => {
  const [data, setData] = useState(false);
  let appToLoad;

  if (data.length > 0) {
    appToLoad = <Results data={data} />;
  } else {
    appToLoad = <Loader dataResponseHandler={(daData) => setData(daData)} />;
  }

  return (
    <Layout pageTitle="kpow | music stats" description="stats from my itunes">
      <div className="App">
        <ErrorBoundary>
          {appToLoad}
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Music;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
