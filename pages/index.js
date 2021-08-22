/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { React, useState, useEffect } from 'react';
import Layout from '@components/Layout';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNextOutlined';
import Divider from '@material-ui/core/Divider';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '@components/shared/Title';
import Container from '@material-ui/core/Container';
import StarList from '@components/stars/StarList';
import ScrobbleList from '@components/scrobbles/ScrobbleList';
import BookList from '@components/books/BookList';
import getPosts from '@utils/getPosts';
import { Masonry } from 'masonic';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// still need to work on projects section
const shuffle = (array) => [...Array(array.length)]
  .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
  // eslint-disable-next-line no-return-assign
  .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

const ProjectCard = ({ data }) => (
  <Link href={{ pathname: `/projects/${data?.slug}` }}>
    <img style={{ width: '100%' }} alt="kitty" src={data?.frontmatter?.thumb_image} />
  </Link>
);

const Index = ({ projects, title, description }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const totalScrobbleDisplay = matches ? 50 : 50;
  const totalStarsDisplay = matches ? 3 : 2;
  const totalBooksDisplay = matches ? 2 : 2;
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
    localStorage.setItem('closedSnackbar', true);
  };

  useEffect(() => {
    const snackBarStatus = localStorage.getItem('closedSnackbar');
    setOpen(!snackBarStatus);
    console.log(snackBarStatus);
  }, []);

  shuffle(projects);

  return (

    <Layout pageTitle={title} description={description}>
      <div style={{ backgroundColor: '#fafafa', padding: '15px' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            style={{ textAlign: 'left', marginTop: theme.spacing(7) }}
          >
            Hi! this my site :) You&#36;ll find my digital collections, coding experiments and my public info. Hopefully, it&apos;s working and have fun poking around.
          </Alert>
        </Snackbar>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4} style={{ margin: '0 auto' }}>
            <Divider style={{ marginTop: '10px' }} />
            <Box style={{ display: 'flex' }}>
              <Title>
                battle
              </Title>
              <Link href="/battle">
                <Button
                  style={{ marginTop: '15px' }}
                  size="small"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                >
                  play
                </Button>
              </Link>
            </Box>
            <Divider style={{ marginTop: '10px' }} />
            <Link href="/battle">
              <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <img alt="battle" style={{ width: '100%' }} src="/static/battle_thumb.jpg" />
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={{ margin: '0 auto' }}>
            <Divider style={{ marginTop: '10px' }} />
            <Box style={{ display: 'flex' }}>
              <Title>
                tunes
              </Title>
              <Link href="/youtube">
                <Button
                  style={{ marginTop: '15px' }}
                  size="small"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                >
                  listen
                </Button>
              </Link>
            </Box>
            <Divider style={{ marginTop: '10px' }} />
            <Link href="/youtube">
              <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <img alt="tunes" style={{ width: '100%' }} src="/static/tunes_thumb.jpg" />
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ margin: '0 auto' }}>
            <Divider style={{ marginTop: '10px' }} />
            <Box style={{ display: 'flex' }}>
              <Title>
                pmonk
              </Title>

              <Link href="/pmonk">
                <Button
                  style={{ marginTop: '15px' }}
                  size="small"
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                >
                  checkit
                </Button>
              </Link>
            </Box>
            <Divider style={{ marginTop: '10px' }} />
            <Link href="/pmonk">
              <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <img alt="pmonk" style={{ width: '100%' }} src="/static/pmonk_thumb.jpg" />
              </Paper>
            </Link>
          </Grid>
        </Grid>

        <Divider style={{ marginTop: '40px' }} />
        <ScrobbleList howMany={totalScrobbleDisplay} />

        <Divider style={{ marginTop: '40px' }} />
        <BookList howMany={totalBooksDisplay} />

        <Divider style={{ marginTop: '40px' }} />
        <Title>
          projects
        </Title>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          a selection of projects I&apos;ve worked on.
        </Typography>
        <Container maxWidth="md" style={{ maxHeight: '40vh', overflow: 'hidden' }}>
          <Masonry
            items={projects}
            columnGutter={2}
            columnWidth={250}
            overscanBy={1}
            render={ProjectCard}
          />
        </Container>

        <Divider style={{ marginTop: '40px' }} />
        <StarList howMany={totalStarsDisplay} />

        <Divider style={{ marginTop: '40px' }} />
        <Title>
          instagram
        </Title>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          I love live music (when we had live music)
        </Typography>
        <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2" />

        <Divider style={{ marginTop: '40px' }} />
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  const projects = ((context) => getPosts(context))(require.context('../projects', true, /\.md$/));

  return {
    props: {
      projects,
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
