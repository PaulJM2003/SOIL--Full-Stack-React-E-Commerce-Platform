import React from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    // Fetch product details using the id

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>Product Details</Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>ID: {id}</Typography>
                <Typography variant="h6" gutterBottom>Name: Product 1</Typography>
                <Typography variant="h6" gutterBottom>Price: $100</Typography>
                {/* Add more product details here */}
            </Paper>
        </Box>
    );
}

export default ProductDetails;
