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
  Box,
  TablePagination,
  TextField,
  Alert,
  Card,
  CardContent,
  Stack,
  InputAdornment,
  Tabs,
  Tab,
  Button,
  Autocomplete
} from '@mui/material';
import SubHeader from 'layout/MainLayout/SubHeader';
import AuthenticatedAPIClient from 'services/api';
import SearchIcon from '@mui/icons-material/Search';

const ManageJoinRequests = () => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRequests, setTotalRequests] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState(null);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const fetchCommunities = useCallback(async () => {
    try {
      const response = await AuthenticatedAPIClient.get('/api/v1/community-join-requests/communities/');
      setCommunities(response.data);
    } catch (err) {
      console.error('Error fetching communities:', err);
      setError('Failed to fetch communities. Please try again.');
    }
  }, []);

  const fetchJoinRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await AuthenticatedAPIClient.get(`/api/v1/community-join-requests/`, {
        params: {
          page: page + 1,
          page_size: rowsPerPage,
          search: search,
          status: statusFilter,
          community__slug: selectedCommunity?.slug || '',
          ordering: '-created_at'
        }
      });
      setJoinRequests(response.data.results);
      setTotalRequests(response.data.count);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching join requests:', err);
      setError('Failed to fetch join requests. Please try again.');
      setLoading(false);
    }
  }, [page, rowsPerPage, search, statusFilter, selectedCommunity]);

  useEffect(() => {
    fetchJoinRequests();
  }, [page, rowsPerPage, search, statusFilter, selectedCommunity, fetchJoinRequests]);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      await AuthenticatedAPIClient.put(`/api/v1/community-join-requests/${id}/`, {
        status: newStatus
      });
      fetchJoinRequests(); // Re-fetch join requests to update the table
    } catch (err) {
      console.error('Error updating join request status:', err);
      setError('Failed to update the request status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setStatusFilter(newValue);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Container>
        <SubHeader title="Manage Community Join Requests" />
        {error && (
          <Box sx={{ mb: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Tabs
          value={statusFilter}
          onChange={handleTabChange}
          aria-label="status tabs"
          sx={{
            mb: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Tab value="pending" label="Pending" />
          <Tab value="approved" label="Approved" />
          <Tab value="declined" label="Declined" />
        </Tabs>
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
              // justifyContent="space-between"
            >
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
              />
              <Autocomplete
                value={selectedCommunity}
                onChange={(event, newValue) => setSelectedCommunity(newValue)}
                options={communities}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Filter by Community" variant="outlined" size="small" sx={{ width: 300 }} />
                )}
                isOptionEqualToValue={(option, value) => option.slug === value.slug}
              />
            </Stack>
          </CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Community Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Requested Date</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {joinRequests.map((request, index) => (
                  <TableRow key={request.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{request.user_full_name}</TableCell>
                    <TableCell>{request.community_name}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{formatDate(request.created_at)}</TableCell>
                    <TableCell>{formatDate(request.updated_at)}</TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => handleStatusChange(request.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button variant="outlined" color="error" size="small" onClick={() => handleStatusChange(request.id, 'declined')}>
                            Decline
                          </Button>
                        </Stack>
                      )}
                      {request.status === 'declined' && (
                        <Button variant="outlined" color="primary" onClick={() => handleStatusChange(request.id, 'pending')}>
                          Reconsider
                        </Button>
                      )}
                      {request.status === 'approved' && <span>No Actions</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalRequests}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
};

export default ManageJoinRequests;
