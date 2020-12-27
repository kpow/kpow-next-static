import React, { useState } from 'react';
import Computation from "@utils/musicComputation";
import numeral from 'numeral';

const TotalsBoxes = (props) => {
    const [totals, setTotals]= useState(props.totals)
    const [day, setDay]= useState(props.day)
    const [songs, setSongs]= useState(props.songs)
    const [artists, setArtists]= useState(props.artists)

    const totalsBox = <div className="box year" key="totals">
        <div>
            <p className="lead">Total you've listened to</p>
            <h2>{Computation.convertTime(totals.totalTime)}</h2>
            <p className="lead">of music</p>
        </div>
        <div>
            <h2>{numeral(totals.totalPlays).format('0,0')}</h2>
            <p className="lead">plays</p>
        </div>
    </div>

    const highestDay = <div className="box year" key="highestDay">
        <div>
            <p className="lead">On</p>
            <h3>{day.key}</h3>
            <p className="lead">you listened to</p>
            <h3>{Computation.convertTime(day.value.time)}</h3>
            <p className="lead">of music</p>
        </div>
        <div>

        </div>
    </div>

    const totalSongs = <div className="box year" key="totalSongs">
        <div>
            <h2>{numeral(songs).format('0,0')}</h2>
            <p className="lead">songs</p>
        </div>
        <div>
            <hr className="my-2" />
            <h2>{numeral(artists).format('0,0')}</h2>
            <p className="lead">artists</p>
        </div>
        <div>
            <hr className="my-2" />
            <h2>{numeral(totals.totalLyrics).format('0,0')}</h2>
            <p className="lead">times viewed lyrics</p>
        </div>
    </div>

    var div = <div className="years">
        {totalsBox}
        {highestDay}
        {totalSongs}
    </div>

    return (div);
}

export default TotalsBoxes;