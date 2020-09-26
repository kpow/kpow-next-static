import Head from 'next/head'
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import BigFooter from '@components/BigFooter';

import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, pageTitle, description, ...props }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <title>{pageTitle}</title>
      </Head>
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <Typography component="div">
            {children}
          </Typography>
         
        </Container>
        <BigFooter />  
      </React.Fragment>      
    </>
  )
}
