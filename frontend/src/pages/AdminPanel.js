import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        console.log('Fetching admin data...');
        console.log('Is admin?', isAdmin);
        const response = await api.get('/admin/dashboard');
        console.log('Admin dashboard response:', response);
        setStats(response);
        setError('');
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Access denied. Admin only.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">News</Typography>
            <Typography variant="h4">{stats?.counts?.news || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Projects</Typography>
            <Typography variant="h4">{stats?.counts?.projects || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Tools</Typography>
            <Typography variant="h4">{stats?.counts?.tools || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">{stats?.counts?.users || 0}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default AdminPanel; 