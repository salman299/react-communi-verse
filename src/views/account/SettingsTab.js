import React from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';

const SettingsTab = () => {
  return (
    <Box>
      <Typography variant="h6">Email Settings</Typography>
      <Box mt={2}>
        <FormControlLabel control={<Switch defaultChecked />} label="Email Notification" />
        <FormControlLabel control={<Switch />} label="Send Copy to Personal Email" />
      </Box>

      <Typography variant="h6" mt={4}>
        Activity Related Emails
      </Typography>
      <Box mt={2}>
        <FormControlLabel control={<Switch defaultChecked />} label="Have new notifications" />
        <FormControlLabel control={<Switch />} label="You're sent a direct message" />
        <FormControlLabel control={<Switch defaultChecked />} label="Someone adds you as a connection" />
      </Box>
    </Box>
  );
};

export default SettingsTab;
