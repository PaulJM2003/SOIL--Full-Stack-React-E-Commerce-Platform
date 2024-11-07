import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';
import { getUserById } from '../data/repository';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>User Details</Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>ID: {user.SID}</Typography>
        <Typography variant="h6" gutterBottom>Username: {user.username}</Typography>
        <Typography variant="h6" gutterBottom>Name: {user.Name}</Typography>
        <Typography variant="h6" gutterBottom>Email: {user.email}</Typography>
      </Paper>
    </Box>
  );
}

export default UserDetails;


