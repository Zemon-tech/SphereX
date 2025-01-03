import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Alert
} from '@mui/material';
import api from '../services/api';

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    profileImage: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      await api.patch('/users/me', formDataToSend);
      setSuccess('Profile updated successfully');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar
            src={currentUser?.photoURL}
            sx={{ width: 100, height: 100, mb: 2 }}
          />

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Upload Profile Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 