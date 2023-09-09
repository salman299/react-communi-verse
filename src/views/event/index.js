import { Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import EventCard from 'views/event/EventCard';

const Event = () => (
  <MainCard title="Activities/Events">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6} md={4}>
        <SubCard title="Treasure Hunt">
          <EventCard
            eventName="Sample Event"
            eventDescription="This is the event for engaging Scouts in different activities"
            eventHost="Sample Organization"
            eventDate="2023-09-15"
            eventVenue="Sample Venue"
          />
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SubCard title="Treasure Hunt">
          <EventCard
            eventName="Sample Event"
            eventDescription="This is the event for engaging Scouts in different activities"
            eventHost="Sample Organization"
            eventDate="2023-09-15"
            eventVenue="Sample Venue"
          />
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SubCard title="Treasure Hunt">
          <EventCard
            eventName="Sample Event"
            eventDescription="This is the event for engaging Scouts in different activities"
            eventHost="Sample Organization"
            eventDate="2023-09-15"
            eventVenue="Sample Venue"
          />
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default Event;
