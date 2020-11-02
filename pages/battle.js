import Layout from '@components/Layout'
import { useState, useEffect } from 'react';

import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import heros from '../src/superheros-prod';
import marvel from '../src/marvel';
import Divider from '@material-ui/core/Divider'
import SuperHeroCard from '@components/SuperHeroCard';
import fetchHeros from '../api/fetchHeros.js';
import SecurityIcon from '@material-ui/icons/Security';
import {
  useQuery,
  useQueryCache,
  QueryCache
} from 'react-query';

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
    marginBottom:'30px'
  },
  fightButton: {
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
    return heros[0]
  }
  const classes = useStyles();
  const [player1Data, setPlayer1Data]= useState(false)
  const [player2Data, setPlayer2Data]= useState(false)

  return (
      <Layout pageTitle={`${title} | About`} description={description}>

        <div className={classes.heroContent}>
          <Container maxWidth="md" className={classes.mainContent}>
          <Box className={classes.fightBar} >  
            <a href="#" className={classes.fightButton}>Fight!</a>
          </Box> 
          <Divider /> 
            <Grid container spacing={1} style={{display:'flex', flexDirection:'row'}}>
              <Grid item xs={12} md={6} >
                <Autocomplete
                  id="combo-box-demo"
                  options={heros}

                  onChange={(params, value)=>{
                    let newData
                    if(value){
                      const result = heros.filter(item => item.name == value.name);
                      if(result[0]?.biography?.publisher == "Marvel Comics"){
                        const heroDescription = getMarvelData(value.name)
                        newData = { data:result[0], description:heroDescription?.description }
                      }else{
                        newData = { data:result[0], description:false }
                      }
                    }else{
                      newData = false
                    }
                    setPlayer1Data(newData)
                    
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
                    let newData
                    if(value){
                      const result = heros.filter(item => item.name == value.name);
                      if(result[0]?.biography?.publisher == "Marvel Comics"){
                        const heroDescription = getMarvelData(value.name)
                        newData = { data:result[0], description:heroDescription?.description }
                      }else{
                        newData = { data:result[0], description:false }
                      }
                    }else{
                      newData = false
                    }
                    setPlayer2Data(newData)
                    
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





