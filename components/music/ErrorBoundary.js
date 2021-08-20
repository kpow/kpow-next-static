/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <div>
          <h1>An Error Has Occured</h1>
        </div>
      );
    }
    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
