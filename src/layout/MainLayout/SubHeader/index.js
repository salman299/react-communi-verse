import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| SUB HEADER ||============================== //

const SubHeader = ({ title }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
          padding: '16px 8px'
        }}
      >
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
      </Box>
    </>
  );
};
SubHeader.propTypes = {
  title: PropTypes.string
};

export default SubHeader;
