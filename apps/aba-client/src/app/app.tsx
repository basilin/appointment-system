import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Dashboard } from './pages/dashboard';

export const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Dashboard/>
    </Box>
  );
};

export default App;
