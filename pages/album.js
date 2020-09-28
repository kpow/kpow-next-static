import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Layout from 'components/Layout';


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
    padding: theme.spacing(4) 
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album({ title, description, ...props }) {
  const classes = useStyles();

  return (
      <Layout pageTitle={`${title} | XXXX`} description={description}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
          <Paper elevation={3} className={classes.paperPadding}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              star feed
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              I'm still a big RSS fan. Here is a feed of the articles, that I star for some reason :) 
            </Typography>
          </Paper>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
             
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    
  );
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