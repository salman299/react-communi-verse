import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| SUB HEADER ||============================== //

const SubHeader = ({ title }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
          backgroundColor: theme.palette.background.paper,
          padding: '12px',
          mb: '20px',
          borderRadius: `${customization.borderRadius}px`
        }}
      >
        <Typography variant="h5" fontSize="1.125rem">
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
