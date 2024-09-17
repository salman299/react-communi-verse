import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ProfileTab from './ProfileTab';
import SettingsTab from './SettingsTab';

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box>{children}</Box>}
  </div>
);

const AccountPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label="Profile" />
        <Tab label="Settings" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <ProfileTab />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <SettingsTab />
      </TabPanel>
    </Box>
  );
};

export default AccountPage;
