import React, { useState, useEffect } from 'react';
import { Grid, Container, LinearProgress, FormHelperText } from '@mui/material';
import CommunityCard from './components/CommunityCard';
import SubHeader from 'layout/MainLayout/SubHeader';
import AuthenticatedAPIClient from 'services/api';
import { Box } from '@mui/system';
import AddCommunityDialog from './components/AddCommunityDialog';

const AllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await AuthenticatedAPIClient.get('/api/v1/communities/public/');
      setCommunities(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError('Failed to fetch communities. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <SubHeader title="Communities" />
      <AddCommunityDialog/>
      </Box>
      {loading && <LinearProgress value={80} />}
      {!loading && (
        <Container sx={{ margin: '0px', maxWidth: '2000px !important' }}>
          <Grid container spacing={3}>
            {communities.map((community) => (
              <Grid item key={community.slug} xs={12} sm={6} md={4}>
                <CommunityCard
                  title={community.name}
                  area={`${community.area_details.name}, ${community.area_details.city}`}
                  description={community.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {error && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{error}</FormHelperText>
        </Box>
      )}
    </>
  );
};

export default AllCommunities;
