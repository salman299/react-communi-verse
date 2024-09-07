import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  LinearProgress,
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
  TextField,
  MenuItem,
  Alert,
  Chip,
  Card,
  CardContent,
  Fab,
  Stack,
  InputAdornment
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import SubHeader from 'layout/MainLayout/SubHeader';
import AuthenticatedAPIClient from 'services/api';
import AddUpdateCommunityDialog from './components/AddCommunityDialog';
import { useSelector } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const ManageCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCommunities, setTotalCommunities] = useState(0);
  const [search, setSearch] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const { areas } = useSelector((state) => state.areaCity);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setSelectedCommunity(null);
    setIsDialogOpen(true);
  };

  const fetchCommunities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await AuthenticatedAPIClient.get(`/api/v1/communities/`, {
        params: {
          page: page + 1,
          page_size: rowsPerPage,
          search: search,
          area: filterArea,
          ordering: '-created_at'
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
    setSelectedCommunity(community);
    setIsDialogOpen(true);
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
        {loading && <LinearProgress />}
        <Card>
          <CardContent>
            <Stack
              direction="row"
              flexGrow={1}
              flexWrap="wrap"
              spacing={2}
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={search}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                />
                <TextField
                  label="Filter by Area"
                  variant="outlined"
                  select
                  value={filterArea}
                  onChange={handleFilterChange}
                  size="small"
                  sx={{ minWidth: 220 }}
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
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="large" aria-label="Filter">
                  <FilterListIcon />
                </IconButton>
                <Fab color="primary" aria-label="Add Community" size="small" onClick={handleDialogOpen}>
                  <AddIcon />
                </Fab>
              </Stack>
            </Stack>
          </CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Area</TableCell>
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
                    <TableCell>{formatDate(community.created_at)}</TableCell>
                    <TableCell>
                      <Chip label={community.is_active ? 'Active' : 'Not Active'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={community.is_published ? 'Published' : 'Not Published'} size="small" />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => {}}>
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
        </Card>
      </Container>
      <AddUpdateCommunityDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fetchCommunities={fetchCommunities}
        communityData={selectedCommunity}
      />
    </>
  );
};

export default ManageCommunities;
