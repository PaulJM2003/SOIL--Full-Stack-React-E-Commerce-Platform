import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle product submission
        console.log({ name, price });
    }

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>Add Product</Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">Add Product</Button>
                </form>
            </Paper>
        </Box>
    );
}

export default AddProduct;
