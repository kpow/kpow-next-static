
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Title from '@components/shared/Title';

function ContactModal() {
  const [open, setOpen] = useState(false);
  
  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <React.Fragment>
      
        <Button variant="contained" size="small"  color="primary" onClick={handleClickOpen}>
          contact
        </Button>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
          <div style={{width:'400px'}}>  
            <DialogTitle id="form-dialog-title">
              <Title>
                What's Up :)
              </Title>  
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Send me a anything, but spam :( 
              </DialogContentText>
              <form name="contact" method="POST" action="/?success=true" netlify-honeypot="bot-field" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
           
                <TextField fullWidth id="name" name="name" label="Name" variant="filled" />
                <br></br>
                <br></br>
                <TextField fullWidth id="email" name="email" label="Email" variant="filled" />
                <br></br>
                <br></br>
                <TextField multiline fullWidth id="message" name="message" label="Message" variant="filled" />
                <br></br>
                <br></br>
                <Button type="submit" variant="contained" size="large"  color="primary" >
                  send
                </Button>
                <br></br>
                <br></br>  
              
            </form>
            </DialogContent>
      </div>
      </Dialog>
    </React.Fragment >
  );
}

export default ContactModal;
