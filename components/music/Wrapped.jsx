import React, { Component } from 'react';
import numeral from 'numeral';

class Wrapped extends Component {


    render() {


        var artistCount = (this.props.year.artists.length > 10 ? 10 : this.props.year.artists.length);
        var songCount = (this.props.year.songs.length > 10 ? 10 : this.props.year.songs.length);


        var titleString = "My Music — " + this.props.year.year;

        var artistsDivs = []
        for (let index = 0; index < artistCount; index++) {
            let div = <div className="item" key={this.props.year.artists[index].key}>{this.props.year.artists[index].key}</div>;
            artistsDivs.push(div)
        }

        var songDivs = []
        for (let index = 0; index < songCount; index++) {
            let div = <div className="item" key={this.props.year.songs[index].key}>{this.props.year.songs[index].value.name} <span className="artist">— {this.props.year.songs[index].value.artist}</span></div>;
            songDivs.push(div)
        }

        var div = <div className="wrapped" id="annualwrapped">
        <h1 className="title">{titleString}</h1>
        <div className="wrapped-content">
            <div className="left">
                <h2 className="subtitle">I listened to</h2>
                <div className="number">{numeral(parseInt(this.props.year.totalTime) / 1000 / 60).format('0,0')}</div>
                <h3 className="small">minutes of music</h3>



            </div>
            <div className="right">
                <h2 className="subtitle">Top Artists</h2>
                {artistsDivs}

                <h2 className="subtitle">Top Songs</h2>
                {songDivs}

            </div>
        </div>
      

    </div>;

        

        return (
            <div className="box" style={{maxWidth: "calc(2em + 700px)"}}>
                {div}
            </div>
        );
    }
}

export default Wrapped;
