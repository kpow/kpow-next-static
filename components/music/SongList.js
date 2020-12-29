
import {useState, useEffect } from 'react';
import numeral from 'numeral';
import Computation from "@utils/musicComputation";
import jsonp from 'jsonp';
import Grid from '@material-ui/core/Grid';
import SongCardFull from '@components/music/SongCardFull';
import Title from '@components/shared/Title';

const YearBox = (props) => {
    const [imageURL, setImageURL]= useState(false)
    const [year, setDisplayYear]= useState(props.year.value[0])

    let style = {}
    if (imageURL.length > 0) {
        let grad = "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)), url('"+ imageURL +"')";
        style = {backgroundImage: grad}
    }

    return (
        <div className="box year" style={style}>
            <div>
                <h4>{year.key}</h4>
                <h2>{year.value.name}</h2>
                <h4>{year.value.artist}</h4>
            </div>
            <div>
                <hr className="my-2" />
                <p className="lead">{numeral(year.value.plays).format('0,0')} Plays</p>
                <p>{Computation.convertTime(year.value.time)}</p>
            </div>
        </div>
    );
}

const TopYears = (props) => {
    const [years, setYears]= useState(props.years)
    var yearsBoxes = [];

    for (let index = 0; index < years.length; index++) {
        const year = years[index];
        // const div = <YearBox year={year} key={year.key} />
        const div = <SongCardFull year={year} key={year.key} />
        yearsBoxes.push(div);
    }

    return (
        <>
            <Title>
                top song - by year
            </Title>
            <Grid container spacing={3}>{yearsBoxes}</Grid>
        </>
    );
}

export default TopYears;