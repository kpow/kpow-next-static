import Layout from '@components/Layout'
import React, { useState, useEffect, useRef } from "react";

import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';



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

const BattleController = ({player1Data, player2Data, wager, wagerError,winner,stash, handleBattle,handleRadioChange,handleTextChange, handleReset, activeStep, steps}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const gridSpacing = matches ? 2 : 0;

  return (

<Box className={classes.controller}>

    <Typography variant="h5" component="h2" style={{textAlign:'center', paddingBottom:20}}>
        Winner: {activeStep == steps.length ? <>{winner}</> : <>????</> } 
    </Typography>

    <div>
        <FormControl component="fieldset">
            <RadioGroup className={classes.controllerOne} onChange={handleRadioChange} row aria-label="position" name="position" defaultValue="center" >
                
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

                <div style={{display:'flex',alignItems:'center',flexDirection:'column', justifyContent:'center'}}>
                
                    <div>
                        <TextField
                        size="small"
                        style={{maxWidth:80,padding:'5px'}}
                        onChange={handleTextChange}
                        id="outlined-number"
                        label="bet"
                        error={wagerError}
                        type="number"
                        value={wager}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        />
                        <TextField
                        size="small"
                        style={{maxWidth:80,padding:'5px'}}
                        disabled
                        id="outlined-number"
                        label="stash"
                        type="number"
                        value={stash}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        />
                    </div>

                    <FightButton 
                        player1Data={player1Data} 
                        player2Data={player2Data} 
                        steps={steps}
                        activeStep={activeStep} 
                        handleBattle={handleBattle} 
                        handleReset={handleReset} 
                    />

                </div>
            </RadioGroup>
                
        </FormControl>
    </div>

</Box>  
  )
}

export default BattleController







