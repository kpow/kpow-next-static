import React, { Component } from 'react';
import Banner from "@components/music/Banner"
import Results from "@components/music/Results"
import Footer from '@components/music/footer'
import ErrorBoundary from '@components/music/ErrorBoundary';
import Layout from '@components/Layout'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

class Music extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  render() {

    let appToLoad;

    if (this.state.data.length > 0) {
      appToLoad = <Results data={this.state.data} />;
    } else {
      appToLoad = <Banner dataResponseHandler={data => {
        this.setState({
          data: data
        })        
      }} />;
    }

    return (
      <Layout pageTitle={`kpow | music`} description="stats from my music listening">
        <div className="App">
          <ErrorBoundary>
            {appToLoad}
          </ErrorBoundary>
          <Footer/>
        </div>
      </Layout>
    )
  }
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

