import React, { useState } from 'react';
import YearCollapse from './yearcollapse';

const YearsTopSongs = (props) => {
    const [years, setYears]= useState(props.years)

    let yearsBoxes = [];
    for (let index = 0; index < years.length; index++) {
        const year = years[index];
        yearsBoxes.push(<YearCollapse year={year} key={year.key + "-full"} />);
    }

    return (yearsBoxes);
}

export default YearsTopSongs;