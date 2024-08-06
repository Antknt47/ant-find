// src/pages/HomePage.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardActions, Button, CardActionArea, CardMedia } from '@mui/material';
import './App.css'
import treeImage from '../src/assets/tree.png';
import CameraComponent from './CameraComponent';

const HomePage = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'var(--accent2)', color: 'var(--text)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            🔍🐜Ant Find
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ padding: 0, marginLeft: 0, maxWidth: '100%' }}>
        <CameraComponent>

        </CameraComponent>
      </Container>
    </div>
  );
};

export default HomePage;
