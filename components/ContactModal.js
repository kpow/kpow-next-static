
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden'

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
          contact kpow
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
                Send us a comment!
              </DialogContentText>
              <form name="contact" method="POST" action="/?success=true" netlify-honeypot="bot-field" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <p>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
              </p>
              <p>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
              </p>
              <p>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message"></textarea>
              </p>
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
