import Head from 'next/head';
import { Box, Container, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BigFooter from '@components/BigFooter';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from './Header';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  mainFeaturedPost: {
    position: 'relative',
    marginBottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  bg: {
    backgroundColor: '#fafafa',
    opacity: 0.1,
    backgroundImage:
      'linear-gradient(135deg, #7c7c7c 25%, transparent 25%), linear-gradient(225deg, #7c7c7c 25%, transparent 25%), linear-gradient(45deg, #7c7c7c 25%, transparent 25%), linear-gradient(315deg, #7c7c7c 25%, #fafafa 25%)',
    backgroundPosition: '19px 0, 19px 0, 0 0, 0 0',
    backgroundSize: '19px 19px',
    backgroundRepeat: 'repeat',
  },
}));

export default function Layout({ children, pageTitle, description }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const paperPadding = matches ? 4 : 0;
  const [pageMode, setPageMode] = React.useState('light');

  const handleMode = (mode) => {
    setPageMode(mode);
    localStorage.setItem('pageMode', mode);
  };

  React.useEffect(() => {
    setPageMode(localStorage.getItem('pageMode'));
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description} />
        <link rel="icon" href="../static/icon.png" />
        <title>{pageTitle}</title>
        <script src="https://apps.elfsight.com/p/platform.js" defer />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-T8FH7QS');
                    ` }}
        />
      </Head>
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T8FH7QS" height="0" width="0" title="gtm" style={{ display: 'none', visibility: 'hidden' }} />
      </noscript>
      <Header pageMode={pageMode} handleMode={handleMode} />
      <Paper className={classes.mainFeaturedPost} style={{ marginTop: '40px', backgroundImage: 'url(https://source.unsplash.com/1200x300/?space,nasa)' }}>
        <div className={classes.overlay} />
      </Paper>
      <div
        style={{
          backgroundColor: '#fafafa',
          backgroundImage: 'linear-gradient(30deg, #ebebeb 12%, transparent 12.5%, transparent 87%, #ebebeb 87.5%, #ebebeb), linear-gradient(150deg, #ebebeb 12%, transparent 12.5%, transparent 87%, #ebebeb 87.5%, #ebebeb), linear-gradient(30deg, #ebebeb 12%, transparent 12.5%, transparent 87%, #ebebeb 87.5%, #ebebeb), linear-gradient(150deg, #ebebeb 12%, transparent 12.5%, transparent 87%, #ebebeb 87.5%, #ebebeb), linear-gradient(60deg, #ebebeb77 25%, transparent 25.5%, transparent 75%, #ebebeb77 75%, #ebebeb77), linear-gradient(60deg, #ebebeb77 25%, transparent 25.5%, transparent 75%, #ebebeb77 75%, #ebebeb77)',
          backgroundSize: '38px 67px',
          backgroundPosition: '0 0, 0 0, 19px 33px, 19px 33px, 0 0, 19px 33px',
        }}
        className={pageMode}
      >
        <div>
          <Container maxWidth="lg" className={classes.mainContent}>
            <Box component="main" mx={paperPadding}>
              {children}
            </Box>
          </Container>
          <div className="footer-image">
            <Paper className={classes.mainFeaturedPost} style={{ marginTop: '40px', backgroundImage: 'url(https://source.unsplash.com/1200x300/?space,nasa)' }}>
              <div className={classes.overlay} />
            </Paper>
          </div>
        </div>
        <BigFooter />
      </div>
    </>
  );
}
