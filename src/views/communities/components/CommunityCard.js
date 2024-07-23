import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Button, Avatar } from '@mui/material';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CommunityCard = ({ title, description, imageUrl, logoUrl, area }) => {
  const randomColor = getRandomColor();
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
      <Box sx={{ backgroundColor: randomColor, position: 'relative', pb: 0 }}>
        {imageUrl ? (
          <img src={imageUrl} alt="Event" style={{ width: '100%', height: 'auto', opacity: 0.6 }} />
        ) : (
          <Avatar
            sx={{
              width: '100%',
              height: { xs: 150, sm: 200 },
              fontSize: { xs: '50px', sm: '80px' },
              backgroundColor: randomColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {title.charAt(0)}
          </Avatar>
        )}
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
            fontSize: { xs: '20px', sm: '29px' }
          }}
        >
          {title}
        </Typography>
        <Box
          component="img"
          src={logoUrl}
          alt="Logo"
          sx={{
            position: 'absolute',
            bottom: -30,
            right: 16,
            width: { xs: 40, sm: 60 },
            height: { xs: 40, sm: 60 },
            borderRadius: '50%',
            border: '2px solid white'
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom fontStyle="italic">
          {area}
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  logoUrl: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired
};

export default CommunityCard;
