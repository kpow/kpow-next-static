import { useState, useEffect } from 'react';

import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery'


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
      marginTop: '30px',
      display:'flex',
      flexDirection:'column',
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column',
     
      },
    },
    heroContent: {
      padding: theme.spacing(0, 0, 0),
      marginTop: '30px;'
    },
    heroTitle: {
      marginTop: '10px',
      marginLeft: '20px',
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        marginTop: '5px',
        marginLeft: '5px',
        fontSize:'17px',
        display: 'block',
     
      },
    },
    heroImage: {
      maxWidth:'450px',
      maxHeight:'450px'
    },
    heroTables:{
      display:'flex',
      flexDirection:'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column'
      },
    },
    heroTable:{
      width:'50%',
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column',
        width:'100%',
      },
    },
    mainContent: {
      width:'100%',
      backgroundColor: '#fafafa',
      margin:0,
      padding:0
    },
    table: {
      minWidth: 150,
      [theme.breakpoints.down('sm')]: {
        minWidth:0
      },
    },
  }));

function createData(key, value) {
    return { key, value};
}

const StatTable = ({rows}) =>{
    const classes = useStyles();
    return(
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
      {/* <caption>A basic table example with a caption</caption>  */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }  


const SuperHeroCard = ({playerData}) =>{
    const heroData = playerData.data
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

      const appearanceRowsMobile = [
        createData(heroData?.appearance.gender),
        createData(heroData?.appearance.race),
        createData(`${heroData?.appearance.height[0]} / ${heroData?.appearance.weight[0]}`),
        createData('eyes/'+heroData?.appearance.eyeColor),
        createData('hair/'+heroData?.appearance.hairColor),
        createData(heroData?.biography.publisher),
      ];
    
      const powerstatRowsMobile = [
        createData('combat:'+heroData?.powerstats.combat),
        createData('durability:'+heroData?.powerstats.durability),
        createData('smarts:'+heroData?.powerstats.intelligence),
        createData('speed:'+heroData?.powerstats.speed),
        createData('strength:'+heroData?.powerstats.strength),
        createData(heroData?.biography.alignment),
      ];
    
      const otherstatRowsMobile = [
        createData('name:'+heroData?.biography.fullName),
        createData('POB:'+heroData?.biography.placeOfBirth),
        createData('job:'+heroData?.work.occupation),
        createData('base:'+heroData?.work.base),
      ];

      const appearanceRows = [
        createData('gender', heroData?.appearance.gender),
        createData('race', heroData?.appearance.race),
        createData('hgt/wgt', `${heroData?.appearance.height[0]} / ${heroData?.appearance.weight[0]}`),
        createData('eyes', heroData?.appearance.eyeColor),
        createData('hair', heroData?.appearance.hairColor),
        createData('pub', heroData?.biography.publisher),
      ];
    
      const powerstatRows = [
        createData('combat', heroData?.powerstats.combat),
        createData('durability', heroData?.powerstats.durability),
        createData('intelligence', heroData?.powerstats.intelligence),
        createData('speed', heroData?.powerstats.speed),
        createData('strength', heroData?.powerstats.strength),
        createData('alignment', heroData?.biography.alignment),
      ];
    
      const otherstatRows = [
        createData('full name', heroData?.biography.fullName),
        createData('POB', heroData?.biography.placeOfBirth),
        createData('occupation', heroData?.work.occupation),
        createData('base', heroData?.work.base),
      ];


  
    return(
      <Card className={classes.root}>
          <div>
            <Typography className={classes.heroTitle} gutterBottom variant="h5" component="h2">
              {heroData?.name}
            </Typography>
            <CardMedia
              className={classes.heroImage}
              component="img"
              alt={heroData?.name}
              image={heroData?.images.lg}
              title={heroData?.name}
            />
          </div>
          <CardContent className={classes.mainContent}>
            <div className={classes.heroTables}>
              
              <div className={classes.heroTable}>
                {matches ? <StatTable rows={powerstatRows}/>
                : <StatTable rows={powerstatRowsMobile}/> } 
              </div>

              <div className={classes.heroTable}>
                {matches ? <StatTable rows={appearanceRows}/>
                : <StatTable rows={appearanceRowsMobile}/> } 
              </div>

            </div>

            <div style={{ width:'auto'}}>
              {matches ? <StatTable rows={otherstatRows}/>
              : <StatTable rows={otherstatRowsMobile}/> } 
            </div> 
            <Paper style={{padding:10}}>
              
              {playerData.powers &&
                playerData.powers.map((item) => {
                  if(item.value && item.power != 'Name'){
                    return ( <Chip key={item.power} style={{margin:'0 5px 5px'}} label={`${item.power}`} /> )
                  }
                })}
            </Paper>

            <div style={{ margin:'0 auto', paddingTop:15, width:'90%'}}>
              {playerData?.description}
            </div> 
             
          </CardContent>
      </Card>
    )
  }

  export default SuperHeroCard