import React, { Component } from 'react';
import {readRemoteFile} from 'react-papaparse'

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    componentDidMount() {
        readRemoteFile('kpow-itunes-2015-2020-lite.csv', {
            header: true,
            complete: (data) => {
                console.log(data.data)
                this.props.dataResponseHandler(data.data);
            }
        })
    }

    render() {

        return (
            <div>
                <h1 className="display-3">Apple Music Analyser</h1>
            </div>
        );

    }
}

export default Banner;
