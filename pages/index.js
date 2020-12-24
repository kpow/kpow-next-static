import Layout from '@components/Layout';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNextOutlined'
import Divider from '@material-ui/core/Divider'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '@components/shared/Title';
import Container from '@material-ui/core/Container';
import StarList from '@components/stars/StarList';
import BookList from '@components/books/BookList';
import getPosts from '@utils/getPosts';
import { Masonry } from "masonic";
import useMediaQuery from '@material-ui/core/useMediaQuery'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// still need to work on projects section
const shuffle = array => 
  [...Array(array.length)]
    .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
    .reduce( (a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

const ProjectCard = ({data}) => {
  return (
  <Link href={{ pathname: `/projects/${data?.slug}` }}>    
      <img style={{width:'100%'}} alt="kitty" src={data?.frontmatter?.thumb_image} />    
  </Link>
)
};

const Index = ({ projects, title, description, ...props }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const totalStarsDisplay = matches ? 3 : 2;
  const totalBooksDisplay = matches ? 2 : 2;
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {return;}
    setOpen(false);
    const current = Date();
    localStorage.setItem('closedSnackbar', true);
  };

  React.useEffect(() => {
      const snackBarStatus = localStorage.getItem('closedSnackbar')
      setOpen(!snackBarStatus)      
  })

  shuffle(projects)

  return (
    
      <Layout pageTitle={title} description={description}>
        <div style={{ backgroundColor: '#fafafa',padding:'15px'}}>
          <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={open} autoHideDuration={8000} 
            onClose={handleClose}
          >
            <Alert 
              onClose={handleClose} 
              severity="info" 
              style={{textAlign:'left', marginTop: theme.spacing(7) }}
            >
              Hi! this my site :) You'll find my digital collections, coding experiments and my public info. Hopefully, it's working and have fun poking around.
            </Alert>
          </Snackbar>
          <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={4} style={{margin:'0 auto'}}>
                {/* <Paper style={{padding:15}}> */}
                <Divider style={{marginTop:'10px'}} />
                <Box style={{display:'flex'}}>
                  <Title>
                    battle
                  </Title>
                    <Link href='/battle'>
                      <Button
                        style={{marginTop:'15px'}}
                        size="small" 
                        variant="outlined" 
                        endIcon={<NavigateNextIcon />}
                        children="play"
                      />
                    </Link> 
                  </Box>
                  <Divider style={{marginTop:'10px'}} />
                  <Link href='/battle'>
                    <Paper elevation={4} style={{marginTop:'20px',marginBottom:'20px'}}>
                      <img style={{width:'100%'}}  src="/static/battle_thumb.jpg" />    
                    </Paper>
                  </Link>
                  {/* <Typography variant="body2" color="textSecondary" component="p">
                    600+ heros, 9 power stats, wildcards, across multiple universes battling for dominance and you get to wager on it.
                  </Typography> */}
                {/* </Paper> */}
              </Grid>  

              <Grid item xs={12} sm={6} md={4} style={{margin:'0 auto'}}>
                {/* <Paper style={{padding:15}}> */}
                  <Divider style={{marginTop:'10px'}} />
                  <Box style={{display:'flex'}}>
                  <Title>
                    tunes
                  </Title>
                    <Link href='/youtube'>
                      <Button
                        style={{marginTop:'15px'}}
                        size="small" 
                        variant="outlined" 
                        endIcon={<NavigateNextIcon />}
                        children="listen"
                      />
                    </Link> 
                  </Box>
                  <Divider style={{marginTop:'10px'}} />
                  <Link href='/youtube'>
                    <Paper elevation={4} style={{marginTop:'20px',marginBottom:'20px'}}>
                      <img style={{width:'100%'}}  src="/static/tunes_thumb.jpg" />    
                    </Paper>
                  </Link>
                  {/* <Typography variant="body2" color="textSecondary" component="p">
                    These are some of the best live tunes I've found on youtube, some real gems. It's amazing what you can find out there. 
                  </Typography> */}
                {/* </Paper> */}
              </Grid>  

              <Grid item xs={12} sm={12} md={4} style={{margin:'0 auto'}}>
                {/* <Paper style={{padding:15}}> */}
                  <Divider style={{marginTop:'10px'}} />  
                  <Box style={{display:'flex'}}>
                    <Title>
                      pmonk
                    </Title>

                    <Link href='/pmonk'>
                      <Button
                        style={{marginTop:'15px'}}
                        size="small" 
                        variant="outlined" 
                        endIcon={<NavigateNextIcon />}
                        children="checkit"
                      />
                    </Link>
                  </Box>
                  <Divider style={{marginTop:'10px'}} />
                    <Link href='/pmonk'>
                      <Paper elevation={4} style={{marginTop:'20px',marginBottom:'20px'}}>
                        <img style={{width:'100%'}}  src="/static/pmonk_thumb.jpg" />    
                      </Paper>   
                    </Link>
                  {/*<Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>*/}
                {/* </Paper> */}
              </Grid>  
          </Grid>

          <Divider style={{marginTop:'40px'}} />
          <BookList howMany={totalBooksDisplay}/>
          
          <Divider style={{marginTop:'40px'}} />
          <Title>
            projects
          </Title>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            a selection of projects I've worked on.
          </Typography>
          <Container maxWidth="md" style={{maxHeight:'40vh', overflow:'hidden'}}>
            <Masonry
              items={projects}
              columnGutter={2}
              columnWidth={250}
              overscanBy={1}
              render={ProjectCard}
            />
          </Container>

          <Divider style={{marginTop:'40px'}}/>
          <StarList howMany={totalStarsDisplay}/>

          <Divider style={{marginTop:'40px'}}/>
          <Title>
            instagram
          </Title>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            I love live music (when we had live music) 
          </Typography>
          <div className="elfsight-app-aa9b91b7-7757-4793-aae3-67df059446a2"></div>

          <Divider style={{marginTop:'40px'}} />
        </div>
      </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const projects = ((context) => {
    return getPosts(context)
  })(require.context('../projects', true, /\.md$/))

  return {
    props: {
      projects,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
