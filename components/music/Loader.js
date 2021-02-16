import {useEffect} from 'react';
import {readRemoteFile} from 'react-papaparse';
import Title from '@components/shared/Title';
import {Grid, Divider, Card, CardMedia, CardContent, Typography} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MusicLoader from './MusicLoader';
import { Button } from '@material-ui/core';
import RangeSlider from '@components/music/RangeSlider';



const Loader = ({ dataResponseHandler }) => {


    useEffect(() => {
        readRemoteFile('kpow-itunes-2015-2020-lite.csv', {
            header: true,
            complete: (data) =>  dataResponseHandler(data.data)
        })
    },[])

    return (
        <MusicLoader />
    );

}

export default Loader;
