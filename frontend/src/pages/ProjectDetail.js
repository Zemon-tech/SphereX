import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Stack,
  Grid
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon 
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import EditProjectDialog from '../components/projects/EditProjectDialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchProjectAndCreator = async () => {
      try {
        const projectData = await api.get(`/projects/${id}`);
        setProject(projectData);
        
        if (projectData.author) {
          const creatorData = await api.get(`/users/${projectData.author}`);
          setCreator(creatorData);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndCreator();
  }, [id]);

  const handleEdit = async (updatedData) => {
    try {
      const response = await api.put(`/projects/${id}`, updatedData);
      setProject(response);
      setOpenEditDialog(false);
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        navigate('/projects');
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Project not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
          sx={{ 
            color: 'text.primary',
            '&:hover': {
              transform: 'translateX(-4px)'
            }
          }}
        >
          Back to Projects
        </Button>

        {isAdmin && (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenEditDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              Edit Project
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ borderRadius: 2 }}
            >
              Delete Project
            </Button>
          </Stack>
        )}
      </Box>

      {project.imageUrl && (
        <Box
          component="img"
          src={project.imageUrl}
          alt={project.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 4,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}
        />
      )}

      <Box sx={{ 
        bgcolor: '#fff',
        borderRadius: 3,
        p: { xs: 2, sm: 4 },
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        mt: 4
      }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.title}
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={project.category}
                color="primary"
                sx={{ 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #6f9dff, #94b8ff)',
                }}
              />
              {project.tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant="outlined"
                  sx={{ 
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(111, 157, 255, 0.08)',
                    }
                  }}
                />
              ))}
            </Box>

            <Typography
              variant="body1"
              sx={{ 
                mb: 4, 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                p: 3,
                bgcolor: 'rgba(111, 157, 255, 0.04)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              {project.description}
            </Typography>

            <Box sx={{ 
              typography: 'body1',
              mt: 6,
              '& h1, & h2, & h3, & h4': {
                color: '#1E1E2F',
                fontWeight: 600,
                mt: 4,
                mb: 2,
                '&::before': {
                  content: '""',
                  display: 'block',
                  width: 40,
                  height: 4,
                  background: 'linear-gradient(90deg, #6f9dff, #94b8ff)',
                  borderRadius: 2,
                  mb: 2
                }
              },
              '& p': {
                mb: 2,
                lineHeight: 1.8
              },
              '& code': {
                background: '#f5f5f5',
                padding: '2px 4px',
                borderRadius: 1
              }
            }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <Box sx={{ 
                        mb: 3, 
                        mt: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </Box>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {project.content}
              </ReactMarkdown>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              position: 'sticky',
              top: 24,
              bgcolor: '#fff',
              borderRadius: 3,
              p: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Project Links
                  </Typography>
                  <Stack spacing={2}>
                    {project.githubUrl && (
                      <Button
                        fullWidth
                        startIcon={<GitHubIcon />}
                        variant="outlined"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          borderRadius: 2,
                          height: 48,
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                      >
                        View Source Code
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        fullWidth
                        startIcon={<LaunchIcon />}
                        variant="contained"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          borderRadius: 2,
                          height: 48,
                          textTransform: 'none',
                          fontSize: '1rem',
                          background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #2c2c44, #94b8ff)',
                          }
                        }}
                      >
                        Live Demo
                      </Button>
                    )}
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Project Info
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(111, 157, 255, 0.04)',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        Created on
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {creator && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Created By
                    </Typography>
                    <Box sx={{ 
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(111, 157, 255, 0.04)',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          component="img"
                          src={creator.profileImage}
                          alt={creator.name}
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {creator.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {creator.college} • {creator.branch}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <EditProjectDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleEdit}
        project={project}
      />
    </Container>
  );
};

export default ProjectDetail; 