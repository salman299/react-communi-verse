import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  Select,
  Badge,
  MenuItem,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import { Email, Phone, LocationOn, Edit, Save, Cancel } from '@mui/icons-material';
import { CurrentUser } from '../../services/CurrentUser';
import updateCurrentUser from '../../services/UpdateCurrentUser';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAreas } from '../../store/areaCitySlice';
import MainCard from 'ui-component/cards/MainCard';

const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'N', label: 'Not to be disclosed' }
];

const maritalStatusOptions = [
  { value: 1, label: 'Single' },
  { value: 2, label: 'Married' },
  { value: 3, label: 'Divorced' },
  { value: 4, label: 'Widowed' }
];

const ProfileTab = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    contactInfo: false,
    address: false
  });
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const areas = useSelector((state) => state.areaCity.areas);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await CurrentUser();
        setUserData(data);
        setFormData(data);
        setAvatarPreview(data.avatar);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    dispatch(fetchAreas());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Update preview with new avatar
      };
      reader.readAsDataURL(file);

      // Update formData with new avatar file
      setFormData((prevData) => ({ ...prevData, avatar: file }));
      setIsEditing((prev) => ({ ...prev, avatar: true })); // Set avatar editing to true
    }
  };

  const handleSave = async (section) => {
    try {
      await updateCurrentUser(formData, userData); // Send entire formData to server
      setUserData(formData); // Update local state with the new data
      setIsEditing((prev) => ({ ...prev, [section]: false }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = (section) => {
    setFormData(userData);
    setIsEditing((prev) => ({ ...prev, [section]: false }));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!userData) {
    return <Typography>Error loading user data</Typography>;
  }

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} p={2} sx={{ borderRadius: '10px' }}>
      {/* Left Side - Avatar and Basic Details */}
      <MainCard sx={{ height: '100%', width: { xs: '100%', sm: '30%' }, padding: 2, backgroundColor: '#f9f9f9' }}>
        <Box display="flex" flexDirection="column" alignItems="center" position="relative">
          <Badge
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            overlap="circular"
            badgeContent={
              <IconButton
                onClick={() => document.getElementById('avatar-upload').click()}
                sx={{ padding: '1px', bgcolor: 'white', borderRadius: '50%' }}
              >
                <Edit fontSize="small" />
              </IconButton>
            }
          >
            <Avatar
              src={avatarPreview || '/path/to/default-avatar.jpg'}
              alt={formData.full_name}
              sx={{ width: { xs: 80, sm: 100, md: 120 }, height: { xs: 80, sm: 100, md: 120 } }}
            />
          </Badge>
          <Typography variant="h5" mt={1}>
            {formData.full_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {userData.person_id}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Email fontSize="small" sx={{ color: '#5F6368' }} />
            <Typography
              ml={1}
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, wordWrap: 'break-word', maxWidth: { xs: '90%', sm: '100%' } }}
            >
              {formData.personal_email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Phone fontSize="small" sx={{ color: '#5F6368' }} />
            <Typography
              ml={1}
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, wordWrap: 'break-word', maxWidth: { xs: '90%', sm: '100%' } }}
            >
              {formData.cellphone_number || 'N/A'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOn fontSize="small" sx={{ color: '#5F6368' }} />
            <Typography
              ml={1}
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, wordWrap: 'break-word', maxWidth: { xs: '90%', sm: '100%' } }}
            >
              {formData.city || 'N/A'}
            </Typography>
          </Box>
        </Box>

        <input accept="image/*" style={{ display: 'none' }} id="avatar-upload" type="file" onChange={handleAvatarChange} />

        {isEditing.avatar && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={() => handleSave('avatar')} sx={{ mr: 1 }}>
              <Save fontSize="small" />
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => handleCancel('avatar')}>
              <Cancel fontSize="small" />
            </Button>
          </Box>
        )}
      </MainCard>

      {/* Right Side - Main Information */}
      <Divider orientation="vertical" flexItem />
      <Box width={{ xs: '100%', sm: '70%' }}>
        {/* Personal Information Section */}
        <MainCard title="Personal Information" sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="full_name"
                value={formData.full_name || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.personalInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Father's Name"
                name="fathers_name"
                value={formData.fathers_name || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.personalInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NIC"
                name="nic"
                value={formData.nic || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.personalInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth || ''}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={!isEditing.personalInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing.personalInfo}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  label="Marital Status"
                  name="marital_status"
                  value={formData.marital_status || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing.personalInfo}
                >
                  {maritalStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            {isEditing.personalInfo ? (
              <>
                <Button variant="contained" color="primary" onClick={() => handleSave('personalInfo')} sx={{ mr: 1 }}>
                  <Save fontSize="small" />
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleCancel('personalInfo')}>
                  <Cancel fontSize="small" />
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing((prev) => ({ ...prev, personalInfo: true }))}>
                Edit
              </Button>
            )}
          </Box>
        </MainCard>

        {/* Contact Information Section */}
        <MainCard title="Contact Information" sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Personal Email"
                name="personal_email"
                value={formData.personal_email || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.contactInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cellphone Number"
                name="cellphone_number"
                value={formData.cellphone_number || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.contactInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="WhatsApp Cellphone Number"
                name="whatsapp_cellphone_number"
                value={formData.whatsapp_cellphone_number || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.contactInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Name"
                name="emergency_contact_name"
                value={formData.emergency_contact_name || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.contactInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Number"
                name="emergency_contact_number"
                value={formData.emergency_contact_number || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.contactInfo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Relation"
                name="emergency_contact_relation"
                value={formData.emergency_contact_relation || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.contactInfo}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            {isEditing.contactInfo ? (
              <>
                <Button variant="contained" color="primary" onClick={() => handleSave('contactInfo')} sx={{ mr: 1 }}>
                  <Save fontSize="small" />
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleCancel('contactInfo')}>
                  <Cancel fontSize="small" />
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing((prev) => ({ ...prev, contactInfo: true }))}>
                Edit
              </Button>
            )}
          </Box>
        </MainCard>

        {/* Address Information Section */}
        <MainCard title="Address Information">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Address"
                name="current_address"
                value={formData.current_address || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Permanent Address"
                name="permanent_address"
                value={formData.permanent_address || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={!isEditing.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Area</InputLabel>
                <Select label="Area" name="area" value={formData.area || ''} onChange={handleInputChange} disabled={!isEditing.address}>
                  {areas.map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            {isEditing.address ? (
              <>
                <Button variant="contained" color="primary" onClick={() => handleSave('address')} sx={{ mr: 1 }}>
                  <Save fontSize="small" />
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleCancel('address')}>
                  <Cancel fontSize="small" />
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing((prev) => ({ ...prev, address: true }))}>
                Edit
              </Button>
            )}
          </Box>
        </MainCard>
      </Box>
    </Box>
  );
};

export default ProfileTab;
