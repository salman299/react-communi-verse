import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import convert from 'color-convert';

const Input = styled('input')({
  display: 'none'
});

const CoverImageUploader = ({ imageUrl, handleUpload, overlayColor = '#FFFFFF' }) => {
  const [r, g, b] = convert.hex.rgb(overlayColor);
  const rgbaColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '100%',
        height: '250px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <label htmlFor="cover-image-upload">
        <Input accept="image/png, image/jpeg, image/gif" id="cover-image-upload" type="file" onChange={handleUpload} />
        <IconButton color="primary" aria-label="upload picture" component="span" sx={{ mb: 1, zIndex: 1 }}>
          <CloudUploadIcon sx={{ fontSize: 48, color: imageUrl ? 'white' : 'inherit' }} />
        </IconButton>
      </label>
      <Typography variant="body1" sx={{ textAlign: 'center', zIndex: 1, color: imageUrl ? 'white' : 'inherit' }}>
        {imageUrl ? 'Click to Update the Cover Image' : 'Click to Upload the Cover Image'}
      </Typography>

      {imageUrl && (
        <>
          <Box
            component="img"
            src={imageUrl}
            alt="Uploaded cover"
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: rgbaColor, // Semi-transparent black overlay
              opacity: 2, // Start hidden
              transition: 'opacity 0.3s ease-in-out', // Smooth transition
              borderRadius: '8px'
            }}
          />
        </>
      )}
    </Box>
  );
};

CoverImageUploader.propTypes = {
  imageUrl: PropTypes.string,
  handleUpload: PropTypes.func.isRequired,
  overlayColor: PropTypes.string
};

export default CoverImageUploader;
