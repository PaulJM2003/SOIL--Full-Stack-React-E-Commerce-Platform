import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getReviews, deleteReview } from '../data/repository';

const ReviewModeration = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      const updatedReviews = reviews.map(review => 
        review.review_id === id ? { ...review, review_text: "[**** This review has been deleted by the admin ***]" } : review
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
      setError(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Review Moderation</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Review Text</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.review_id}>
                <TableCell>{review.review_id}</TableCell>
                <TableCell>{review.product_id}</TableCell>
                <TableCell>{review.review_text}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/reviews/${review.review_id}`} variant="contained">Details</Button>
                  <Button onClick={() => handleDelete(review.review_id)} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReviewModeration;


