import React, { Component } from 'react';
import YearCollapse from './yearcollapse';

class YearsTopSongs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            years: props.years,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            years: nextProps.years
        });
    }

    render() {

        var yearsBoxes = [];
        for (let index = 0; index < this.state.years.length; index++) {
            const year = this.state.years[index];
            yearsBoxes.push(<YearCollapse year={year} key={year.key + "-full"} />);
        }



        return (yearsBoxes);

    }

}

export default YearsTopSongs;