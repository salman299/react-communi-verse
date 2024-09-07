import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import ImageAvatar from './ImageAvatar';
import useDialog from 'hooks/useDialog';
import { showSnackbar } from 'store/snackbarSlice';
import { useDispatch } from 'react-redux';
import AuthenticatedAPIClient from 'services/api';

const CommunityCard = memo(
  ({ slug, title, description, imageUrl, logoUrl, area, color, isMember, isRequested = false, isDenied = false }) => {
    const [localIsRequested, setLocalIsRequested] = useState(isRequested);
    const { open, handleOpen, handleClose } = useDialog();
    const dispatch = useDispatch();

    const joinCommunity = useCallback(async () => {
      try {
        const response = await AuthenticatedAPIClient.post(`/api/v1/public/communities/${slug}/join`);
        if (response.status !== 201) throw new Error('Failed to join community');

        setLocalIsRequested(true);
        dispatch(showSnackbar({ message: 'Join request submitted successfully!', severity: 'success' }));
        handleClose();
      } catch (error) {
        console.error('Error joining community:', error);
        dispatch(showSnackbar({ message: 'Failed to submit join request. Please try again.', severity: 'error' }));
      }
    }, [slug, dispatch, handleClose]);

    const cardImageStyle = {
      width: '100%',
      opacity: 0.6,
      height: '120px',
      minHeight: '120px'
    };

    const titleStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      color: 'white',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      textAlign: 'left',
      padding: '16px',
      fontSize: { xs: '20px', sm: '29px' }
    };

    const descriptionStyle = {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      WebkitLineClamp: 3,
      textOverflow: 'ellipsis'
    };

    return (
      <Card sx={{ overflow: 'hidden', height: '100%' }}>
        <Box sx={{ backgroundColor: color, position: 'relative', pb: 0 }}>
          <img src={imageUrl} alt={`${title} cover`} style={cardImageStyle} />
          <Typography variant="h4" component="div" sx={titleStyle}>
            {title}
          </Typography>
          <ImageAvatar imageUrl={logoUrl} title={title} />
        </Box>

        <CardContent>
          <Typography variant="h6" component="div" fontWeight="bold" gutterBottom fontStyle="italic">
            {area}
          </Typography>
          <Typography variant="h5" component="div" fontWeight="bold" mb={1}>
            Description:
          </Typography>
          <Typography variant="body2" component="div" mb={2} sx={descriptionStyle}>
            {description}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {localIsRequested && <Chip label="Requested" variant="filled" />}
              {isDenied && <Chip label="Denied" variant="filled" size="small" />}
            </Box>
            <Box>
              {!isMember && (
                <Button disabled={localIsRequested || isDenied} variant="contained" onClick={handleOpen}>
                  Join Now
                </Button>
              )}
              {isMember && <Button variant="outlined">View</Button>}
            </Box>
          </Box>
        </CardContent>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Community Join Request</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are requesting to join <strong>{title}</strong>. The community admin will review your request. You will be notified once
              your request is approved.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={joinCommunity} autoFocus>
              Confirm Request
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
);

CommunityCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  area: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isMember: PropTypes.bool.isRequired,
  isRequested: PropTypes.bool,
  isDenied: PropTypes.bool
};

export default CommunityCard;
