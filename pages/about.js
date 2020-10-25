import Layout from '@components/Layout'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BathtubIcon from '@material-ui/icons/Bathtub';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import CodeIcon from '@material-ui/icons/Code';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import PolymerIcon from '@material-ui/icons/Polymer';

import Title from '@components/Title';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(0, 0, 0),
    marginTop: '30px;'
  },
  heroPaper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(0),
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto'
  },
  heroButtons: { 
    marginTop: theme.spacing(4),
  }, 
  heroText: {
    fontSize: '1.25rem'
  },
  bioText: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  bioImage:{
    margin: '0 auto',
    maxWidth: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:'30px;'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    fontWeight: 'bold'
  },
  mainContent: {
    paddingTop:'30px;',
    paddingBottom:'30px;',
    marginTop: '-40px',
    backgroundColor: '#fafafa'
  },
}));

const About = ({ title, description, ...props }) => {
  const classes = useStyles();

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
        <div className={classes.heroContent}>
          <Container maxWidth="md" className={classes.mainContent}>
            <Paper elevation={3} className={classes.heroPaper}>
            <Title>
              Hi, I'm Kevin
            </Title>
            <Typography className={classes.heroText} variant="h5" align="center" color="textSecondary" paragraph>
                Digital Architect - Leader - Developer - Pixel Farmer.
                <br></br>
                Voracious Reader and Dad. 
                <br></br>
                I'm into travel, ukes, pugs, live music, and pixels.
            </Typography>
            </Paper>

            <Box className={classes.bioText}>
              <Title>
                what's up?
              </Title>

          <div className={classes.demo}>
            <List dense={false}>
                <ListItem>
                  <ListItemIcon>
                    <BathtubIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary=" A digital Swiss Army knife with 20+ years of experience"
                    // secondary="Secondary textl"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BubbleChartIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Interfacing with stakeholders and UX/design teams"
                    // secondary="Secondary textl"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Managing development resources and product development"
                    // secondary="Secondary textl"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmojiFoodBeverageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Maintaining partner relationships"
                    // secondary="Secondary textl"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalFloristIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Defining requirements and providing documentation"
                    // secondary="Secondary textl"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PolymerIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="evaluating and elevating platforms, tools, and environments"
                    // secondary="Secondary textl"
                  />
                </ListItem>
            </List>
          </div>
          
              <Typography component="p" style={{marginTop:'20px'}} gutterBottom>
                I am a technologist with a relentless passion for designing solutions that overcome technical obstacles. Pushing for innovation, I continually challenge myself and my teams to make technology work harder and smarter for clients. Crafting dynamic experiences, robust design systems, efficient development practices, and continuous learning are among my core principles. Also, I am a donut connoisseur.
              </Typography>
            </Box>

            <img className={classes.bioImage} src='../static/kpow.jpg' />

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button  href="https://github.com/kpow/kpow-next-static" target="_blank" variant="contained">
                    Site Repo
                  </Button>
                </Grid>
                <Grid item>
                  <Button  href="https://www.visualcv.com/kevin-power/" target="_blank"  variant="contained">
                    CV
                  </Button>
                </Grid>
              </Grid>
            </div>
            
            
          </Container>
        </div>
      </Layout>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
