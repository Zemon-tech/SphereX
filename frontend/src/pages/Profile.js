import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Alert,
  Grid,
  Divider
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../services/api';

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
  border: '1px solid rgba(0,0,0,0.04)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 140,
  height: 140,
  border: '5px solid white',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  margin: '-70px auto 24px',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
  }
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
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.95rem',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '40px',
    height: '3px',
    background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
    borderRadius: '2px',
  }
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  '& .MuiDivider-wrapper': {
    padding: theme.spacing(0, 2),
  }
}));

const UpdateButton = styled(Button)(({ theme }) => ({
  padding: '12px 40px',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
  boxShadow: '0 4px 12px rgba(111, 157, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #1e1e2f 60%, #6f9dff 90%)',
    boxShadow: '0 6px 16px rgba(111, 157, 255, 0.3)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: '#e0e0e0',
  }
}));

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    college: '',
    branch: '',
    linkedinId: '',
    githubId: '',
    instagramId: '',
    mobileNumber: '',
    profileImage: null
  });

  // Fetch user data from MongoDB when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/${currentUser.email}`);
        setFormData(prev => ({
          ...prev,
          name: response.name || currentUser?.displayName || '',
          college: response.college || '',
          branch: response.branch || '',
          linkedinId: response.linkedinId || '',
          githubId: response.githubId || '',
          instagramId: response.instagramId || '',
          mobileNumber: response.mobileNumber || '',
          profileImage: null
        }));
      } catch (error) {
        // If user doesn't exist in MongoDB, create one
        if (error.response?.status === 404) {
          try {
            await api.post('/users', {
              email: currentUser.email,
              name: currentUser.displayName || '',
              firebaseUid: currentUser.uid
            });
            // After creating user, set initial form data
            setFormData(prev => ({
              ...prev,
              name: currentUser.displayName || '',
            }));
          } catch (createError) {
            console.error('Error creating user profile:', createError);
            setError('Failed to create profile');
          }
        } else {
          console.error('Error fetching profile:', error);
          setError('Failed to load profile data');
        }
      }
    };

    if (currentUser?.email) {
      fetchUserProfile();
    }
  }, [currentUser]);

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
      // Handle profile image upload first if exists
      if (formData.profileImage) {
        const imageFormData = new FormData();
        imageFormData.append('profileImage', formData.profileImage);
        
        try {
          const imageResponse = await api.post('/users/profile-image', imageFormData);
          if (imageResponse.photoURL) {
            await updateUserProfile({
              photoURL: imageResponse.photoURL
            });
          }
        } catch (error) {
          console.error('Error uploading profile image:', error);
        }
      }

      // Update Firebase display name
      await updateUserProfile({
        displayName: formData.name
      });

      // Update profile data in MongoDB
      await api.put('/users/profile', {
        displayName: formData.name,
        college: formData.college,
        branch: formData.branch,
        linkedinId: formData.linkedinId,
        githubId: formData.githubId,
        instagramId: formData.instagramId,
        mobileNumber: formData.mobileNumber
      });

      setSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2, 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)'
          }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert 
          severity="success"
          sx={{ 
            mb: 2, 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)'
          }}
        >
          {success}
        </Alert>
      )}
      <ProfilePaper elevation={0}>
        <Box component="form" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="profile-image-input"
          />
          <label htmlFor="profile-image-input">
            <ProfileAvatar
              src={currentUser?.photoURL}
              alt={formData.name}
            >
              {formData.name?.charAt(0)}
            </ProfileAvatar>
          </label>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <SectionTitle>
                Personal Information
              </SectionTitle>
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <PhoneIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="College"
                name="college"
                value={formData.college}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <SchoolIcon sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.54)' }} />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <StyledDivider>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }}
                >
                  Social Links
                </Typography>
              </StyledDivider>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledTextField
                label="LinkedIn Profile"
                name="linkedinId"
                value={formData.linkedinId}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: <LinkedInIcon sx={{ mr: 1, color: '#0077b5' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledTextField
                label="GitHub Profile"
                name="githubId"
                value={formData.githubId}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: <GitHubIcon sx={{ mr: 1, color: '#333' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledTextField
                label="Instagram Profile"
                name="instagramId"
                value={formData.instagramId}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: <InstagramIcon sx={{ mr: 1, color: '#e4405f' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4 
              }}>
                <UpdateButton
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </UpdateButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ProfilePaper>
    </Container>
  );
};

export default Profile; 