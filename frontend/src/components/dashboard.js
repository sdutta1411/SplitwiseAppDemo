import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { palette } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import SettleUp from '../modals/settleUp';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 100,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  paperModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [showSettleUp, setshowSettleUp] = useState(false);
  const [open, setOpen] = useState(false);

  const rand = () => {
    return Math.round(Math.random() * 20) - 10;
  };

  const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };

  const [modalStyle] = useState(getModalStyle);

  const setshowSettleUpModal = e => {
    setshowSettleUp(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">Settle Up</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <Button>Save</Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box bgcolor="success.main" color="success.contrastText" p={2}>
            <Avatar>D</Avatar>
            <h1>Dashboard</h1>
            <Button onClick={e => { handleOpen() }}>Settle Up</Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><Box color="success.main">Total Balance</Box></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><Box color="success.main">You Owe</Box></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><Box color="success.main">You are Owed</Box></Paper>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {/* <SettleUp show={showSettleUp} /> */}
    </div>
  );
}

export default Dashboard;