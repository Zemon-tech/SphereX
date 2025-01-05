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
  Divider,
  Typography,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';

const AuthContainer = styled(Container)(({ theme }) => ({
  minHeight: 'calc(100vh - 200px)', // Space for footer
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(8)
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: '24px',
  maxWidth: '480px',
  width: '100%',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  border: '1px solid rgba(0,0,0,0.04)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: '#fff',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }
  }
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px',
  fontSize: '1rem',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&.MuiButton-contained': {
    background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #1e1e2f 60%, #6f9dff 90%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(111, 157, 255, 0.3)',
    }
  }
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px',
  width: '100%',
  textTransform: 'none',
  fontWeight: 500,
  border: '1px solid rgba(0,0,0,0.08)',
  background: '#fff',
  '&:hover': {
    background: '#f8f9fa',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  }
}));

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, loginWithGithub } = useAuth();

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
      if (isLogin) {
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

  const handleGithubSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGithub();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <AuthContainer maxWidth="lg">
      <AuthPaper elevation={0}>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 4, 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {isLogin ? 'Welcome Back!' : 'Join SphereX'}
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)'
            }}
          >
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          {!isLogin && (
            <StyledTextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          )}

          <StyledTextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />

          <StyledTextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />

          <AuthButton
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </AuthButton>

          <Box sx={{ position: 'relative', my: 3 }}>
            <Divider>
              <Typography 
                variant="body2" 
                sx={{ 
                  px: 2, 
                  color: 'text.secondary',
                  fontWeight: 500 
                }}
              >
                or continue with
              </Typography>
            </Divider>
          </Box>

          <Stack direction="row" spacing={2}>
            <SocialButton
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              fullWidth
            >
              Google
            </SocialButton>
            <SocialButton
              startIcon={<GitHubIcon />}
              onClick={handleGithubSignIn}
              fullWidth
            >
              GitHub
            </SocialButton>
          </Stack>
        </Stack>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button
              sx={{ 
                textTransform: 'none', 
                fontWeight: 600,
                '&:hover': {
                  background: 'transparent',
                  color: theme => theme.palette.primary.main
                }
              }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </Typography>
        </Box>
      </AuthPaper>
    </AuthContainer>
  );
};

export default Auth; 