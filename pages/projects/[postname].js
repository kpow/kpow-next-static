import React from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Layout from '@components/Layout';
import Title from '@components/shared/Title';
import getSlugs from '@utils/getSlugs';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  projectContent: {
    display: 'flex',
    maxWidth: '700px',
    margin: '0 auto',
  },

}));

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  const classes = useStyles();

  if (!frontmatter) return <></>;

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <Paper style={{ marginTop: 0 }}>
        <Box marginX={3}>
          <Title>
            {frontmatter.title}
          </Title>
        </Box>
        {frontmatter.hero_image && (
          <img
            src={frontmatter.hero_image}
            width="100%"
            className="hero"
            alt={frontmatter.title}
          />
        )}
        <Box marginX={3} className={classes.projectContent}>
          <Typography variant="body2" color="textSecondary" component="span">
            <ReactMarkdown source={markdownBody} />
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText inset primary="Inbox" />
            </ListItem>
            <ListItem>
              <ListItemText inset primary="Drafts" />
            </ListItem>
          </List>
        </Box>
        <div className="back">
          ←
          {' '}
        </div>
      </Paper>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;

  const content = await import(`../../projects/${postname}.md`);
  const config = await import('../../siteconfig.json');
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

// used by next for static render
export async function getStaticPaths() {
  // eslint-disable-next-line arrow-body-style
  const blogSlugs = ((context) => {
    return getSlugs(context);
  })(require.context('../../projects', true, /\.md$/));

  const paths = blogSlugs.map((slug) => `/projects/${slug}`);

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  };
}
