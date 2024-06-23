// material-ui
import { Grid, Container } from '@mui/material';
import { gridSpacing } from 'store/constant';

import EventCard from './EventCard';
import SubHeader from 'layout/MainLayout/SubHeader';

// ==============================|| SAMPLE PAGE ||============================== //

const AllCommunities = () => (
  <>
    <SubHeader title="Communities"></SubHeader>
    <Container sx={{ padding: '20px' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6} md={4}>
          <EventCard
            title="Treasure Hunt"
            date="16-09-2023"
            organizer="Mubarak Scout"
            lead="Ali Salman Nawaz"
            description="Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <EventCard
            title="Treasure Hunt"
            date="16-09-2023"
            organizer="Mubarak Scout"
            lead="Ali Salman Nawaz"
            description="Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <EventCard
            title="Treasure Hunt"
            date="16-09-2023"
            organizer="Mubarak Scout"
            lead="Ali Salman Nawaz"
            description="Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <EventCard
            title="Treasure Hunt"
            date="16-09-2023"
            organizer="Mubarak Scout"
            lead="Ali Salman Nawaz"
            description="Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          />
        </Grid>
      </Grid>
    </Container>
  </>
);

export default AllCommunities;
