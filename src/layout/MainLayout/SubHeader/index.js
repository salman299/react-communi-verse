import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const SubHeader = ({ title }) => {
  return (
    <>
      <Card sx={{ mb: '20px' }}>
        <Box sx={{ padding: '16px' }}>
          <Typography variant="h3">{title}</Typography>
        </Box>
      </Card>
    </>
  );
};
SubHeader.propTypes = {
  title: PropTypes.string
};

export default SubHeader;
