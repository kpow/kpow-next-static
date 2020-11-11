import Layout from '@components/Layout'
import React, { useState, useEffect, useRef } from "react";

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
import runBattle from 'utils/runBattle';
import SuperHeroCardSkeleton from '@components/SuperHeroCardSkeleton';

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
    flexDirection:'column',
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

const FightButton = ({handleBattle, handleReset, activeStep, steps}) => {
  const classes = useStyles();
  if(activeStep <= -1){
    return(<a href="#" 
      onClick={handleBattle} 
      className={classes.fightButton}
    >Fight!</a>)
  }else if(activeStep>=steps.length){
    return(<a href="#" 
      onClick={handleReset} 
      className={classes.fightButton}
    >Reset!</a>)
  }else{
    return(<b>processing . . .</b>)
  }
    

}

const Battle = ({ title, description, ...props }) => {
  const classes = useStyles();
  const [player1Data, setPlayer1Data]= useState(false)
  const [player2Data, setPlayer2Data]= useState(false)
  const [winner, setWinner]= useState(false)
  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = ['Init', 'Data', 'AI','FIGHT!','Winner'];

  const handleNext = () => {
    if(activeStep<steps.length){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else{
      setActiveStep(-1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setWinner('');
  };


  const handleBattle = () => {
      let i = -1
      const int = setInterval(()=>{
        i++
        setActiveStep(i);
        if( i == steps.length ){
          setWinner(runBattle(player1Data,player2Data)[6].value)
          clearInterval(int);
        }
      },500)    
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
            <BattleSteps steps={steps} activeStep={activeStep} />
              <div style={{display:'flex', alignItems:'center', alignContent:'center'}}>
                <Typography variant="h5" component="h2" style={{textAlign:'center'}}>
                  {winner.data?.name}
                </Typography>
                <FightButton steps={steps} handleBattle={handleBattle} handleReset={handleReset} activeStep={activeStep}/>
                
              </div>
           
          </Box> 
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

                  {!player1Data ? <SuperHeroCardSkeleton />
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

                  {!player2Data ? <SuperHeroCardSkeleton />
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





