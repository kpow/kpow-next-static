import Layout from '@components/Layout';
import React, { useState } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import SuperHeroCard from '@components/battle/SuperHeroCard';
import BattleSteps from '@components/battle/BattleSteps';
import Title from '@components/shared/Title';
import createHeroData from '@utils/createHeroData';
import runBattle from 'utils/runBattle';
import SuperHeroCardSkeleton from '@components/battle/SuperHeroCardSkeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BattleController from '@components/battle/BattleController';
import postBattle from '../api/postBattle';
import heros from '../src/superheros-prod';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginTop: '20px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
    marginTop: '10px;',
  },
  mainContent: {
    width: '100%',
    backgroundColor: '#fafafa',
  },
  fightBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  controller: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  controllerOne: {
    minWidth: '350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

}));

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#3f51b5',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: '#999',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
// eslint-disable-next-line arrow-body-style
}))(({ activeStep, steps, classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Battle = ({ title, description }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const gridSpacing = matches ? 2 : 0;

  const [randomPlay, setRandomPlay] = useState(true);
  const [winnerPick, setWinnerPick] = React.useState('');
  const [wager, setWager] = React.useState(20);
  const [stash, setStash] = React.useState(0);
  // eslint-disable-next-line no-unused-vars
  const [wagerError, setWagerError] = React.useState(false);

  const [player1Data, setPlayer1Data] = useState(false);
  const [player2Data, setPlayer2Data] = useState(false);
  const [winner, setWinner] = useState(false);
  const [activeStep, setActiveStep] = React.useState(-1);
  const steps = ['Data', 'AI', 'FIGHT!'];
  const rInt = (max = 1, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min;

  React.useEffect(() => {
    if (randomPlay) {
      const localStash = localStorage.getItem('heroStash');
      // eslint-disable-next-line no-unused-expressions
      localStash ? setStash(localStorage.getItem('heroStash')) : setStash(100);
      setPlayer1Data(createHeroData(heros[rInt(heros.length, 0)]));
      setPlayer2Data(createHeroData(heros[rInt(heros.length, 0)]));
    }
  }, [setPlayer1Data, setPlayer2Data, createHeroData]);

  const handleReset = () => {
    setActiveStep(-1);
    setWinner('');
    if (randomPlay) {
      setPlayer1Data(createHeroData(heros[rInt(heros.length, 0)]));
      setPlayer2Data(createHeroData(heros[rInt(heros.length, 0)]));
    }
  };

  function createData(key, value) {
    return { key, value };
  }

  const handleBattle = () => {
    let i = -1;
    const int = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      i++;
      setActiveStep(i);
      if (i === steps.length) {
        const battleWinner = runBattle(player1Data, player2Data);
        // eslint-disable-next-line max-len
        const newStash = battleWinner[0].value === winnerPick ? (Number(stash) + Number(wager)) : (Number(stash) - Number(wager));
        setWinner(battleWinner[0].value);

        // eslint-disable-next-line no-unneeded-ternary
        let isWinner = battleWinner[0].value === winnerPick ? true : false;
        isWinner = randomPlay ? isWinner : 'none';
        const wagerData = randomPlay ? wager : 'none';
        const stashData = randomPlay ? stash : 'none';
        battleWinner.push(createData('isWinner', isWinner));
        battleWinner.push(createData('wager', wagerData));
        battleWinner.push(createData('stash', stashData));

        if (randomPlay) {
          setStash(newStash);
          localStorage.setItem('heroStash', newStash);
        }
        postBattle(battleWinner);
        clearInterval(int);
      }
    }, 400);
  };

  const handleTextChange = (event) => {
    const maxBet = 100;
    const minBet = 1;
    if (event.target.value > maxBet) {
      setWager(maxBet);
    } else if (event.target.value < minBet) {
      setWager(minBet);
    } else {
      setWager(event.target.value);
    }
  };
  const handleRadioChange = (event) => setWinnerPick(event.target.value);
  const handleRandomChange = (event) => setRandomPlay(event.target.checked);

  return (
    <Layout pageTitle={`${title} | kpow`} description={description}>

      <div className={classes.heroContent} id="mainContent">
        <Container maxWidth="md" className={classes.mainContent}>
          <div className={classes.root}>
            <Title>
              battle beta
            </Title>
            <FormControlLabel
              control={<IOSSwitch activeStep={activeStep} steps={steps} checked={randomPlay} onChange={handleRandomChange} name="randomPlay" />}
              label="random"
            />
          </div>

          <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

          <div className={classes.root}>
            <Paper className={classes.fightBar}>
              <BattleSteps steps={steps} activeStep={activeStep} />
            </Paper>
            {player1Data && player2Data
              ? (
                <BattleController
                  randomPlay={randomPlay}
                  player1Data={player1Data}
                  player2Data={player2Data}
                  wager={wager}
                  wagerError={wagerError}
                  winner={winner}
                  stash={stash}
                  handleBattle={handleBattle}
                  handleRadioChange={handleRadioChange}
                  handleTextChange={handleTextChange}
                  handleReset={handleReset}
                  activeStep={activeStep}
                  steps={steps}
                />
              ) : <></> }
          </div>

          <Grid container spacing={gridSpacing} style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={6} md={6}>
              {!randomPlay
                ? (
                  <Autocomplete
                    id="combo-box-demo"
                    autoComplete
                    options={heros}
                    onChange={(params, value) => {
                      setPlayer1Data(createHeroData(value));
                      handleReset();
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="pick a super" />}
                  />
                )
                : <></> }

              {!player1Data ? <SuperHeroCardSkeleton />
                : <SuperHeroCard winner={winner} playerData={player1Data} /> }

            </Grid>
            <Grid item xs={6} md={6}>

              {!randomPlay
                ? (
                  <Autocomplete
                    id="combo-box-demo"
                    autoComplete
                    options={heros}
                    onChange={(params, value) => {
                      setPlayer2Data(createHeroData(value));
                      handleReset();
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="pick a super" />}
                  />
                )
                : <></> }

              {!player2Data ? <SuperHeroCardSkeleton />
                : <SuperHeroCard winner={winner} playerData={player2Data} /> }

            </Grid>
          </Grid>

        </Container>
      </div>
    </Layout>
  );
};

export default Battle;

export async function getStaticProps() {
  // const configData = await import(`../siteconfig.json`);

  return {
    props: {
      title: 'hero battle',
      description: 'feed my machine learning project by wagering on some super battles',
    },
  };
}
