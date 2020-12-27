
import React, { Component, useState, useEffect } from 'react';
import numeral from 'numeral';
import Computation from "@utils/musicComputation";
import jsonp from 'jsonp';

const YearBox = ({year}) => {
    const [imageURL, setImageURL]= useState(false)
    const [displayYear, setDisplayYear]= useState(year.value[0])

    useEffect(() => {
        const url = "https://itunes.apple.com/search?term=" + displayYear.value.name + " " + displayYear.value.artist + "&country=US&media=music&entity=musicTrack"
        jsonp(url, null, (err, data) => {
            if (err) {
                console.error(err.message);
            } else {
                if (data.results.length > 0) {
                    setImageURL(data.results[0].artworkUrl30.replace('30x30bb', '300x300bb'))
                }
            }
        });
    }, [])

    let style = {}
    if (imageURL.length > 0) {
        let grad = "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)), url('"+ imageURL +"')";
        style = {backgroundImage: grad}
    }

    return (
        <div className="box year" style={style}>
            <div>
                <h4>{year.key}</h4>
                <h2>{displayYear.value.name}</h2>
                <h4>{displayYear.value.artist}</h4>
            </div>
            <div>
                <hr className="my-2" />
                <p className="lead">{numeral(displayYear.value.plays).format('0,0')} Plays</p>
                <p>{Computation.convertTime(displayYear.value.time)}</p>
            </div>
        </div>
    );
}

const TopYears = (props) => {
    const [years, setYears]= useState(props.years)
    var yearsBoxes = [];

    for (let index = 0; index < years.length; index++) {
        const year = years[index];
        const div = <YearBox year={year} key={year.key} />
        yearsBoxes.push(div);
    }

    return (<div className="years">{yearsBoxes}</div>);
}

export default TopYears;