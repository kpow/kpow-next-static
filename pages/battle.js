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
import { DataGrid } from '@material-ui/data-grid';

import Title from '@components/Title';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginTop: '30px'
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
    marginTop: '30px;'
  },
  mainContent: {
    paddingTop:'30px;',
    paddingBottom:'30px;',
    marginTop: '-40px',
    backgroundColor: '#fafafa'
  },
}));

const HeroCard = ({playerData}) =>{
  const classes = useStyles();
  return(
      <Card className={classes.root}>
                  
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="440"
          image={playerData?.images?.lg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {playerData?.name}
          </Typography>
          <div style={{height: 325}}>
          <DataGrid
              hideFooter
              columns={[{ field: 'powerstat' },{ field: 'value' }]}
              rows={[
                { id: 1, powerstat: 'combat', value:playerData?.powerstats?.combat },
                { id: 2, powerstat: 'durability', value:playerData?.powerstats?.durability },
                { id: 3, powerstat: 'intelligence', value:playerData?.powerstats?.intelligence },
                { id: 4, powerstat: 'speed', value:playerData?.powerstats?.speed },
                { id: 5, powerstat: 'strength', value:playerData?.powerstats?.strength },
              ]}
          />
          </div>
          <div style={{height: 375}}>
          <DataGrid
              hideFooter
              columns={[{ field: 'appearance' },{ field: 'value' }]}
              rows={[
                { id: 1, appearance: 'gender', value:playerData?.appearance?.gender },
                { id: 2, appearance: 'race', value:playerData?.appearance?.race },
                { id: 3, appearance: 'height', value:playerData?.appearance?.height[0] },
                { id: 4, appearance: 'weight', value:playerData?.appearance?.weight[0] },
                { id: 5, appearance: 'eye color', value:playerData?.appearance?.eyeColor },
                { id: 6, appearance: 'hair color', value:playerData?.appearance?.hairColor },
              ]}
          />
          </div>
          
        </CardContent>
    
      <CardActions>
        <Button size="small" color="primary">
          choose super
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

const Battle = ({ title, description, ...props }) => {
  const classes = useStyles();
  const [player1Data, setPlayer1Data]= useState({})
  const [player2Data, setPlayer2Data]= useState({})

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
        <div className={classes.heroContent}>
          <Container maxWidth="md" className={classes.mainContent}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} >
    
                <Autocomplete
                  id="combo-box-demo"
                  options={heros}
                  onChange={(params)=>{
                    const result = heros.filter(item => item.name == params.target.textContent);
                    setPlayer1Data(result[0])
                    console.log(result[0])
                  }}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super"  />}
                />
              
                <HeroCard playerData={player1Data} />    
               

              </Grid>
            
              
              <Grid item xs={12} md={6} >
    
                <Autocomplete
                  id="combo-box-demo2"
                  autoComplete
                  options={heros}
                  onChange={(params)=>{
                    const result = heros.filter(item => item.name == params.target.textContent);
                    setPlayer2Data(result[0])
                    console.log(result[0])
                  }}
                  
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="pick a super" />}
                />

                <HeroCard playerData={player2Data} />   

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
