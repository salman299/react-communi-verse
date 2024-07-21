import React, { useState } from 'react';
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
  IconButton,
  Avatar,
  Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import UploadDark from 'assets/images/icons/upload-dark';
import UploadLight from 'assets/images/icons/upload-light';

const LogoUploader = ({ logoImage, handleLogoUpload }) => (
  <Box display="flex" alignItems="center" my={3}>
    {logoImage ? (
      <Avatar src={logoImage} alt="Logo Image" sx={{ width: 80, height: 80, marginRight: 2 }} />
    ) : (
      <Avatar sx={{ width: 80, height: 80, marginRight: 2 }}>
        <PersonIcon />
      </Avatar>
    )}
    <Button variant="outlined" component="label" startIcon={<UploadDark />} sx={{ marginLeft: 2 }}>
      Upload Logo/Image
      <input hidden accept="image/*" type="file" onChange={handleLogoUpload} />
    </Button>
  </Box>
);

const CoverUploader = ({ coverImage, handleCoverUpload }) => (
  <Box display="flex" flexDirection="column" mb={2} sx={{ width: '100%' }}>
    <Typography variant="h5" component="label" htmlFor="cover-upload" color="gray" sx={{ marginBottom: '8px' }}>
      Cover Image
    </Typography>
    <IconButton color="primary" component="label" sx={{ width: '100%' }}>
      <input hidden accept="image/*" id="cover-upload" type="file" onChange={handleCoverUpload} />
      <Box
        sx={{
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          backgroundColor: '#f0f0f0',
          position: 'relative',
          ml: -2
        }}
      >
        {coverImage ? (
          <Box
            component="img"
            src={coverImage}
            alt="Cover Image"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <Box>
            <UploadLight />
            <Typography variant="h3" color="gray">
              Select Cover Image
            </Typography>
          </Box>
        )}
      </Box>
    </IconButton>
  </Box>
);

const AddCommunityDialog = ({ open, handleClose }) => {
  const [logoImage, setLogoImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleLogoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setLogoImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCoverUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(URL.createObjectURL(event.target.files[0]));
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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography variant="h2" component="h2" mb={2}>
          Add Community
        </Typography>
        <Divider />
        <LogoUploader logoImage={logoImage} handleLogoUpload={handleLogoUpload} />
        <CoverUploader coverImage={coverImage} handleCoverUpload={handleCoverUpload} />
        <Box component="form" noValidate autoComplete="off">
          <FormControl fullWidth margin="normal" sx={{ mt: 2 }}>
            <InputLabel id="select-area-label">Select Area</InputLabel>
            <Select labelId="select-area-label" id="select-area" defaultValue="" label="Select Area" required sx={{ height: 50 }}>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              {/* Add more MenuItem as needed */}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                id="community-name"
                label="Community Name"
                variant="outlined"
                placeholder="Ismaili Mubarak Scout Group"
                required
                InputProps={{
                  sx: { height: 50 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                id="slug"
                label="Slug (Unique Identity)"
                variant="outlined"
                placeholder="Scouts@Mubarak321"
                required
                InputProps={{
                  sx: { height: 50 }
                }}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            margin="normal"
            id="description"
            label="Description"
            variant="outlined"
            placeholder="Write description about institution"
            multiline
            rows={6}
            required
            InputProps={{
              sx: { height: 150 }
            }}
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Add Community
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ color: 'white' }} onClick={handleOpen} fullWidth size="large" type="submit" variant="contained" color="secondary">
        Add New
      </Button>
      <AddCommunityDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default App;
