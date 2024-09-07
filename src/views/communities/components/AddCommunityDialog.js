import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  Typography,
  Grid,
  Autocomplete,
  CircularProgress,
  Divider,
  Snackbar,
  Alert,
  Box,
  Switch
} from '@mui/material';
import { createCommunity, updateCommunity } from 'services/Community';
import { Users } from 'services/Users';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import AvatarUploader from './AvatarUploader';
import CoverImageUploader from './CoverImageUploader';

const AddUpdateCommunityDialog = ({ open, onClose, fetchCommunities, communityData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [users, setUsers] = useState([]);
  const { areas } = useSelector((state) => state.areaCity);

  const colorOptions = [
    { value: '#FF5733', label: 'Red' },
    { value: '#33FF57', label: 'Green' },
    { value: '#3357FF', label: 'Blue' },
    { value: '#F1C40F', label: 'Yellow' },
    { value: '#9B59B6', label: 'Purple' },
    { value: '#E67E22', label: 'Orange' },
    { value: '#2ECC71', label: 'Light Green' }
  ];

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await Users();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);

  const validationSchema = Yup.object({
    communityName: Yup.string().required('Community Name is required'),
    slug: Yup.string()
      .required('Slug is required')
      .min(5, 'Slug must be at least 5 characters long')
      .matches(/^[a-z-]+$/, 'Slug must contain only lowercase letters and dashes'),
    description: Yup.string().required('Description is required'),
    area: Yup.number().required('Area is required'),
    // owner: Yup.string().required('Owner is required'),
    color: Yup.string().required('Color is required')
  });

  const buildFormData = (values) => {
    const formData = new FormData();

    const appendIfChanged = (field, value) => {
      if (!communityData || communityData[field] !== value) {
        formData.append(field, value);
      }
    };

    appendIfChanged('slug', values.slug);
    appendIfChanged('name', values.communityName);
    appendIfChanged('description', values.description);
    appendIfChanged('area', values.area);
    appendIfChanged('color', values.color);
    appendIfChanged('is_published', values.publish);

    values.logoImage && appendIfChanged('logo', values.logoImage);
    values.coverImage && appendIfChanged('cover_image', values.coverImage);
    !communityData && appendIfChanged('owner', values.owner);

    return formData;
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      const data = buildFormData(values);

      const response = communityData
        ? await updateCommunity(communityData.slug, data) // Update community if `communityData` is provided
        : await createCommunity(data); // Otherwise, create a new one

      if (response.error) {
        throw new Error(response.error);
      }

      resetForm();
      fetchCommunities();
      onClose();
    } catch (error) {
      setSnackbarMessage(error.message || 'An error occurred while saving the community');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{communityData ? 'Edit Community' : 'Add Community'}</DialogTitle>
        <Divider />
        <Formik
          initialValues={{
            logoImageUrl: communityData?.logo || null,
            logoImage: null,
            coverImageUrl: communityData?.cover_image || null,
            coverImage: null,
            area: communityData?.area || '',
            communityName: communityData?.name || '',
            slug: communityData?.slug || '',
            description: communityData?.description || '',
            owner: communityData?.owner || '',
            color: communityData?.color || '#FF5733',
            publish: communityData?.is_published || false
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <DialogContent>
                <Grid container columnSpacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12} justifyContent="flex-end" display="flex">
                    <FormControlLabel
                      control={<Switch checked={values.publish} />}
                      label={values.publish ? 'UNPUBLISH' : 'PUBLISH'}
                      onChange={(event) => setFieldValue('publish', event.target.checked)}
                    />
                  </Grid>
                  <Grid item xs={8} sm={6}>
                    <AvatarUploader
                      imageUrl={values.logoImageUrl}
                      handleUpload={(event) => {
                        setFieldValue('logoImageUrl', URL.createObjectURL(event.target.files[0]));
                        setFieldValue('logoImage', event.target.files[0]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="select-color-label">Select Color</InputLabel>
                      <Select
                        labelId="select-color-label"
                        id="select-color"
                        name="color"
                        value={values.color}
                        onChange={(event) => setFieldValue('color', event.target.value)}
                        label="Select Color"
                        size="small"
                        required
                      >
                        {colorOptions.map((color) => (
                          <MenuItem key={color.value} value={color.value}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  backgroundColor: color.value,
                                  borderRadius: '4px',
                                  marginRight: '8px'
                                }}
                              />
                              {color.label}
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.color && errors.color && (
                        <Typography color="error" variant="body2">
                          {errors.color}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <CoverImageUploader
                      imageUrl={values.coverImageUrl}
                      handleUpload={(event) => {
                        setFieldValue('coverImageUrl', URL.createObjectURL(event.target.files[0]));
                        setFieldValue('coverImage', event.target.files[0]);
                      }}
                      overlayColor={values.color}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="select-area-label">Select Area</InputLabel>
                      <Select
                        labelId="select-area-label"
                        id="select-area"
                        name="area"
                        value={values.area}
                        onChange={(event) => setFieldValue('area', event.target.value)}
                        label="Select Area"
                        required
                      >
                        {areas.map((area) => (
                          <MenuItem key={area.id} value={area.id}>
                            {`${area.name}, ${area.city}`}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.area && errors.area && (
                        <Typography color="error" variant="body2">
                          {errors.area}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Autocomplete
                        options={users}
                        getOptionLabel={(user) => user.username}
                        onChange={(event, newValue) => {
                          setFieldValue('owner', newValue ? newValue.username : '');
                        }}
                        value={users.find((user) => user.username === values.owner) || null}
                        renderInput={(params) => <TextField {...params} label="Owner" variant="outlined" fullWidth required />}
                        disabled={communityData ? true : false}
                      />
                      {touched.owner && errors.owner && (
                        <Typography color="error" variant="body2">
                          {errors.owner}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="communityName"
                      name="communityName"
                      label="Community Name"
                      variant="outlined"
                      placeholder="Ismaili Mubarak Scout Group"
                      required
                    />
                    {touched.communityName && errors.communityName && (
                      <Typography color="error" variant="body2">
                        {errors.communityName}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="slug"
                      name="slug"
                      label="Slug (Unique Identity)"
                      variant="outlined"
                      placeholder="ismaili-mubarak-scout-group"
                      required
                      error={Boolean(touched.slug && errors.slug)}
                      helperText={touched.slug && errors.slug}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      id="description"
                      name="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      minRows={4}
                      maxRows={8}
                      required
                    />
                    {touched.description && errors.description && (
                      <Typography color="error" variant="body2">
                        {errors.description}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : communityData ? 'Update Community' : 'Add Community'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

AddUpdateCommunityDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchCommunities: PropTypes.func.isRequired,
  communityData: PropTypes.object
};

export default AddUpdateCommunityDialog;
