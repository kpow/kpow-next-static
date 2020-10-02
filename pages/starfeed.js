import React from 'react'
import Layout from '@components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StarList from 'components/StarList';
import Title from '@components/Title';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing( 0, 0),
  },
  heroButtons: { 
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  paperPadding: { 
    padding: theme.spacing(4),
    margin: theme.spacing(2,0)  
  },
}));

const Hero = () =>{
  const classes = useStyles();
  return(
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paperPadding}>
          <Title>
            star feed
          </Title>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :) 
          </Typography>
        </Paper>
      </Container>
    </div>
  )
}

export default function Starfeed({title, description, ...props }) {
  const classes = useStyles();

  return (
    <Layout pageTitle={title} description={description}>
      <Hero />
      <StarList howMany={9}/>
    </Layout>
  )
}

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
