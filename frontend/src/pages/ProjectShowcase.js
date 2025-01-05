import { useState, useEffect, useCallback } from 'react';
import { styled, Box, Container, Typography, Grid, CircularProgress, TextField, FormControl, Alert, Button, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import ProjectCard from '../components/projects/ProjectCard';
import AddProjectDialog from '../components/projects/AddProjectDialog';
import api from '../services/api';

const ShowcaseSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  position: 'relative',
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
    gap: theme.spacing(1.5),
  }
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
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

const ProjectShowcase = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddProject = async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      setProjects(prev => [response, ...prev]);
      setOpenAddDialog(false);
    } catch (err) {
      console.error('Error adding project:', err);
      setError('Failed to add project');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ShowcaseSection>
      <Container maxWidth="lg">
        <HeaderSection>
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              fontWeight: 800,
              fontSize: { xs: '2.75rem', md: '3.75rem' },
              background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              position: 'relative',
              zIndex: 2
            }}
          >
            Developer Projects
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1.2rem', md: '1.35rem' },
              fontWeight: 400,
              mb: 6,
              position: 'relative',
              zIndex: 2,
              '& strong': {
                color: '#6f9dff',
                fontWeight: 600
              }
            }}
          >
            Explore <strong>innovative projects</strong> and technological solutions built by our community
          </Typography>
        </HeaderSection>

        <FilterContainer>
          <StyledFormControl fullWidth sx={{ flex: 2 }}>
            <TextField
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </StyledFormControl>

          {currentUser && (
            <AddButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Project
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
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: 2
          }}>
            <CircularProgress 
              size={60}
              sx={{ 
                color: '#6f9dff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }}
            />
            <Typography color="text.secondary">Loading projects...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <ProjectCard 
                  project={project} 
                  onUpdate={fetchProjects}
                />
              </Grid>
            ))}
            {filteredProjects.length === 0 && (
              <Box sx={{ 
                width: '100%', 
                mt: 4, 
                textAlign: 'center',
                color: 'text.secondary'
              }}>
                <Typography variant="h6">
                  No projects found
                </Typography>
              </Box>
            )}
          </Grid>
        )}

        <AddProjectDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          onSubmit={handleAddProject}
        />
      </Container>
    </ShowcaseSection>
  );
};

export default ProjectShowcase; 