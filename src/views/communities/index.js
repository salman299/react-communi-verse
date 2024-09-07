import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, LinearProgress, FormHelperText, Divider } from '@mui/material';
import CommunityCard from './components/CommunityCard';
import SubHeader from 'layout/MainLayout/SubHeader';
import AuthenticatedAPIClient from 'services/api';
import { Box } from '@mui/system';
import image from 'assets/images/comunity_image/community.jpg';
import { gridSpacing } from 'store/constant';

const AllCommunities = () => {
  const theme = useTheme();
  const [status, setStatus] = useState({ communities: [], loading: true, error: '' });

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await AuthenticatedAPIClient.get('/api/v1/public/communities/');
        setStatus({ communities: response.data.results, loading: false, error: '' });
      } catch (err) {
        console.error('Error fetching communities:', err);
        setStatus({ communities: [], loading: false, error: 'Failed to fetch communities. Please try again.' });
      }
    };
    fetchCommunities();
  }, []);

  const { communities, loading, error } = status;

  return (
    <>
      <Container>
        <SubHeader title="Communities" />
        <Divider sx={{ borderColor: theme.palette.grey[400], mb: gridSpacing }} />
        {loading ? (
          <LinearProgress value={80} />
        ) : (
          <Grid container spacing={gridSpacing}>
            {communities.map((community) => (
              <Grid item key={community.slug} xs={12} sm={6} md={4}>
                <CommunityCard
                  slug={community.slug}
                  logoUrl={community.logo}
                  imageUrl={community.cover_image ?? image}
                  title={community.name}
                  area={community.area_name}
                  description={community.description}
                  color={community.color ?? '#ffffff'}
                  isMember={community.is_member}
                  isRequested={community.join_status === 'pending'}
                  isDenied={community.join_status === 'denied'}
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

export default AllCommunities;
