import Layout from '@components/Layout'
import { useState, useEffect } from 'react';

import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import heros from '../src/superheros-prod';
import Divider from '@material-ui/core/Divider'
import SuperHeroCard from '@components/SuperHeroCard';
import BattleSteps from '@components/BattleSteps';
import Title from '@components/Title';
import createHeroData from 'api/createHeroData';

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
  mainContent: {
    width:'100%',
    backgroundColor: '#fafafa'
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
  const classes = useStyles();
  const [player1Data, setPlayer1Data]= useState(false)
  const [player2Data, setPlayer2Data]= useState(false)
  const [winner, setWinner]= useState(false)
  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = getSteps();
  function getSteps() {
    return ['Init VM', 'Load Models', 'FIGHT!'];
  }

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

  function createData(key, value) {
      return { key, value};
  }

  const battle = (player1Data,player2Data) =>{
    // internal count as we compare stats each check will increase or decrease these 
    let player1Count =0;
    let player2Count = 0;

    // cycle through all the powerstats and compare and pick winner per stat save results to array
    const powerStats =  Object.keys(player1Data.data.powerstats)
    const battleResults = powerStats.map((power)=>{ 
      if(player1Data.data.powerstats[power] == player2Data.data.powerstats[power]){
        const rInt = (max = 1, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;
        rInt(1,0) ? player1Count++ : player2Count++;
      }else if(player1Data.data.powerstats[power] < player2Data.data.powerstats[power]){
        player2Count++
      }else if(player1Data.data.powerstats[power] > player2Data.data.powerstats[power]){
        player1Count++
      }
      // const winner = player1Data.data.powerstats[power] < player2Data.data.powerstats[power] ? player2Data.data.name : player1Data.data.name;
      // winner == player2Data.data.name ? player2Count++ : player1Count++;
      return createData(power, winner)
    })
    // add all power stats and pick the highest number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const player1PowerTotal = Object.values(player1Data.data.powerstats).reduce(reducer)
    const player2PowerTotal = Object.values(player1Data.data.powerstats).reduce(reducer)
    player1PowerTotal>player2PowerTotal ? player1Count++ : player2Count++;

    // compare counts to pick a winner
    const battleWinner = player1Count > player2Count ? player1Data : player2Data;
    const winnerObject = createData('winner',battleWinner)
    battleResults.push(winnerObject)
    console.log(player1Count+" - "+player2Count)
    return battleResults
  }


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
                <a href="#" 
                   onClick={()=>{setWinner(battle(player1Data,player2Data)[6].value.data.name)}} 
                   className={classes.fightButton}
                >
                  Fight!
                </a>
                <Divider style={{marginTop:'20px',marginBottom:'15px'}}/>
                <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                {winner}
                </Typography>
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
                    setPlayer1Data(createHeroData(value))
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
                    setPlayer2Data(createHeroData(value))
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





