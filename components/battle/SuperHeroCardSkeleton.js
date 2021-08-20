import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',

    },
  },
  heroContent: {
    padding: theme.spacing(0, 0, 0),
    marginTop: '30px;',
  },
  media: {
    height: 450,
    [theme.breakpoints.down('sm')]: {
      height: 220,

    },
  },
  heroTitle: {
    marginTop: '10px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
      marginLeft: '5px',
      fontSize: '17px',
      display: 'block',

    },
  },
  heroImage: {
    maxWidth: '450px',
    maxHeight: '450px',
    height: '450px',
    [theme.breakpoints.down('sm')]: {
      height: '220px',
    },
  },
  heroTables: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heroTable: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
    },
  },
  mainContent: {
    width: '100%',
    backgroundColor: '#fafafa',
    margin: 0,
    padding: 0,
  },
  table: {
    minWidth: 150,
    [theme.breakpoints.down('sm')]: {
      minWidth: 0,
    },
  },
}));

function createData(key, value) {
  return { key, value };
}

const StatTable = ({ rows }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {/* <caption>A basic table example with a caption</caption>  */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SuperHeroCardSkeleton = () => {
  const classes = useStyles();

  const appearanceRows = [
    createData('gender', ''),
    createData('race', ''),
    createData('hgt/wgt', ''),
    createData('eyes', ''),
    createData('hair', ''),
    createData('pub', ''),
  ];

  const powerstatRows = [
    createData('combat', ''),
    createData('durability', ''),
    createData('intelligence', ''),
    createData('speed', ''),
    createData('strength', ''),
    createData('alignment', ''),
  ];

  const otherstatRows = [
    createData('full name', ''),
    createData('POB', ''),
    createData('occupation', ''),
    createData('base', ''),
  ];

  return (
    <Card className={classes.root}>
      <div>
        <Typography className={classes.heroTitle} gutterBottom variant="h5" component="h2">
          <Skeleton animation="wave" variant="rect" width="96%" />
        </Typography>

        <Skeleton animation="wave" variant="rect" className={classes.media} />

      </div>
      <CardContent className={classes.mainContent}>
        <div className={classes.heroTables}>
          <div className={classes.heroTable}>
            <StatTable rows={powerstatRows} />
          </div>
          <div className={classes.heroTable}>
            <StatTable rows={appearanceRows} />
          </div>
        </div>

        <div style={{ width: 'auto' }}>
          <StatTable rows={otherstatRows} />
        </div>

      </CardContent>
    </Card>
  );
};

export default SuperHeroCardSkeleton;
