import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, LinearProgress, FormHelperText, Divider } from '@mui/material';
import CommunityCard from './components/CommunityCard';
import SubHeader from 'layout/MainLayout/SubHeader';
import AuthenticatedAPIClient from 'services/api';
import { Box } from '@mui/system';
import image from 'assets/images/comunity_image/community.jpg';
import { gridSpacing } from 'store/constant';

const MyCommunities = () => {
  const theme = useTheme();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await AuthenticatedAPIClient.get('/api/v1/public/communities/');
      setCommunities(response.data.results);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError('Failed to fetch communities. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <SubHeader title="My Communities" />
        <Divider sx={{ borderColor: theme.palette.grey[400], mb: gridSpacing }} />
        {loading && <LinearProgress value={80} />}
        {!loading && (
          <Grid container spacing={gridSpacing}>
            {communities.map((community) => (
              <Grid item key={community.slug} xs={12} sm={6} md={4}>
                <CommunityCard
                  logoUrl={community.logo}
                  imageUrl={community.cover_image ?? image}
                  title={community.name}
                  area={community.area_name}
                  description={community.description}
                  color={community.color ?? '#ffffff'}
                  is_member={community.is_member}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      {error && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{error}</FormHelperText>
        </Box>
      )}
    </>
  );
};

export default MyCommunities;
