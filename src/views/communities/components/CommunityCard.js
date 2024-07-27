import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ImageAvatar from './ImageAvatar';

const CommunityCard = ({ title, description, imageUrl, logoUrl, area, color, is_member }) => {
  return (
    <Card sx={{ overflow: 'hidden', height: '100%' }}>
      <Box sx={{ backgroundColor: color, position: 'relative', pb: 0 }}>
        <img src={imageUrl} alt="Event" style={{ width: '100%', opacity: 0.6, height: '120px' }} />
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
        <ImageAvatar imageUrl={logoUrl} title={title} />
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
          {!is_member && <Button variant="contained">Join Now</Button>}
          {is_member && <Button variant="outlined">View</Button>}
        </Box>
      </CardContent>
    </Card>
  );
};

CommunityCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  area: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  is_member: PropTypes.bool.isRequired
};

export default CommunityCard;
