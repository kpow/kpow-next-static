import Layout from '@components/Layout'
import { Container, Grid, Button, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Link from 'next/link';
import NavigateNextIcon from '@material-ui/icons/NavigateNextOutlined'
import Divider from '@material-ui/core/Divider'
import Title from '@components/shared/Title';

const Pmonk = ({ title, description, ...props }) => {

  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="md">
 
      <Grid container spacing={5}>
              <Grid item xs={12} sm={6} md={4} style={{margin:'0 auto'}}>
                {/* <Paper style={{padding:15}}> */}
                <Divider style={{marginTop:'10px'}} />
                <Box style={{display:'flex'}}>
                  <Title>
                    artifacts
                  </Title>
                    <Link href='/pmonk-artifacts'>
                      <Button
                        style={{marginTop:'15px'}}
                        size="small" 
                        variant="outlined" 
                        endIcon={<NavigateNextIcon />}
                        children="go"
                      />
                    </Link> 
                  </Box>
                  <Divider style={{marginTop:'10px'}} />
                  <Link href='/pmonk-artifacts'>
                    <Paper elevation={4} style={{marginTop:'20px',marginBottom:'20px'}}>
                    <img style={{width:'100%'}}  src="/static/pmonk_thumb.jpg" />    
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
                    firehose
                  </Title>
                    <Link href='/pmonk-firehose'>
                      <Button
                        style={{marginTop:'15px'}}
                        size="small" 
                        variant="outlined" 
                        endIcon={<NavigateNextIcon />}
                        children="drink"
                      />
                    </Link> 
                  </Box>
                  <Divider style={{marginTop:'10px'}} />
                  <Link href='/pmonk-firehose'>
                    <Paper elevation={4} style={{marginTop:'20px',marginBottom:'20px'}}>
                      <img style={{width:'100%'}}  src="/static/pmonk_thumb.jpg" />      
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
                      video
                    </Title>

                    <Link href='/pmonk-youtube'>
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
                    <Link href='/pmonk-youtube'>
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
      </Container>
    </Layout> 
  );
}

export default Pmonk

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
