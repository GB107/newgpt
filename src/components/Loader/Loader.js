import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} data-testid="loader">
  <CircularProgress data-testid="circular-progress" />
</Box>
  );
};

export default Loader;
