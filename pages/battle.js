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

}));

const FightButton = ({player1Data, player2Data, handleBattle, handleReset, activeStep, steps}) => {
  const classes = useStyles();
  if(activeStep <= -1 && player1Data && player2Data){
    return(
      <Button href="#mainContent"  onClick={handleBattle}  variant="contained" color="secondary">
        fight
      </Button>
    )
  }else if(activeStep>=steps.length){
    return(
      <Button onClick={handleReset}  variant="contained" color="secondary">
        reset
      </Button>
    )
  }else{
    return(
      <Button variant="contained" color="secondary">
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
    setWager(0);
  };

  const handleBattle = () => {
      let i = -1
      const int = setInterval(()=>{
        i++
        setActiveStep(i);
        if( i == steps.length ){
          const battleWinner = runBattle(player1Data,player2Data)
          setWinner(battleWinner[0].value)
          if(battleWinner[0].value == winnerPick){
            console.log('winner winner')
          }
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
            <Box style={{width:'100%',display:'flex',justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h5" component="h2" style={{textAlign:'center'}}>
              Winner: {activeStep == steps.length ? <>{winner}</> : <>????</> } 
            </Typography>
            {player1Data && player2Data ? 
                  <div style={{paddingBottom:10,}}>
                   <FormControl component="fieldset">
                   <RadioGroup onChange={handleRadioChange} row aria-label="position" name="position" defaultValue="center" >
                     <div style={{display:'flex', flexDirection:'column'}}>
                     <FormControlLabel 
                        label={player1Data.data.name} 
                        value={player1Data.data.name} 
                        control={<Radio color="primary" />} 
                      />
                     <FormControlLabel 
                        label={player2Data.data.name} 
                        value={player2Data.data.name} 
                        control={<Radio color="primary" />} 
                      />
                     </div>
                     <div style={{display:'flex',alignItems:'center', justifyContent:'center', padding:'10px'}}>
                          <TextField
                            size="small"
                            style={{maxWidth:70}}
                            onChange={handleTextChange}
                            id="outlined-number"
                            label="bet"
                            type="number"
                            value={wager}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                          />
                     </div>
                   </RadioGroup>
                   <FightButton 
                     player1Data={player1Data} 
                     player2Data={player2Data} 
                     steps={steps}
                     activeStep={activeStep} 
                     handleBattle={handleBattle} 
                     handleReset={handleReset} 
                   />         
                 </FormControl>
                 {/* <p>user pick: {winnerPick} - wager: {wager}</p>            */}
                </div>
                  : <></>
            }     
       

            </Box> 
         
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





