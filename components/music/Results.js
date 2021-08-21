/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Computation from '@utils/musicComputation';

import TopYears from '@components/music/SongList';
import TotalsBoxes from '@components/music/TotalsBoxes';
import Title from '@components/shared/Title';
import TopArtist from '@components/music/TopArtist';
import MusicLoader from './MusicLoader';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      excludedSongs: [],
      artistPage: 0,
      totalArtistPerPage: 8,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      Computation.calculateTop(this.state.data, this.state.excludedSongs, (results) => {
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
          thisYear: results.thisYear,
        });
      });
    }, 0);
  }

  addExcluded(row) {
    const { key } = row.original;

    let { excludedSongs } = this.state;
    if (excludedSongs.includes(key)) {
      excludedSongs = excludedSongs.filter((item) => item !== key);
    } else {
      excludedSongs.push(key);
    }

    setTimeout(() => {
      Computation.calculateTop(this.state.data, excludedSongs, (results) => {
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
          thisYear: results.thisYear,
        });
      });
    }, 0);
  }

  clearExcluded() {
    setTimeout(() => {
      Computation.calculateTop(this.state.data, [], (results) => {
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
          thisYear: results.thisYear,
        });
      });
    }, 0);
  }

  render() {
    if (this.state.songs == null) {
      return (<MusicLoader />);
    }

    if (this.state.songs.length <= 1) {
      return (
        <div className="errorDiv box">
          There was an error processing your data
          <span role="img" aria-label="sad face emoji">☹️</span>
        </div>
      );
    }

    return (
      <div>
        <Title>
          itune stats - 2015-2020
        </Title>

        <Divider style={{ marginTop: '10px' }} />

        <TotalsBoxes
          totals={this.state.totals}
          songs={this.state.songs.length}
          artists={this.state.artists.length}
          day={this.state.days[0]}
        />
        <Divider />
        <TopArtist artists={this.state.artists} />

        <Divider style={{ marginTop: '30px' }} />
        <TopYears years={this.state.years} />

      </div>
    );
  }
}

export default Results;
