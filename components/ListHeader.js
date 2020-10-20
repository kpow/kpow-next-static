import React from 'react';
import Link from 'next/link';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paginate from 'components/Paginate';
import Hero from 'components/Hero';
import Title from 'components/Title';
import useMediaQuery from '@material-ui/core/useMediaQuery';


function ListHeader({howMany, 
                     resolvedData, 
                     latestData, 
                     isFetching, 
                     page, 
                     setPage, 
                     seeMore, 
                     title, 
                     heroContent, 
                     totalItemsLabel }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const flexDirect = matches ? 'row' : 'column';
  return (
    <>
      <Box>
        {/* this condition is for the home page list i need to refine this condition */}
        { howMany <= 5 ? 
            <Box 
            style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} 
            flexDirection={flexDirect}
            >
              <Box style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                <Title> {title} </Title> 
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {resolvedData?.totalItems}{' '}{totalItemsLabel}
                </Typography>
              
              </Box>
              <Box>  
                <Link href={seeMore}>
                  <Button
                    size="small" 
                    variant="outlined" 
                    endIcon={<NavigateNextIcon />}
                    children="see more"
                  />
                </Link> 
              </Box>                
            </Box>
            
          : <>
              {/* this condition is for the listing */}  
              <Box
                style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} 
                flexDirection={flexDirect}
              >
                  <Box style={{display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    {page==0 ? 
                      <Hero 
                        title={`${title} feed`}
                        content={heroContent}
                      />
                    : <> 
                      <Title> {title} </Title> 
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {resolvedData?.totalItems}{' '}{totalItemsLabel}) 
                      </Typography> 
                      </>
                    }
                  </Box>
                  <Box style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}} >
                    {page==0 ? 
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {resolvedData?.totalItems}{' '}{totalItemsLabel} 
                      </Typography> 
                    : <> </>}
                    <Paginate 
                      page={page}
                      howMany={howMany}
                      total={resolvedData?.totalItems} 
                      latestData={latestData} 
                      isFetching={isFetching}
                      setPage={setPage}
                    />
                    
                  </Box> 
                </Box>
            </>
          }  
      </Box>
    </>
  )
}

export default ListHeader
