import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ProjectCard from '@components/projects/ProjectCard'

const useStyles = makeStyles((theme) => ({ }));

export default function ProjectList({ projects }) {
  const classes = useStyles();
  const displayProjects = projects.slice(2, 6)
  
  if (projects === 'undefined') return null

  return (
    <div>
      {!displayProjects && <div>No posts!</div>}

      <Grid container spacing={4}>
        {displayProjects &&
          displayProjects.map((item) => {
            return ( <ProjectCard project={item} key={item.frontmatter.title}/> )
          })}
      </Grid>
    </div>
  )
}
