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
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import heros from '../src/superheros'
import Divider from '@material-ui/core/Divider'

import Title from '@components/Title';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(key, value) {
  return { key, value};
}




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginTop: '30px',
    display:'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
    marginTop: '30px;'
  },
  heroImage: {
    maxWidth:'500px',
    maxHeight:'500px'
  },
  heroTables:{
    display:'flex',
    flexDirection:'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
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

const HeroCard = ({playerData}) =>{
  const classes = useStyles();

  const appearanceRows = [
    createData('gender', playerData.appearance.gender),
    createData('race', playerData.appearance.race),
    createData('hgt/wgt', `${playerData.appearance.height[0]} / ${playerData.appearance.weight[0]}`),
    createData('eyes', playerData.appearance.eyeColor),
    createData('hair', playerData.appearance.hairColor),
    createData('publisher', playerData.biography.publisher),
  ];

  const powerstatRows = [
    createData('combat', playerData.powerstats.combat),
    createData('durability', playerData.powerstats.durability),
    createData('intelligence', playerData.powerstats.intelligence),
    createData('speed', playerData.powerstats.speed),
    createData('strength', playerData.powerstats.strength),
    createData('alignment', playerData.biography.alignment),
  ];

  const otherstatRows = [
    createData('place of birth', playerData.biography.placeOfBirth),
    createData('alignment', playerData.biography.alignment),
    createData('publisher', playerData.biography.publisher),
    createData('occupation', playerData.work.occupation),
    createData('base', playerData.work.base),
  ];

  return(
    <Card className={classes.root}>
        <CardMedia
          className={classes.heroImage}
          component="img"
          alt={playerData.name}
          image={playerData.images.lg}
          title={playerData.name}
        />
        <CardContent className={classes.mainContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {playerData.name}
          </Typography>
          <div className={classes.heroTables}>
            <div style={{width:'auto' }}>
              <StatTable rows={powerstatRows}/>
            </div>
            <div style={{ width:'auto'}}>
              <StatTable rows={appearanceRows} />
            </div>
            {/* <div style={{ width:'auto'}}>
              <StatTable rows={otherstatRows} />
            </div> */}
          </div>
            <Typography variant="subtitle1" color="textSecondary" style={{marginTop:'10px'}}>
                name: <strong>{playerData.biography.fullName}</strong>    
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                place of birth: <strong>{playerData.biography.placeOfBirth}</strong>    
              </Typography>
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

const Battle = ({ title, description, ...props }) => {
  const classes = useStyles();
  const [player1Data, setPlayer1Data]= useState(false)
  const [player2Data, setPlayer2Data]= useState(null)

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
        <div className={classes.heroContent}>
          <Container maxWidth="md" className={classes.mainContent}>
            <Grid container spacing={1} style={{display:'flex', flexDirection:'row'}}>
              <Grid item xs={12} md={12} >
    
                <Autocomplete
                  id="combo-box-demo"
                  options={heros}
                  onChange={(params)=>{
                    const result = heros.filter(item => item.name == params.target.textContent);
                    setPlayer1Data(result[0])
                  }}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super"  />}
                />

                  {!player1Data ? <h1>pick one</h1>
                  : <HeroCard playerData={player1Data} /> }   
               
              </Grid>
              
              <Grid item xs={12} md={12} >

                <Divider style={{marginTop:'40px'}}/>
    
                <Autocomplete
                  id="combo-box-demo2"
                  autoComplete
                  options={heros}
                  onChange={(params)=>{
                    const result = heros.filter(item => item.name == params.target.textContent);
                    setPlayer2Data(result[0])
                  }}
                  
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super" />}
                />

                  {!player2Data ? <h1>pick one</h1>
                  : <HeroCard playerData={player2Data} /> } 

              </Grid>
            </Grid>

          </Container>
        </div>
      </Layout>
  )
}

export default Battle

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}





