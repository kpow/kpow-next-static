import React from 'react';
import Grid from '@material-ui/core/Grid';

import ProjectCard from '@components/projects/ProjectCard';

export default function ProjectList({ projects }) {
  const displayProjects = projects.slice(2, 6);

  if (projects === 'undefined') return null;

  return (
    <div>
      {!displayProjects
        && <div>No posts!</div>}

      <Grid container spacing={4}>
        {displayProjects
        // eslint-disable-next-line max-len
        && displayProjects.map((item) => <ProjectCard project={item} key={item.frontmatter.title} />)}
      </Grid>
    </div>
  );
}
