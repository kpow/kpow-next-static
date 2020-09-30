import Layout from '@components/Layout'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Title from '@components/Title';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(0, 0, 6),
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
  }
}));

const About = ({ title, description, ...props }) => {
  const classes = useStyles();

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Paper elevation={3} className={classes.heroPaper}>
            <Title>
              Hi, I'm Kevin
            </Title>
            <Typography className={classes.heroText} variant="h5" align="center" color="textSecondary" paragraph>
                Digital Architect - Leader - Developer - Pixel Farmer.
                <br></br>
                Director of E-Commerce at Barefoot Spas
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
              <Typography component="p" gutterBottom>
                A digital Swiss Army knife with 20+ years of web development and creative services experience. I am well versed in interfacing with stakeholders and UX/design teams, managing development resources and product development, maintaining partner relationships and requirements, and providing documentation while also evaluating and elevating platforms, tools, and environments.
              </Typography>
              <Typography component="p" style={{marginTop:'20px'}} gutterBottom>
                I am a technologist with a relentless passion for designing solutions that overcome technical obstacles. Pushing for innovation, I continually challenge myself and my teams to make technology work harder and smarter for clients. Crafting dynamic experiences, robust design systems, efficient development practices, and continuous learning are among my core principles. Also, I am a donut connoisseur.
              </Typography>
            </Box>

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained">
                    Site Repo
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">
                    My Resume
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
