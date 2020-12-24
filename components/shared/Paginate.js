import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const StarPaginate = ({page, latestData, isFetching, howMany, setPage, total}) =>{

    const totalPages = Math.round(total/howMany);
    let paginateLabel = `${page+1} of ${totalPages}`

    if(!totalPages){
      paginateLabel = `${page+1}`
    }

    return(
        <Box>
          <Button
            size="small"
            children="Prev" 
            variant="outlined" 
            style={{backgroundColor:'#fafafa'}}
            startIcon={<NavigateBeforeIcon />}
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 0}
          />
          <span style={{margin:'10px'}}>
            <Chip size="medium" label={paginateLabel}/>
          </span>
          <Button
            size="small" 
            children="Next"
            variant="outlined" 
            style={{backgroundColor:'#fafafa'}}
            endIcon={<NavigateNextIcon />}
            onClick={() => setPage(old => (!latestData || !latestData.hasMore ? old : old + 1)) }
            disabled={!latestData || !latestData.hasMore}
          />
        </Box>
    )
}

export default StarPaginate