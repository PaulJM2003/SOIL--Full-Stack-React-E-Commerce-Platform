import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MetricCard = ({ title, value }) => {
  return (
    <Card style={{ minWidth: 275, marginBottom: 16 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3" color="textSecondary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
