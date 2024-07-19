// material-ui
import { Grid, Container } from '@mui/material';
//import { gridSpacing } from 'store/constant';
import { LinearProgress, FormHelperText } from '@mui/material';
import SubHeader from 'layout/MainLayout/SubHeader';
import logo from 'assets/images/comunity_image/comuniverse.png';
import CommunityCard from './components/CommunityCard.js';
import image from 'assets/images/comunity_image/sunset.jpg';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import AuthenticatedAPIClient from 'services/api';
// ==============================|| SAMPLE PAGE ||============================== //

const MyCommunities = () => {
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
      <SubHeader title="Communities" />
      {loading && <LinearProgress value={80} />}
      {!loading && (
        <Container sx={{ margin: '0px', maxWidth: '2000px !important' }}>
          <Grid container spacing={3}>
            {communities.map((community) => (
              <Grid item key={community.slug} xs={12} sm={6} md={4}>
                <CommunityCard
                  logoUrl={logo}
                  imageUrl={image}
                  imageText="Agha Khan Youth and Sports Board"
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

export default MyCommunities;
