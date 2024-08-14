import PropTypes from 'prop-types';
import { Box, Avatar, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const AvatarUploader = ({ imageUrl, handleUpload, buttonVariant = 'outlined', avatarSize = 100 }) => (
  <Box display="flex" flexDirection="row" alignItems="center" mb={3} sx={{ width: '100%', mt: 3 }}>
    <Avatar src={imageUrl ?? null} sx={{ width: avatarSize, height: avatarSize, mr: 2 }}>
      {!imageUrl && <InsertPhotoOutlinedIcon sx={{ fontSize: avatarSize * 0.35 }} />}
    </Avatar>
    <Button variant={buttonVariant} component="label" startIcon={<CloudUploadIcon />} sx={{ ml: 2 }}>
      {imageUrl ? 'Update Logo' : 'Upload Logo'}
      <input hidden accept="image/png, image/jpeg, image/gif" type="file" onChange={handleUpload} />
    </Button>
  </Box>
);

AvatarUploader.propTypes = {
  imageUrl: PropTypes.string,
  handleUpload: PropTypes.func.isRequired,
  buttonVariant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  avatarSize: PropTypes.number
};

export default AvatarUploader;
