import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ProjectCard from '../components/projects/ProjectCard';
import AddProjectDialog from '../components/projects/AddProjectDialog';
import api from '../services/api';

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
      console.log('Submitting project:', projectData);
      const response = await api.post('/projects', projectData);
      console.log('Add project response:', response);
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Project Showcase
        </Typography>
        {currentUser && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Project
          </Button>
        )}
      </Box>

      <TextField
        fullWidth
        label="Search Projects"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProjects.map((project) => (
            <Grid item key={project._id} xs={12} sm={6} md={4}>
              <ProjectCard project={project} onUpdate={fetchProjects} />
            </Grid>
          ))}
          {filteredProjects.length === 0 && (
            <Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
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
  );
};

export default ProjectShowcase; 