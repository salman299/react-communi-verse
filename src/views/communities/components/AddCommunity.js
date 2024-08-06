import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Drawer, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthenticatedAPIClient from 'services/api';
import { gridSpacing } from 'store/constant';

const AddCommunity = ({ open, onClose, fetchCommunities }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const initialValues = {
    slug: '',
    name: '',
    description: '',
    area: '',
    owner: '',
    logo: null,
    cover_image: null,
    color: ''
  };

  const validationSchema = Yup.object().shape({
    slug: Yup.string().required('Slug is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    area: Yup.string().required('Area is required'),
    owner: Yup.string().required('Owner is required'),
    logo: Yup.mixed().required('Logo is required'),
    cover_image: Yup.mixed().required('Cover Image is required'),
    color: Yup.string().required('Color is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');
    const form = new FormData();
    for (const key in values) {
      form.append(key, values[key]);
    }
    console.log(form);
    try {
      await AuthenticatedAPIClient.post('/api/v1/communities/', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchCommunities();
      onClose();
    } catch (err) {
      setError('Failed to add community. Please try again.');
      console.error('Error adding community:', err);
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3} width={400} role="presentation">
        <Typography variant="h6" mb={3}>
          Add Community
        </Typography>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Field name="slug" as={TextField} label="Slug" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Field name="name" as={TextField} label="Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Field name="description" as={TextField} label="Description" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Field name="area" as={TextField} label="Area" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Field name="owner" as={TextField} label="Owner" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                    Upload Logo
                    <input
                      type="file"
                      name="logo"
                      hidden
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue('logo', file);
                        setLogoPreview(URL.createObjectURL(file));
                      }}
                    />
                  </Button>
                  {logoPreview && (
                    <Box mt={2}>
                      <Typography variant="body2">Logo Preview:</Typography>
                      <img src={logoPreview} alt="Community logo preview" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                    Upload Cover Image
                    <input
                      type="file"
                      name="cover_image"
                      hidden
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue('cover_image', file);
                        setCoverImagePreview(URL.createObjectURL(file));
                      }}
                    />
                  </Button>
                  {coverImagePreview && (
                    <Box mt={2}>
                      <Typography variant="body2">Cover Image Preview:</Typography>
                      <img src={coverImagePreview} alt="Cover preview" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Field name="color" as={TextField} label="Color" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting || loading}>
                    {loading ? <CircularProgress size={24} /> : 'Add Community'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

AddCommunity.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchCommunities: PropTypes.func.isRequired
};

export default AddCommunity;
