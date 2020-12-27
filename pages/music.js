import React, { Component } from 'react';
import { useState, useEffect, useRef } from "react";

import Loader from "@components/music/Loader"
import Results from "@components/music/Results"
import Footer from '@components/music/footer'
import ErrorBoundary from '@components/music/ErrorBoundary';
import Layout from '@components/Layout'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

const Music = ({ title, description, ...props }) => {
  const classes = useStyles();
  const [data, setData]= useState(false)
  let appToLoad;

  if (data.length > 0) {
    appToLoad = <Results data={data} />;
  } else {
    appToLoad = <Loader dataResponseHandler={data => setData(data) } />;
  }

  return (
    <Layout pageTitle={`kpow | music stats`} description="stats from my itunes">
      <div className="App">
        <ErrorBoundary>
          {appToLoad}
        </ErrorBoundary>
        <Footer/>
      </div>
    </Layout>
  )

}

export default Music;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}

