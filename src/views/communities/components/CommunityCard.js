import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CommunityCard = ({ title, description, imageUrl, logoUrl, imageText }) => {
  const randomColor = getRandomColor();
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ backgroundColor: randomColor, position: 'relative', pb: 0 }}>
        <img src={imageUrl} alt="Event" style={{ width: '100%', height: 'auto', opacity: 0.6 }} />
        <Typography
          variant="h4"
          component="div"
          sx={{
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
            fontSize: '29px'
          }}
        >
          {imageText}
        </Typography>
        <Box
          component="img"
          src={logoUrl}
          alt="Logo"
          sx={{
            position: 'absolute',
            bottom: -30,
            right: 16,
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '2px solid white'
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" fontWeight="bold" mb={1}>
          Description:
        </Typography>
        <Typography
          variant="body2"
          component="div"
          mb={2}
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 3,
            textOverflow: 'ellipsis'
          }}
        >
          {description}
        </Typography>
        <Box textAlign="right">
          <Button variant="contained">Join Now</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

CommunityCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  imageText: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default CommunityCard;
