/* eslint-disable prefer-template */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '300px',
    minHeight: '250px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#999',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#999',
    border: '3px solid #666',
  },
  fullContent: {
    '& img': {
      maxWidth: '100%',
    },
  },
}));

export default function BookCard({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // const publishedDate = parseISO(props.article?.published)
  // const formatDate = format(publishedDate, "M.d.yyyy" )

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container item xs={6} sm={6} md={2}>
      <Card className={classes.root} style={{ backgroundImage: 'url(' + article.book.image_url._text + ')' }}>
        <div>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {/* {props.article?.title} */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* {props.article?.summary} */}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          <Button
            size="small"
            variant="contained"
            target="_blank"
            // href={props.article.url}
            endIcon={<OpenInNewIcon />}
          >
            gr
          </Button>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Full Text:</Typography>
            <Typography
              paragraph
              className={classes.fullContent}
              color="textSecondary"
              dangerouslySetInnerHTML={{ __html: article.book.description._text }}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
