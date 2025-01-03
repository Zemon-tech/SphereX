import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Tab,
  Tabs,
  Divider,
  Typography
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const Auth = () => {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 0) {
        // Login
        await login(formData.email, formData.password);
      } else {
        // Signup
        await signup(formData.email, formData.password, formData.name);
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          )}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {tab === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </Box>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Continue with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Auth; 