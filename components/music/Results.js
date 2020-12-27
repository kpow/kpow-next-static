import React, { Component } from 'react';
import Computation from "@utils/musicComputation";
import numeral from 'numeral';

import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import HeatMap from 'react-heatmap-grid';

import ReasonsBox from '@components/music/ReasonsBox';
import TopYears from '@components/music/TopYears';
import MonthChart from '@components/music/MonthChart';
import YearsTopSongs from '@components/music/YearsTopSongs';
import TotalsBoxes from '@components/music/TotalsBoxes';
import AllSongsTable from '@components/music/AllSongsTable';
import TopSongBox from '@components/music/TopSongBox';
import Wrapped from '@components/music/Wrapped';


class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            excludedSongs: []
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


        let artistTotalCount = (this.state.artists.length > 20 ? 20 : this.state.artists.length);
        let artistBoxes = [];
        for (let index = 0; index < artistTotalCount; index++) {
            const artist = this.state.artists[index];
            const div = <div className="box year" key={artist.key}>
                <div>
                    <p style={{ marginBottom: 0 }}>Most played artist {index + 1}</p>
                    <h1>{artist.key}</h1>
                </div>
                <div>
                    <hr className="my-2" />
                    <p className="lead">{numeral(artist.value.plays).format('0,0')} Plays</p>
                    <p>{Computation.convertTime(artist.value.time)}</p>
                </div>
            </div>
            artistBoxes.push(div);
        }

        let topSong = this.state.filteredSongs[0];
        let topSongBox = <TopSongBox song={topSong} />;

        let heatmapData = [];
        let firstDay = new Date();
        let maxValue = 0;
        let lastDate = new Date('2015-01-01T01:00:00');
        for (let index = 0; index < this.state.days.length; index++) {
            const day = this.state.days[index];
            heatmapData.push({
                date: day.key,
                count: day.value.time
            })
            if (day.value.time > maxValue) {
                maxValue = day.value.time
            }
            if (new Date(day.key) < firstDay) {
                firstDay = new Date(day.key)
            }
            if (new Date(day.key) > lastDate) {
                lastDate = new Date(day.key)
            }
        }

        const daysTodayCount = Math.round((lastDate - firstDay) / (1000 * 60 * 60 * 24))
        const dayswithoutmusic = daysTodayCount - this.state.days.length;

        const xLabels = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
        const xLabelsVisibility = [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false]
        const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

        return (
            <div>
                <div>
                   {topSongBox}
                    
                    <TopYears years={this.state.years} />
                    
                    <TotalsBoxes totals={this.state.totals} songs={this.state.songs.length} artists={this.state.artists.length} day={this.state.days[0]} />
                    
                    <div className="years artists">
                        {artistBoxes}
                    </div>

                    {this.state.thisYear.totalPlays > 1 &&
                        <Wrapped year={this.state.thisYear} songs={this.state.thisYear.songs}/>
                    }

                    <YearsTopSongs years={this.state.years} />

                    <ReasonsBox reasons={this.state.reasons} />

                    <div className="box">
                        <div className="title-flex"><h1>All Songs</h1> 
                        <button outline color="secondary" size="sm" onClick={() => this.clearExcluded()} active={this.state.excludedSongs.length > 0}>Clear Excluded ({this.state.excludedSongs.length})</button></div>
                        <AllSongsTable addExcluded={row => this.addExcluded(row)} songs={this.state.songs} />
                    </div>

                </div>


            </div>
        );

    }
}

export default Results;
