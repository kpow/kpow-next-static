import Layout from '@components/Layout'
import React, { useState, useEffect, useRef } from "react";

import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import heros from '../src/superheros-prod';
import Divider from '@material-ui/core/Divider'
import SuperHeroCard from '@components/SuperHeroCard';
import BattleSteps from '@components/BattleSteps';
import Title from '@components/Title';
import createHeroData from '@utils/createHeroData';
import runBattle from 'utils/runBattle';
import SuperHeroCardSkeleton from '@components/SuperHeroCardSkeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import postBattle from '../api/postBattle';
import BattleController from '@components/BattleController';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginTop: '20px',
    display:'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
    marginTop: '10px;'
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
    marginBottom:'10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
  },
  controller:{
    width:'100%',
    display:'flex',
    justifyContent:'center', 
    flexDirection:'column', 
    alignItems:'center',
    marginBottom:20
  },
  controllerOne:{
    minWidth:'350px',
    display:'flex',
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
  }

}));

const FightButton = ({player1Data, player2Data, handleBattle, handleReset, activeStep, steps}) => {
  const classes = useStyles();
  if(activeStep <= -1 && player1Data && player2Data){
    return(
      <Button fullWidth href="#mainContent"  onClick={handleBattle}  variant="contained" color="secondary">
        fight
      </Button>
    )
  }else if(activeStep>=steps.length){
    return(
      <Button fullWidth onClick={handleReset}  variant="contained" color="secondary">
        reset
      </Button>
    )
  }else{
    return(
      <Button fullWidth variant="contained" color="secondary">
      ........
      </Button>
    )
  }
}

const Battle = ({ title, description, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const gridSpacing = matches ? 2 : 0;

  const [gameObject, setGameObject]= useState({});
  const [winnerPick, setWinnerPick] = React.useState('');
  const [wager, setWager] = React.useState(0);
  const [stash, setStash] = React.useState(100);
  const [wagerError, setWagerError] = React.useState(false);

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
          const battleWinner = runBattle(player1Data,player2Data)
          const newStash = battleWinner[0].value == winnerPick ? (Number(stash)+Number(wager)) : (Number(stash)-Number(wager))
          setWinner(battleWinner[0].value)
          setStash(newStash)
          postBattle(battleWinner);
          clearInterval(int);
        }
      },400)    
  }

  const handleRadioChange = (event) => {
    setWinnerPick(event.target.value);
  };

  const handleTextChange = (event) => {
    setWager(event.target.value)
    event.target.value < 0 ? setWagerError(true) : setWagerError(false);
  
  }

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
         
        <div className={classes.heroContent}>
          <Container maxWidth="md" className={classes.mainContent} id="mainContent">
            <Title>
              battle beta
            </Title>
            <Divider style={{marginTop:'20px',marginBottom:'20px'}}/>
          
            <Box className={classes.fightBar} >  
              <BattleSteps steps={steps} activeStep={activeStep} />
            </Box>

            {player1Data && player2Data ? 
              <BattleController player1Data={player1Data} player2Data={player2Data} wager={wager} wagerError={wagerError} winner={winner} stash={stash} handleBattle={handleBattle} handleRadioChange={handleRadioChange} handleTextChange={handleTextChange} handleReset={handleReset} activeStep={activeStep} steps={steps} />
              : <></>
            }     

            <Grid container spacing={gridSpacing} style={{display:'flex', flexDirection:'row'}}>
              <Grid item xs={6} md={6} >
                <Autocomplete
                  id="combo-box-demo"
                  autoComplete
                  options={heros}
                  onChange={(params, value)=>{
                    setPlayer1Data(createHeroData(value));
                    handleReset();
                  }}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super"  />}
                />

                  {!player1Data ? <SuperHeroCardSkeleton />
                  : <SuperHeroCard winner={winner} playerData={player1Data} /> }   
               
              </Grid>

              <Grid item xs={6} md={6} >
    
                <Autocomplete
                  id="combo-box-demo2"
                  autoComplete
                  options={heros}
                  onChange={(params, value)=>{
                    setPlayer2Data(createHeroData(value));
                    handleReset();
                  }}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super" />}
                />

                  {!player2Data ? <SuperHeroCardSkeleton />
                  : <SuperHeroCard winner={winner} playerData={player2Data} /> } 

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





