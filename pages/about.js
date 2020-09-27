import Layout from '@components/Layout'
import { Container, Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: { 
    marginTop: theme.spacing(4),
  }
}));


const About = ({ title, description, ...props }) => {
  const classes = useStyles();

  return (
      <Layout pageTitle={`${title} | About`} description={description}>
          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Hi, I'm Kevin
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Digital Architect - Leader - Developer - Pixel Farmer.
                    <br></br>
                    Director of E-Commerce at Barefoot Spas
                    <br></br>
                    Voracious Reader and Dad. 
                    <br></br>
                    I'm into travel, ukes, pugs, live music, and pixels.
                </Typography>
                <Typography component="p" gutterBottom>
                  A digital Swiss Army knife with 20+ years of web development and creative services experience. I am well versed in interfacing with stakeholders and UX/design teams, managing development resources and product development, maintaining partner relationships and requirements, and providing documentation while also evaluating and elevating platforms, tools, and environments.
                </Typography>
                <Typography component="p" gutterBottom>
                  I am a technologist with a relentless passion for designing solutions that overcome technical obstacles. Pushing for innovation, I continually challenge myself and my teams to make technology work harder and smarter for clients. Crafting dynamic experiences, robust design systems, efficient development practices, and continuous learning are among my core principles. Also, I am a donut connoisseur.
                </Typography>

                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        Site Repo
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        My Resume
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>

          </main>
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
