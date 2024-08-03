import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  LinearProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TablePagination,
  Button,
  TextField,
  MenuItem,
  Alert,
  Chip
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import SubHeader from 'layout/MainLayout/SubHeader';
import AuthenticatedAPIClient from 'services/api';
import AddCommunity from './components/AddCommunity';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';

const ManageCommunities = () => {
  const theme = useTheme();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCommunities, setTotalCommunities] = useState(0);
  const [search, setSearch] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { areas } = useSelector((state) => state.areaCity);
  console.log(areas);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const fetchCommunities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await AuthenticatedAPIClient.get(`/api/v1/communities/`, {
        params: {
          page: page + 1,
          page_size: rowsPerPage,
          search: search,
          area: filterArea
        }
      });
      setCommunities(response.data.results);
      setTotalCommunities(response.data.count);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError('Failed to fetch communities. Please try again.');
      setLoading(false);
    }
  }, [page, rowsPerPage, search, filterArea]);

  useEffect(() => {
    fetchCommunities();
  }, [page, rowsPerPage, search, filterArea, fetchCommunities]);

  const handleUpdate = (community) => {
    console.log('Update community:', community);
  };

  const handleDelete = async (communitySlug) => {
    console.log('Delete community with slug:', communitySlug);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterArea(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Container>
        <SubHeader title="Manage Communities" />
        {error && (
          <Box sx={{ mb: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {/* Search and Filter Inputs */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" gap={2}>
            <TextField label="Search" variant="outlined" value={search} onChange={handleSearchChange} />
            <TextField
              label="Filter by Area"
              variant="outlined"
              select
              value={filterArea}
              onChange={handleFilterChange}
              style={{ minWidth: 220 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {areas.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {`${area.name}, ${area.city}`}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button variant="contained" color="primary" onClick={handleDrawerOpen}>
            Add Community
          </Button>
        </Box>

        <Divider sx={{ borderColor: theme.palette.grey[400], mb: gridSpacing }} />

        {loading && <LinearProgress />}
        {!loading && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Community Name</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Active Status</TableCell>
                    <TableCell>Publish Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {communities.map((community, index) => (
                    <TableRow key={community.slug}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{community.name}</TableCell>
                      <TableCell>{community.area_name}</TableCell>
                      <TableCell>{community.description}</TableCell>
                      <TableCell>{formatDate(community.created_at)}</TableCell>
                      <TableCell>
                        <Chip label={community.is_active ? 'Active' : 'Not Active'} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={community.is_published ? 'Published' : 'Not Published'} size="small" />
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleUpdate(community)}>
                          <Visibility />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleUpdate(community)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(community.slug)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={totalCommunities}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Container>
      <AddCommunity open={isDrawerOpen} onClose={handleDrawerClose} fetchCommunities={fetchCommunities} />
    </>
  );
};

export default ManageCommunities;
