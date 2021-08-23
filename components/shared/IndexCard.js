import { React } from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNextOutlined';
import Divider from '@material-ui/core/Divider';
import Title from '@components/shared/Title';

const IndexCard = ({ title, link, image, button }) => (
  <Grid item xs={12} sm={6} md={4} style={{ margin: '0 auto' }}>
    <Divider style={{ marginTop: '10px' }} />
    <Box style={{ display: 'flex' }}>
      <Title>
        {title}
      </Title>
      <Link href={link}>
        <Button
          style={{ marginTop: '15px' }}
          size="small"
          variant="outlined"
          endIcon={<NavigateNextIcon />}
        >
          {button}
        </Button>
      </Link>
    </Box>
    <Divider style={{ marginTop: '10px' }} />
    <Link href={link}>
      <Paper elevation={4} style={{ marginTop: '20px', marginBottom: '20px' }}>
        <img alt="battle" style={{ width: '100%' }} src={image} />
      </Paper>
    </Link>
  </Grid>
);

export default IndexCard;
