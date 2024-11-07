import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';
import { getReviewById } from '../data/repository';

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const reviewData = await getReviewById(id);
        setReview(reviewData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Review Details</Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>ID: {review.review_id}</Typography>
        <Typography variant="h6" gutterBottom>Product ID: {review.product_id}</Typography>
        <Typography variant="h6" gutterBottom>User ID: {review.user_id}</Typography>
        <Typography variant="h6" gutterBottom>Rating: {review.rating}</Typography>
        <Typography variant="h6" gutterBottom>Review: {review.review_text}</Typography>
      </Paper>
    </Box>
  );
}

export default ReviewDetails;


