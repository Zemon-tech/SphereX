import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  People as PeopleIcon,
  Article as ArticleIcon,
  Code as CodeIcon,
  Build as BuildIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
  color: '#fff',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.08) 0%, rgba(30, 30, 47, 0) 50%)',
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  }
}));

const StatIcon = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '2.5rem',
    color: '#fff',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#6f9dff',
  },
}));

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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#6f9dff' }} />
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Users',
      count: stats?.counts?.users || 0,
      icon: <PeopleIcon />,
      progress: 75,
      subtitle: 'Active platform users'
    },
    {
      title: 'News Articles',
      count: stats?.counts?.news || 0,
      icon: <ArticleIcon />,
      progress: 60,
      subtitle: 'Published articles'
    },
    {
      title: 'Projects',
      count: stats?.counts?.projects || 0,
      icon: <CodeIcon />,
      progress: 85,
      subtitle: 'Showcased projects'
    },
    {
      title: 'Tools',
      count: stats?.counts?.tools || 0,
      icon: <BuildIcon />,
      progress: 45,
      subtitle: 'Available tools'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: 600
          }}
        >
          Monitor and manage your platform's performance and content from one central location.
        </Typography>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            border: '1px solid rgba(211, 47, 47, 0.2)'
          }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard>
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <StatIcon>
                  {stat.icon}
                </StatIcon>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 0.5
                  }}
                >
                  {stat.count.toLocaleString()}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 2,
                    opacity: 0.9,
                    fontSize: '0.9rem'
                  }}
                >
                  {stat.subtitle}
                </Typography>
                <ProgressBar 
                  variant="determinate" 
                  value={stat.progress} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 1,
                    opacity: 0.8
                  }}
                >
                  {stat.progress}% Growth
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPanel; 