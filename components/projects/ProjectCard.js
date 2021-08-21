import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
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
  cardDescription: {
    fontSize: '.9rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
  },
}));

// eslint-disable-next-line prefer-arrow-callback
const ProjectCard = React.memo(function ProjectCard(props) {
  const classes = useStyles();
  return (
    <Link href={{ pathname: `/projects/${props.project.slug}` }}>
      <Grid container item key={props.project.slug} xs={12} sm={6} md={3}>
        <Card className={classes.card}>

          <CardMedia
            className={classes.cardMedia}
            image={props.project?.frontmatter?.thumb_image}
            title={props.project?.frontmatter?.title}
          />

          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" className={classes.cardTitle} component="h2">
              {props.project?.frontmatter?.title}
            </Typography>
            <Typography component="p" className={classes.cardDescription}>
              {props.project?.frontmatter?.excerpt}
            </Typography>
          </CardContent>

        </Card>
      </Grid>
    </Link>
  );
});

export default ProjectCard;
