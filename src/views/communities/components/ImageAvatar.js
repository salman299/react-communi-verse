import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ImageAvatar = ({ imageUrl, title, backgroundColor }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: -30,
        right: 16,
        width: { xs: 70, sm: 60 },
        height: { xs: 70, sm: 60 },
        borderRadius: '50%',
        border: '2px solid white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor ?? 'gray',
        fontSize: { xs: 30, sm: 30 },
        color: 'white'
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt="Logo"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%'
          }}
        />
      ) : (
        title.charAt(0)
      )}
    </Box>
  );
};

ImageAvatar.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default ImageAvatar;
