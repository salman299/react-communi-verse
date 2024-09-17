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

const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' }
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const areas = useSelector((state) => state.areaCity.areas);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await CurrentUser();
        setUserData(data);
        setFormData(data);
        setAvatarPreview(data.avatar);
        setThumbnailPreview(data.thumbnail);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    dispatch(fetchAreas());
  }, [dispatch]);

  const handleEditClick = () => setIsEditing(true);

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
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prevData) => ({ ...prevData, avatar: file }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prevData) => ({ ...prevData, thumbnail: file }));
    }
  };

  const handleCancelClick = () => {
    setFormData(userData);
    setAvatarPreview(userData.avatar);
    setThumbnailPreview(userData.thumbnail);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      await updateCurrentUser(formData, userData);
      setUserData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!userData) {
    return <Typography>Error loading user data</Typography>;
  }

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} p={2} sx={{ backgroundColor: '#fff', borderRadius: '10px' }}>
      <Box width={{ xs: '100%', sm: '30%' }} sx={{ border: '1px solid #e0e0e0', padding: 2, backgroundColor: '#f9f9f9', flexShrink: 0 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={avatarPreview || '/path/to/default-avatar.jpg'} alt={formData.full_name} sx={{ width: 80, height: 80 }} />
          <Box ml={2}>
            <Typography variant="h4">{formData.full_name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.person_id}
            </Typography>
          </Box>
        </Box>

        {isEditing && (
          <Box mt={2}>
            <input accept="image/*" style={{ display: 'none' }} id="avatar-upload" type="file" onChange={handleAvatarChange} />
            <label htmlFor="avatar-upload">
              <Button variant="outlined" color="primary" component="span">
                Change Avatar
              </Button>
            </label>
          </Box>
        )}

        <Box mt={2}>
          <Avatar
            src={thumbnailPreview || '/path/to/default-thumbnail.jpg'}
            alt="Thumbnail"
            sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
          />
          {isEditing && (
            <Box mt={1}>
              <input accept="image/*" style={{ display: 'none' }} id="thumbnail-upload" type="file" onChange={handleThumbnailChange} />
              <label htmlFor="thumbnail-upload">
                <Button variant="outlined" color="primary" component="span">
                  Change Thumbnail
                </Button>
              </label>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Email fontSize="small" sx={{ color: '#5F6368' }} />
            <Typography ml={1} variant="body2" color="textSecondary">
              {formData.personal_email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Phone fontSize="small" sx={{ color: '#5F6368' }} />
            <Typography ml={1} variant="body2" color="textSecondary">
              {formData.cellphone_number || 'N/A'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOn fontSize="small" sx={{ color: '#5F6368' }} />
            <Typography ml={1} variant="body2" color="textSecondary">
              {formData.city || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box
        width={{ xs: '100%', sm: '70%' }}
        sx={{ border: '1px solid #e0e0e0', padding: 2, backgroundColor: '#f9f9f9', position: 'relative' }}
      >
        {!isEditing && (
          <IconButton size="small" onClick={handleEditClick} sx={{ position: 'absolute', top: 10, right: 10 }}>
            <Edit fontSize="small" />
          </IconButton>
        )}

        <Typography variant="h5" mt={3}>
          Personal Information
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="full_name"
              value={formData.full_name || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Father's Name"
              name="fathers_name"
              value={formData.fathers_name || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="NIC" name="nic" value={formData.nic || ''} onChange={handleInputChange} fullWidth disabled={!isEditing} />
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
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" name="gender" value={formData.gender || ''} onChange={handleInputChange} disabled={!isEditing}>
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
                disabled={!isEditing}
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

        <Typography variant="h5" mt={3}>
          Contact Information
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cellphone Number"
              name="cellphone_number"
              value={formData.cellphone_number || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="WhatsApp Cellphone Number"
              name="whatsapp_cellphone_number"
              value={formData.whatsapp_cellphone_number || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Emergency Contact Name"
              name="emergency_contact_name"
              value={formData.emergency_contact_name || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Emergency Contact Number"
              name="emergency_contact_number"
              value={formData.emergency_contact_number || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Emergency Contact Relation"
              name="emergency_contact_relation"
              value={formData.emergency_contact_relation || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" mt={3}>
          Address
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Address"
              name="current_address"
              value={formData.current_address || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Permanent Address"
              name="permanent_address"
              value={formData.permanent_address || ''}
              onChange={handleInputChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City" name="city" value={formData.city || ''} onChange={handleInputChange} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Area</InputLabel>
              <Select label="Area" name="area" value={formData.area || ''} onChange={handleInputChange} disabled={!isEditing}>
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {isEditing && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSaveClick} sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<Cancel />} onClick={handleCancelClick}>
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileTab;
