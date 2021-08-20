import React from 'react';
import Link from 'next/link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ImageGridList({ projects }) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const colCount = matchesSmall ? 4 : 1;
  const cellHeight = matchesSmall ? 150 : 225;
  const displayProjects = matchesSmall ? projects : projects.slice(0, 5);

  return (
    <div className={classes.root}>
      <GridList cellHeight={cellHeight} className={classes.gridList} cols={colCount}>
        {displayProjects.map((item) => (

          // eslint-disable-next-line max-len
          <GridListTile key={item.frontmatter.title} cols={item.frontmatter.col || 1} rows={item.frontmatter.row || 1}>
            <img src={item.frontmatter.thumb_image} alt={item.frontmatter.title} />
            <Link href={{ pathname: `/projects/${item.slug}` }}>
              <GridListTileBar title={item.frontmatter.title} />
            </Link>
          </GridListTile>

        ))}
      </GridList>
    </div>
  );
}
