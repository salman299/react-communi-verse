import React from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';

const EventCard = ({ eventName, eventDescription, eventHost, eventDate, eventVenue }) => {
  return (
    <Card className="event-card"> {/* Apply the custom SCSS class */}
      <CardContent>
        <Typography variant="h6" className="card-title" align="center"> {/* Apply the custom SCSS class */}
          {eventName}
        </Typography>
        <Typography variant="body2" className="card-detail" align="center"> {/* Center-align */}
          {eventDescription}
        </Typography>
        <Typography variant="body2" className="card-detail" align="center"> {/* Apply the custom SCSS class */}
          Event Host (Organization): {eventHost}
        </Typography>
        <Typography variant="body2" className="card-detail" align="center"> {/* Apply the custom SCSS class */}
          Event Date: {eventDate}
        </Typography>
        <Typography variant="body2" className="card-detail" align="center"> {/* Apply the custom SCSS class */}
          Event Venue: {eventVenue}
        </Typography>
        <Button variant="contained" color="primary" className="register-button"> {/* Apply the custom SCSS class */}
          Register
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
