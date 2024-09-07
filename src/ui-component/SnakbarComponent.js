import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert, Button } from '@mui/material';
import { hideSnackbar } from 'store/snackbarSlice';

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={
        <Button color="inherit" onClick={handleClose}>
          Close
        </Button>
      }
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
