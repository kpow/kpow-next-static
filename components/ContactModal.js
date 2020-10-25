
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ContactModal(props) {
  const { classes } = props;
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
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Send me a comment!
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
           
              <p>
                <button type="submit">Send</button>
              </p>
            </form>
            </DialogContent>
          </React.Fragment>
      
      </Dialog>
    </React.Fragment >
  );
}

export default ContactModal;
