import Layout from '@components/Layout'
import { useState, useEffect } from 'react';

import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
      marginTop: '30px',
      display:'flex',
      flexDirection:'column',
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column'
      },
    },
    heroContent: {
      padding: theme.spacing(0, 0, 0),
      marginTop: '30px;'
    },
    heroTitle: {
      marginTop: '10px',
      marginLeft: '20px'
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
      backgroundColor: '#fafafa'
    },
    table: {
      minWidth: 150,
   
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
            <div style={{ margin:'0 auto', paddingTop:15, width:'90%'}}>
              {playerData?.description}
            </div> 
          </div>
          <CardContent className={classes.mainContent}>
            <div className={classes.heroTables}>
              <div className={classes.heroTable}>
                <StatTable rows={powerstatRows}/>
              </div>
              <div className={classes.heroTable}>
                <StatTable rows={appearanceRows} />
              </div>
            </div>

            <div style={{ width:'auto'}}>
              <StatTable rows={otherstatRows} />
            </div> 
             
          </CardContent>
      
          {/* <CardActions>
            <Button size="small" color="primary">
              choose super
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions> */}
      </Card>
    )
  }

  export default SuperHeroCard