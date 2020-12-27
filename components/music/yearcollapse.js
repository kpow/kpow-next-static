import React, { Component } from 'react';
import numeral from 'numeral';
import Computation from "../../utils/musicComputation";


class YearCollapse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            collapse: false
        };
    }

    render() {

        var songsYearBox = [];
        for (let index = 0; index < 40; index++) {
            const element = this.state.year.value[index];

            if (typeof element == 'undefined') {
                continue;
            }
            
            var box = <div className="box reason" key={element.key}>
                <h3>{element.value.name}</h3>
                <h5>{element.value.artist}</h5>
                <p className="lead">{Computation.convertTime(element.value.time)} ({numeral(element.value.plays).format('0,0')} Plays)</p>
            </div>
            songsYearBox.push(box);

        }

        const div = <div className="box" key={this.state.year.key}>
            <div> <h1>{this.state.year.key} Top Songs </h1>  </div>
        
                <div className="reasons"> {songsYearBox} </div>
           
        </div>

        return (div);

    }

}

export default YearCollapse;
