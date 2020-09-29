import Link from 'next/link'
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Layout from 'components/Layout';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
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
    fontSize:'.9rem',
  }
}));

const cards = [1, 2, 3, 4];

export default function PostList({ posts }) {
  const classes = useStyles();
  const displayPost = posts.slice(0, 4)
  
  if (posts === 'undefined') return null

  return (
    <div>
      {!displayPost && <div>No posts!</div>}

      <Grid container spacing={4}>
        {displayPost &&
          displayPost.map((post) => {
            return (
            <Link href={{ pathname: `/post/${post.slug}` }}>  
              <Grid container item key={post.slug} xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={post?.frontmatter?.title}
                  />

                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post?.frontmatter?.title}
                    </Typography>
                    <Typography component="p" className={classes.cardDescription}>
                      {post?.frontmatter?.excerpt}
                    </Typography>
                  </CardContent>
              
                </Card>
              </Grid>
            </Link>
            )
          })}
      </Grid>
    </div>
  )
}
