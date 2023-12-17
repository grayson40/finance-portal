// components/layout/MainLayout.jsx
import React from 'react';
import { Box } from '@mui/material';

const HomeLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      {/* Sidebar */}
      <Box component="main" sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};


export default HomeLayout;
