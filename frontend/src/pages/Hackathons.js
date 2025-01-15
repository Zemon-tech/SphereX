import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  TextField,
  InputAdornment,
  Alert,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import HackathonCard from '../components/hackathons/HackathonCard';
import api from '../services/api';
import CreateHackathonDialog from '../components/hackathons/CreateHackathonDialog';
import EditHackathonDialog from '../components/hackathons/EditHackathonDialog';

const HackathonsSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(circle at 50% 0%, rgba(111, 157, 255, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4, 0, 8),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0, 6),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-100px',
    left: 0,
    right: 0,
    height: '400px',
    background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.1) 0%, transparent 50%)',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #6f9dff 0%, #94b8ff 100%)',
    borderRadius: '4px',
    opacity: 0.7
  }
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  }
}));

const StyledFormControl = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: '#fff',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }
  }
}));

const CategorySelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: '#fff',
  }
}));

const AddButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
  borderRadius: '12px',
  padding: '10px 24px',
  color: '#fff',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    background: 'linear-gradient(135deg, #2c2c44 0%, #1e1e2f 100%)',
  }
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { isAdmin } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hackathons');
      setHackathons(response);
      setError('');
    } catch (err) {
      setError('Failed to fetch hackathons');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHackathons = hackathons.filter(hackathon =>
    hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hackathon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditHackathon = (hackathon) => {
    setSelectedHackathon(hackathon);
    setEditDialogOpen(true);
  };

  const handleDeleteHackathon = async (hackathonId) => {
    try {
      await api.delete(`/hackathons/${hackathonId}`);
      setHackathons(prev => prev.filter(h => h._id !== hackathonId));
    } catch (err) {
      setError('Failed to delete hackathon');
      console.error('Error:', err);
    }
  };

  return (
    <HackathonsSection>
      <Container maxWidth="lg">
        <HeaderSection>
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' },
              background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              position: 'relative',
              zIndex: 2,
              px: { xs: 2, sm: 0 }
            }}
          >
            Hackathons
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.35rem' },
              fontWeight: 400,
              mb: 6,
              position: 'relative',
              zIndex: 2,
              px: { xs: 2, sm: 0 },
              '& strong': {
                color: '#6f9dff',
                fontWeight: 600
              }
            }}
          >
            Discover <strong>exciting challenges</strong> and showcase your skills
          </Typography>
        </HeaderSection>

        <FilterContainer>
          <StyledFormControl 
            fullWidth 
            placeholder="Search hackathons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              flex: { xs: '1 1 100%', md: 2 },
              '& .MuiOutlinedInput-root': { 
                background: 'rgba(255,255,255,0.8)' 
              } 
            }}
          />

          <CategorySelect
            value="All"
            sx={{ 
              width: matches ? '100%' : '180px',
              minWidth: matches ? 'unset' : '180px'
            }}
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Past">Past</MenuItem>
          </CategorySelect>

          {isAdmin && (
            <AddButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{ 
                width: matches ? '100%' : 'auto'
              }}
            >
              Add Hackathon
            </AddButton>
          )}
        </FilterContainer>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: '12px',
              backgroundColor: 'rgba(211, 47, 47, 0.05)',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              '& .MuiAlert-icon': {
                color: 'error.main'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingContainer>
            <CircularProgress 
              size={60} 
              sx={{ 
                color: '#6f9dff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }} 
            />
            <Typography color="text.secondary">Loading hackathons...</Typography>
          </LoadingContainer>
        ) : (
          <Grid container spacing={4}>
            {filteredHackathons.map((hackathon) => (
              <Grid item xs={12} sm={6} md={4} key={hackathon._id}>
                <HackathonCard 
                  hackathon={hackathon} 
                  onEdit={handleEditHackathon}
                  onDelete={handleDeleteHackathon}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <CreateHackathonDialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          onSuccess={() => {
            setCreateDialogOpen(false);
            fetchHackathons();
          }}
        />

        <EditHackathonDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          hackathon={selectedHackathon}
          onSuccess={() => {
            setEditDialogOpen(false);
            fetchHackathons();
          }}
        />
      </Container>
    </HackathonsSection>
  );
};

export default Hackathons; 