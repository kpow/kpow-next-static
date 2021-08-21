import React from 'react';
import { format, parseISO } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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

export default function StarCardBig({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const publishedDate = parseISO(article?.published);
  const formatDate = format(publishedDate, 'M.d.yyyy');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <div>
          <CardHeader
            avatar={
              (
                <Avatar className={classes.avatar}>
                  <img alt="favicon" src={`https://api.faviconkit.com/${article?.site_url}/35`} />
                </Avatar>
              )
          }
            title={article?.site_url}
            subheader={formatDate}
          />
          <CardMedia
            className={classes.media}
            id="starImage"
            image={article?.lead_image_url}
            title={article?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {article?.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {article?.summary}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          <Button
            size="small"
            variant="contained"
            target="_blank"
            href={article.url}
            endIcon={<OpenInNewIcon />}
          >
            go to article
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
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
