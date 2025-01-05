import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Divider,
  Paper,
  Avatar,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import EditProjectDialog from '../components/projects/EditProjectDialog';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '700px',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, rgba(30, 30, 47, 0.9) 0%, rgba(44, 44, 68, 0.85) 100%)',
  marginTop: theme.spacing(-8),
  marginBottom: theme.spacing(8),
  color: '#fff',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(111, 157, 255, 0.1) 0%, rgba(30, 30, 47, 0.2) 100%)',
    zIndex: 1
  }
}));

const ProjectImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  opacity: 0.6,
  zIndex: 0,
  filter: 'none',
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(8, 0),
  width: '100%',
}));

const TagChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  }
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  padding: '12px',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
  }
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderColor: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(8px)',
  padding: '10px 24px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-4px)'
  }
}));

const DetailSection = styled(Paper)(({ theme }) => ({
  borderRadius: '24px',
  padding: theme.spacing(4),
  background: '#fff',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  marginBottom: theme.spacing(4),
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.04)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  }
}));

const AdminActions = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 3,
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const AdminActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  },
  width: 36,
  height: 36,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: 'rgba(111, 157, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(111, 157, 255, 0.1)',
  }
}));

const CreatorAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: '4px solid white',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  marginRight: theme.spacing(3),
}));

const SocialLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(0,0,0,0.04)',
    transform: 'translateY(-2px)',
  }
}));

const parseContent = (content) => {
  const lines = content.split('\n');
  const parsedContent = [];
  
  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    if (trimmedLine.startsWith('### ')) {
      parsedContent.push({
        type: 'subtitle',
        content: trimmedLine.replace('### ', '')
      });
    } else if (trimmedLine.startsWith('## ')) {
      parsedContent.push({
        type: 'title',
        content: trimmedLine.replace('## ', '')
      });
    } else {
      parsedContent.push({
        type: 'paragraph',
        content: trimmedLine
      });
    }
  });

  return parsedContent;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useAuth();
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
        
        // Fetch creator details if project has an author
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="error">
          {error || 'Project not found'}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <HeroSection>
        <ProjectImage src={project.imageUrl || '/default-project.jpg'} alt={project.title} />
        
        <Container maxWidth="lg">
          <ContentWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
              <BackButton
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                onClick={() => navigate('/projects')}
              >
                Back to Projects
              </BackButton>
              
              {(isAdmin || project.author === currentUser?.email) && (
                <AdminActions>
                  <AdminActionButton onClick={() => setOpenEditDialog(true)}>
                    <EditIcon fontSize="small" />
                  </AdminActionButton>
                  <AdminActionButton onClick={handleDelete}>
                    <DeleteIcon fontSize="small" />
                  </AdminActionButton>
                </AdminActions>
              )}
            </Box>
            
            <Typography variant="h1" sx={{ 
              fontWeight: 800,
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              letterSpacing: '-0.02em'
            }}>
              {project.title}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
              {project.githubUrl && (
                <ActionButton
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </ActionButton>
              )}
              {project.demoUrl && (
                <ActionButton
                  component="a"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LaunchIcon />
                </ActionButton>
              )}
            </Stack>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1.5}>
              {project.tags?.map((tag, index) => (
                <TagChip 
                  key={index} 
                  label={tag}
                  sx={{ 
                    fontSize: '0.9rem',
                    px: 2,
                    height: 32,
                    fontWeight: 500
                  }}
                />
              ))}
            </Stack>
          </ContentWrapper>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <DetailSection>
              <Typography variant="h5" sx={{ 
                mb: 4, 
                fontWeight: 700,
                color: '#1e1e2f',
                borderBottom: '2px solid rgba(111, 157, 255, 0.2)',
                pb: 2
              }}>
                Project Overview
              </Typography>
              <Typography variant="body1" sx={{ 
                lineHeight: 2,
                color: 'text.secondary',
                fontSize: '1.1rem',
                mb: 6
              }}>
                {project.description}
              </Typography>

              <Typography variant="h5" sx={{ 
                mb: 4, 
                fontWeight: 700,
                color: '#1e1e2f',
                borderBottom: '2px solid rgba(111, 157, 255, 0.2)',
                pb: 2
              }}>
                Technical Details
              </Typography>
              <Box sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}>
                {parseContent(project.content).map((block, index) => {
                  switch (block.type) {
                    case 'title':
                      return (
                        <Typography
                          key={index}
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#1e1e2f',
                            mt: 4,
                            mb: 2,
                            fontSize: '1.25rem'
                          }}
                        >
                          {block.content}
                        </Typography>
                      );
                    case 'subtitle':
                      return (
                        <Typography
                          key={index}
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: '#2c2c44',
                            mt: 3,
                            mb: 2,
                            fontSize: '1.1rem'
                          }}
                        >
                          {block.content}
                        </Typography>
                      );
                    default:
                      return (
                        <Typography 
                          key={index} 
                          variant="body1" 
                          paragraph 
                          sx={{ 
                            lineHeight: 2,
                            mb: 2,
                            color: 'text.secondary',
                            '&:last-child': {
                              mb: 0
                            }
                          }}
                        >
                          {block.content}
                        </Typography>
                      );
                  }
                })}
              </Box>
            </DetailSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <DetailSection>
                <Typography variant="h6" sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#1e1e2f'
                }}>
                  Project Information
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Stack spacing={3}>
                  <InfoItem>
                    <CategoryIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Category
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </Typography>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <CalendarIcon sx={{ color: 'primary.main', opacity: 0.8 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Created
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  </InfoItem>
                </Stack>
              </DetailSection>

              {/* Creator section moved here */}
              {creator && (
                <DetailSection>
                  <Typography variant="h6" sx={{ 
                    mb: 3, 
                    fontWeight: 700,
                    color: '#1e1e2f'
                  }}>
                    Project Creator
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CreatorAvatar src={creator.profileImage} alt={creator.name}>
                      {creator.name?.charAt(0)}
                    </CreatorAvatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {creator.name}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {creator.college} {creator.branch && `• ${creator.branch}`}
                      </Typography>

                      <Stack spacing={1.5}>
                        {creator.linkedinId && (
                          <SocialLink 
                            href={`https://linkedin.com/in/${creator.linkedinId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkedInIcon sx={{ mr: 1, color: '#0077b5' }} />
                            LinkedIn Profile
                          </SocialLink>
                        )}
                        
                        {creator.githubId && (
                          <SocialLink 
                            href={`https://github.com/${creator.githubId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitHubIcon sx={{ mr: 1, color: '#333' }} />
                            GitHub Profile
                          </SocialLink>
                        )}
                        
                        {creator.instagramId && (
                          <SocialLink 
                            href={`https://instagram.com/${creator.instagramId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <InstagramIcon sx={{ mr: 1, color: '#e4405f' }} />
                            Instagram Profile
                          </SocialLink>
                        )}
                        
                        {creator.mobileNumber && (
                          <SocialLink 
                            href={`tel:${creator.mobileNumber}`}
                            component="a"
                          >
                            <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            Contact Creator
                          </SocialLink>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                </DetailSection>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <EditProjectDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleEdit}
        project={project}
      />
    </>
  );
};

export default ProjectDetail; 