import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Settings = () => {
    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>Settings</Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>Settings</Typography>
                {/* Add settings form or options here */}
            </Paper>
        </Box>
    );
}

export default Settings;
