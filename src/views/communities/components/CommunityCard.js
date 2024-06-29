import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const CommunityCard = ({ title, area, description }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" component="div" fontWeight="bold">
          <span style={{ fontWeight: 'normal' }}>{area}</span>
        </Typography>
        <br></br>
        <Typography variant="h5" component="div" fontWeight="bold" mb={1}>
          Description:
        </Typography>
        <Typography
          variant="body2" component="div" mb={2} 
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
          <Button variant="contained">REGISTER</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
CommunityCard.propTypes = {
  title: PropTypes.string,
  area: PropTypes.string,
  description: PropTypes.string
};

export default CommunityCard;
