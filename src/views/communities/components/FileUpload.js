import React from 'react';
import { Box, Button, IconButton, Avatar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploader = ({ image, handleUpload, label, uploadType, buttonText, buttonVariant = 'outlined', avatarSize = 80 }) => (
  <Box
    display="flex"
    flexDirection={uploadType === 'button' ? 'row' : 'column'}
    alignItems="center"
    mb={3}
    sx={{ width: '100%', marginTop: 3 }}
  >
    {uploadType === 'button' ? (
      <>
        <Avatar src={image ? URL.createObjectURL(image) : null} sx={{ width: avatarSize, height: avatarSize, marginRight: 2 }}>
          {!image && <PersonIcon />}
        </Avatar>
        <Button variant={buttonVariant} component="label" startIcon={<CloudUploadIcon />} sx={{ marginLeft: 2 }}>
          {buttonText}
          <input hidden accept="image/png, image/jpeg, image/gif" type="file" onChange={handleUpload} />
        </Button>
      </>
    ) : (
      <>
        <Typography variant="h5" component="label" htmlFor="cover-upload" color="gray" sx={{ marginBottom: '0px' }}>
          {label}
        </Typography>
        <IconButton color="primary" component="label" sx={{ width: '100%' }}>
          <input hidden accept="image/png, image/jpeg, image/gif" id="cover-upload" type="file" onChange={handleUpload} />
          <Box
            sx={{
              width: '100%',
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              backgroundColor: '#f0f0f0',
              position: 'relative'
            }}
          >
            {image ? (
              <Box
                component="img"
                src={URL.createObjectURL(image)}
                alt="Cover Image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Box>
                <CloudUploadIcon sx={{ fontSize: 48, color: 'gray' }} />
                <Typography variant="h6" color="gray">
                  {buttonText}
                </Typography>
              </Box>
            )}
          </Box>
        </IconButton>
      </>
    )}
  </Box>
);

export default FileUploader;
