import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import Title from '@components/shared/Title';
import ArtistCardFull from './ArtistCardFull';
import { Button } from '@material-ui/core';
import RangeSlider from '@components/music/RangeSlider';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    header:{
        width:'100%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection:'row'
        },
    },
    headerControls:{
        marginTop:20,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }

}));
  
  
    

const TopArtist = ({artists}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [artistPage, setArtistPage] = useState(0);
    const [totalArtistPerPage, setTotalArtistPerPage] = useState(4);
    // const [currentIndex, setCurrentIndex] = useState(0);
    // useEffect(() => {setCurrentIndex(artistPage*totalArtistPerPage);}, [])

    const setIndex = (index) =>{
        console.log(index)
        setArtistPage(index);
    }
    
    // setCurrentIndex(artistPage*totalArtistPerPage);
    let currentIndex = artistPage*totalArtistPerPage;
    let nextIndex = currentIndex+totalArtistPerPage;

    let artistTotalCount = (artists.length > nextIndex ? nextIndex : artists.length);
    let artistBoxes = [];
    for (let index = currentIndex; index < artistTotalCount; index++) {
        const artist = artists[index];
        const div = <ArtistCardFull artist={artist} index={index} key={artist.key}/>
        artistBoxes.push(div);
    }      

    return (
        <div>
    
            <div className={classes.header}> 
                <Title>
                    top artists
                </Title>
                <div className={classes.headerControls}>
                    <Button 
                        variant="outlined" 
                        style={{backgroundColor:'#fafafa', marginRight:20,marginLeft:30}}
                        onClick={()=> setArtistPage(artistPage-1) }  
                    >
                        prev
                    </Button>
                    <RangeSlider maxPages={523} setIndex={setArtistPage} index={artistPage}/>
                    <Button 
                        variant="outlined" 
                        style={{backgroundColor:'#fafafa',marginLeft:20}}
                        onClick={()=> setArtistPage(artistPage+1) } 
                    >
                            next
                    </Button>
                </div>
            </div>
            <Divider style={{marginTop:'20px'}} />  
            <Grid container spacing={3}>{artistBoxes}</Grid>
            <Divider style={{marginBottom:'20px'}} />  

        </div>
    );

}

export default TopArtist;
