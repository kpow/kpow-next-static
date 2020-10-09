import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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

  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList} cols={4}>
        {projects.map((item) => (
             
          <GridListTile key={item.frontmatter.title} cols={item.frontmatter.col || 1} rows={item.frontmatter.row || 1}>
            <img src={item.frontmatter.thumb_image} alt={item.frontmatter.title} />
            <GridListTileBar
              title={item.frontmatter.title}
              actionIcon={
                <Link href={{ pathname: `/projects/${item.slug}` }}>    
                    <IconButton aria-label={`info about ${item.frontmatter.title}`} className={classes.icon}>
                        <InfoIcon />
                    </IconButton>
                </Link>
              }
            />
          </GridListTile>
          
        ))}
      </GridList>
    </div>
  );
}
