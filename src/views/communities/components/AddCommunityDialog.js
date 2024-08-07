import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Modal,
  Divider,
  Grid,
  Autocomplete
} from '@mui/material';
import { createCommunity } from 'services/Community';
import { Users } from 'services/Users';
import FileUploader from './FileUpload';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const AddCommunityDialog = ({ open, handleClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const { areas } = useSelector((state) => state.areaCity);

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
    owner: Yup.string().required('Owner is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('slug', values.slug);
      data.append('name', values.communityName);
      data.append('description', values.description);
      data.append('area', values.area);
      data.append('color', 'fff');
      data.append('logo', values.logoImage);
      data.append('cover_image', values.coverImage);
      data.append('owner', values.owner);
      const response = await createCommunity(data);
      console.log('Response:', response);

      resetForm();
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
          maxWidth: 650,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto'
        }}
      >
        <Typography variant="h2" component="h2" mb={2}>
          Add Community
        </Typography>
        <Divider />
        <Formik
          initialValues={{
            logoImage: null,
            coverImage: null,
            area: '',
            communityName: '',
            slug: '',
            description: '',
            owner: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <FileUploader
                image={values.logoImage}
                handleUpload={(event) => setFieldValue('logoImage', event.target.files[0])}
                label="Upload Logo/Image"
                uploadType="button"
                buttonText="Upload Logo/Image"
                avatarSize={80}
              />
              <FileUploader
                image={values.coverImage}
                handleUpload={(event) => setFieldValue('coverImage', event.target.files[0])}
                uploadType="cover"
                buttonText="Select Cover Image"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
                    <InputLabel id="select-area-label">Select Area</InputLabel>
                    <Select
                      labelId="select-area-label"
                      id="select-area"
                      name="area"
                      value={values.area}
                      onChange={(event) => setFieldValue('area', event.target.value)}
                      label="Select Area"
                      required
                      sx={{ height: 50 }}
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
                  <Autocomplete
                    options={users}
                    getOptionLabel={(user) => user.username}
                    onChange={(event, newValue) => {
                      setFieldValue('owner', newValue ? newValue.username : '');
                    }}
                    renderInput={(params) => <TextField {...params} label="Owner" variant="outlined" fullWidth required sx={{ mt: 2 }} />}
                  />
                  {touched.owner && errors.owner && (
                    <Typography color="error" variant="body2">
                      {errors.owner}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
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
                    sx={{ mt: 2 }}
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
                    sx={{ mt: 2 }}
                  />
                </Grid>
              </Grid>
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
                sx={{ mt: 2 }}
              />
              {touched.description && errors.description && (
                <Typography color="error" variant="body2">
                  {errors.description}
                </Typography>
              )}
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button type="button" variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Community'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddCommunityDialog;
