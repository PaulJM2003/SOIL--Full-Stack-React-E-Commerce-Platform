import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Product 1', price: '$100' },
    { id: 2, name: 'Product 2', price: '$200' }
];

const ProductManagement = () => {
    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>Product Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button component={Link} to={`/products/${product.id}`} variant="contained">Details</Button>
                                    <Button component={Link} to={`/products/edit/${product.id}`} variant="contained">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button component={Link} to="/products/add" variant="contained" color="primary" style={{ marginTop: '20px' }}>Add Product</Button>
        </Box>
    );
}

export default ProductManagement;
