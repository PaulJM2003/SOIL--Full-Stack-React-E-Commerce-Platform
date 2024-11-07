import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { AdminPanelSettings, People, RateReview } from '@mui/icons-material';

const Home = () => {
  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Typography variant="h3" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Manage your users, reviews, and settings with ease.
      </Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card raised>
            <CardContent>
              <AdminPanelSettings fontSize="large" color="primary" />
              <Typography variant="h5" gutterBottom>
                Admin Panel
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Access to all administrative controls and settings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card raised>
            <CardContent>
              <People fontSize="large" color="secondary" />
              <Typography variant="h5" gutterBottom>
                User Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Add, edit, and manage your users effortlessly.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card raised>
            <CardContent>
              <RateReview fontSize="large" color="action" />
              <Typography variant="h5" gutterBottom>
                Review Moderation
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Moderate and review user feedback and comments.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
