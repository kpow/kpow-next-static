import React, { Component } from 'react';
// import '@components/music/bootstrap.min.module.css';


import Banner from "@components/music/Banner"
import Results from "@components/music/Results"

import Footer from '@components/music/footer'

import ErrorBoundary from '@components/music/ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  render() {

    var appToLoad;

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
      <div className="App">
        <ErrorBoundary>
          {appToLoad}
        </ErrorBoundary>
        <Footer/>
      </div>
      
    );
  }
}

export default App;
