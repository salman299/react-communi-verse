import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const EventCard = ({ title, date, organizer, lead, description }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="body2" component="div" fontWeight="bold" align="right">
          Date: {date}
        </Typography>
        <Typography variant="h3" component="div" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" component="div" fontWeight="bold">
          Organized by: <span style={{ fontWeight: 'normal' }}>{organizer}</span>
        </Typography>
        <Typography variant="subtitle2" component="div" fontWeight="bold" mb={2}>
          Lead by: <span style={{ fontWeight: 'normal' }}>{lead}</span>
        </Typography>
        <Typography variant="h5" component="div" fontWeight="bold" mb={1}>
          Description:
        </Typography>
        <Typography variant="body2" component="div" mb={2}>
          {description}
        </Typography>
        <Box textAlign="right">
          <Button variant="contained">REGISTER 1</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
EventCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  organizer: PropTypes.string,
  lead: PropTypes.string,
  description: PropTypes.string
};

export default EventCard;
