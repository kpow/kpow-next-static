import React from 'react';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const BookPaginate = ({page, latestData, isFetching, howMany, setPage}) =>{
  if(howMany > 6){
    return(
        // {isFetching ? 
        //   <Chip size="small" label='loading . . .'/>
        // : null}{' '}
        <div style={{textAlign:'right', margin:'20px 0 20px', minWidth:'225px'}}>
          <Button
            size="small"
            children="Prev" 
            variant="outlined" 
            startIcon={<NavigateBeforeIcon />}
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 0}
          />
          <span style={{margin:'10px'}}>
            <Chip size="medium" label={page + 1}/>
          </span>
          <Button
            size="small" 
            children="Next"
            variant="outlined" 
            endIcon={<NavigateNextIcon />}
            onClick={() => setPage(old => (!latestData || !latestData.hasMore ? old : old + 1)) }
            disabled={!latestData || !latestData.hasMore}
          />
        </div>
    )
  }else{
    return null
  }
}

export default BookPaginate