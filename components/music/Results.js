import React, { Component } from 'react';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import Computation from "@utils/musicComputation";
import numeral from 'numeral';

import TopYears from '@components/music/SongList';
import YearsTopSongs from '@components/music/YearsTopSongs';
import TotalsBoxes from '@components/music/TotalsBoxes';
import TopSongBox from '@components/music/TopSongBox';
import Wrapped from '@components/music/Wrapped';
import Title from '@components/shared/Title';
import ArtistCardFull from './ArtistCardFull';
import { Button } from '@material-ui/core';


class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            excludedSongs: [],
            artistPage: 0,
            totalArtistPerPage: 8
        };
    }

    componentDidMount() {
        setTimeout(() => {
            Computation.calculateTop(this.state.data, this.state.excludedSongs, results => {
                this.setState({
                    songs: results.songs,
                    days: results.days,
                    months: results.months,
                    reasons: results.reasons,
                    data: this.state.data,
                    years: results.years,
                    artists: results.artists,
                    totals: results.totals,
                    filteredSongs: results.filteredSongs,
                    excludedSongs: results.excludedSongs,
                    hoursArray: results.hoursArray,
                    thisYear: results.thisYear
                });
            });
        }, 0);
    }

    addExcluded(row) {

        var key = row.original.key;

        var excludedSongs = this.state.excludedSongs;
        if (excludedSongs.includes(key)) {
            excludedSongs = excludedSongs.filter(item => item !== key);
        } else {
            excludedSongs.push(key);
        }

        setTimeout(() => {
            Computation.calculateTop(this.state.data, excludedSongs, results => {
                
                this.setState({
                    songs: results.songs,
                    days: results.days,
                    months: results.months,
                    reasons: results.reasons,
                    data: this.state.data,
                    years: results.years,
                    artists: results.artists,
                    totals: results.totals,
                    filteredSongs: results.filteredSongs,
                    excludedSongs: results.excludedSongs,
                    hoursArray: results.hoursArray,
                    thisYear: results.thisYear
                });
                
            });
        }, 0);
    }

    clearExcluded() {
        setTimeout(() => {
            Computation.calculateTop(this.state.data, [], results => {
                this.setState({
                    songs: results.songs,
                    days: results.days,
                    months: results.months,
                    reasons: results.reasons,
                    data: this.state.data,
                    years: results.years,
                    artists: results.artists,
                    totals: results.totals,
                    filteredSongs: results.filteredSongs,
                    excludedSongs: results.excludedSongs,
                    hoursArray: results.hoursArray,
                    thisYear: results.thisYear
                });
            });
        }, 0);
    }



    render() {

        if (this.state.songs == null) {
            return (<div><h4  style={{textAlign: 'center'}}>Almost there...</h4></div>);
        }

        if (this.state.songs.length <= 1) {
            return(<div className="errorDiv box">There was an error processing your data <span role="img" aria-label="sad face emoji">☹️</span>  </div>)
        }
        let currentIndex = this.state.artistPage*this.state.totalArtistPerPage;
        let nextIndex = currentIndex+this.state.totalArtistPerPage
        let artistTotalCount = (this.state.artists.length > nextIndex ? nextIndex : this.state.artists.length);
        let artistBoxes = [];
        for (let index = currentIndex; index < artistTotalCount; index++) {
            const artist = this.state.artists[index];
            const div = <ArtistCardFull artist={artist} index={index} key={artist.key}/>
            artistBoxes.push(div);
        }      

        return (
            <div>
                <Title>
                    itune stats - beta
                </Title>
                
                {/* <TopSongBox song={this.state.filteredSongs[0]} /> */}
                
                <Divider style={{marginTop:'10px'}} />  
                
                <TotalsBoxes totals={this.state.totals} songs={this.state.songs.length} artists={this.state.artists.length} day={this.state.days[0]} />
                
                <Divider/>  
                
                <TopYears years={this.state.years} />

                <Divider style={{marginTop:'30px'}} />  
                <Title>
                    top artist - all time
                </Title>
                <Button onClick={()=>{
                    this.setState((prevState)=>{ return {artistPage:prevState.artistPage-1} })
                }} >
                    prev
                </Button>
                <Button onClick={()=>{
                    this.setState((prevState)=>{ return {artistPage:prevState.artistPage+1} })
                }} >
                     next
                </Button>
                <Grid container spacing={3}>{artistBoxes}</Grid>

                {this.state.thisYear.totalPlays > 1 &&
                    <>
                        <Divider style={{marginTop:'30px'}} />  
                        <Title>
                            2020 in review
                        </Title>
                        <Wrapped year={this.state.thisYear} songs={this.state.thisYear.songs}/>
                    </>
                }

                {/* <YearsTopSongs years={this.state.years} /> */}

            </div>
        );

    }
}

export default Results;
