import Layout from '@components/Layout'
import { useState, useEffect } from 'react';

import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import heros from '../src/superheros-prod';
import powers from '../src/superheros-powers';
import marvel from '../src/marvel';
import Divider from '@material-ui/core/Divider'
import SuperHeroCard from '@components/SuperHeroCard';
import BattleSteps from '@components/BattleSteps';
import Title from '@components/Title';

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
  fightBar:{
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'30px',
    flexGrow:'0',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
  },
  fightButton: {
    flexGrow:'0',
    boxShadow: "inset 0px 1px 0px 0px #f29c93",
    background: "linear-gradient(to bottom, #fe1a00 5%, #ce0100 100%)",
    backgroundColor: "#fe1a00",
    borderRadius: "42px",
    display: "inline-block",
    cursor: "pointer",
    color: "#ffffff",
    fontFamily: "Verdana",
    fontSize: "23px",
    fontWeight: "bold",
    padding: "16px 36px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #b23e35",
    '&:hover': {
      background: "linear-gradient(to bottom, #ce0100 5%, #fe1a00 100%)",
      backgroundColor: "#ce0100"
    }
  }
}));

const Battle = ({ title, description, ...props }) => {

  const getMarvelData = (hero) =>{  
    const heros = marvel.filter((item)=> item.name.toLowerCase() == hero.toLowerCase() )
    if(heros.length>=1){ return heros[0] }
    else{ return false }
  }

  const createData = (power, value) => {
    return {power, value};
  }

  const getPowersData = (hero) =>{
    const powerLabels = Object.keys(powers)
    let powerData = []
    let heroIndex 
    for(let i=0; i<powers.Name.length;i++){
      if(powers.Name[i] == hero){
        heroIndex = i;
        break;
      }
    }
    powerLabels.forEach((item, index)=>{
      powerData.push(createData(item, powers[item][heroIndex]))
    })
    return powerData
  }

  const getPlayerData =(value)=> {
    let newData
    if(value){
      const result = heros.filter(item => item.name == value.name);
      const powers = getPowersData(value.name)
      const publisher = result[0]?.biography?.publisher  
      if( publisher == "Marvel Comics"){
        const marvelData = getMarvelData(value.name)
        newData = { data:result[0], marvelImage:marvelData?.path, description:marvelData?.description, powers }
      }else{
        newData = { data:result[0], marvelImage:false, description:false, powers }
      }
    }else{
      newData = false
    }
    return newData
  }

  const [activeStep, setActiveStep] = React.useState(-1);
  // const steps = getSteps();

  const handleNext = () => {
    if(activeStep<getSteps().length){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else{
      setActiveStep(-1);
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ['Init VM', 'Load Models', 'FIGHT!'];
  }
  const steps = getSteps();
  const classes = useStyles();
  const [player1Data, setPlayer1Data]= useState(false)
  const [player2Data, setPlayer2Data]= useState(false)

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
         
        <div className={classes.heroContent}>
          
          <Container maxWidth="md" className={classes.mainContent}>
          <Title>
            battle beta
          </Title>
          <Divider style={{marginTop:'20px',marginBottom:'30px'}}/>
          <Box className={classes.fightBar} >  
            <BattleSteps steps={steps} activeStep={activeStep}/>
              <div>
                <a href="#" onClick={handleNext} className={classes.fightButton}>Fight!</a>
              </div>
            <BattleSteps steps={steps} activeStep={activeStep}/>
          </Box> 
          <Divider style={{marginBottom:'20px'}} /> 
            <Grid container spacing={1} style={{display:'flex', flexDirection:'row'}}>
              <Grid item xs={12} md={6} >
                <Autocomplete
                  id="combo-box-demo"
                  autoComplete
                  options={heros}
                  onChange={(params, value)=>{
                    setPlayer1Data(getPlayerData(value))
                  }}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super"  />}
                />

                  {!player1Data ? <h1>pick one</h1>
                  : <SuperHeroCard playerData={player1Data} /> }   
               
              </Grid>

              <Grid item xs={12} md={6} >
    
                <Autocomplete
                  id="combo-box-demo2"
                  autoComplete
                  options={heros}
                  onChange={(params, value)=>{
                    setPlayer2Data(getPlayerData(value))
                  }}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super" />}
                />

                  {!player2Data ? <h1>pick one</h1>
                  : <SuperHeroCard playerData={player2Data} /> } 

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





