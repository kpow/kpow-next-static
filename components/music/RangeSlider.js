import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 150,
    marginTop: 5,
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ setIndex, index, maxPages }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <Slider
        value={index}
        onChange={handleChange}
        max={maxPages}
        min={0}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
