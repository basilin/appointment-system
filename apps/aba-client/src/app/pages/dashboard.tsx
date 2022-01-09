import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Toolbar,
} from '@mui/material';
import React from 'react';
import AppBar from '../components/appbar';
import Drawer from '../components/drawer';
import { CustomToolbar } from '../components/toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Routes, Route, Link } from 'react-router-dom';
import { mainListItems } from '../components/listItems';
import { Seller } from './seller';
import { Appointment } from './appointment';
import { Dash } from './dash';
import { Slot } from './slot';

export const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <CustomToolbar open={open} toggleDrawer={toggleDrawer}></CustomToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="seller" element={<Seller />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="slot/:sellerId" element={<Slot />} />
        </Routes>
      </Box>
    </>
  );
};
