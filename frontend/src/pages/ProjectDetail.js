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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '500px',
    marginTop: theme.spacing(-4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    alignItems: 'flex-start',
    paddingTop: theme.spacing(12)
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
  filter: 'brightness(0.7) contrast(1.1)',
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(8, 0),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
    textAlign: 'center',
    '& .MuiStack-root': {
      justifyContent: 'center'
    }
  }
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
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    height: '28px'
  }
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: '#fff',
  padding: '12px',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    width: '40px',
    height: '40px'
  }
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  borderColor: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(8px)',
  padding: '10px 24px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-4px)'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    padding: '8px 16px'
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
  '& .creator-section': {
    background: 'linear-gradient(135deg, rgba(111, 157, 255, 0.05) 0%, rgba(111, 157, 255, 0.02) 100%)',
    borderRadius: '16px',
    padding: theme.spacing(3),
    border: '1px solid rgba(111, 157, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(111, 157, 255, 0.08)',
    }
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '16px'
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
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    top: 'auto',
    right: 'auto',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(0.5),
  }
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
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem'
    }
  }
}));

const CreatorAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: '4px solid rgba(111, 157, 255, 0.1)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  marginRight: theme.spacing(3),
  background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    border: '4px solid rgba(111, 157, 255, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(2)
  }
}));

const SocialLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  backgroundColor: 'rgba(111, 157, 255, 0.05)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(111, 157, 255, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(111, 157, 255, 0.08)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    width: '100%',
    justifyContent: 'center'
  }
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing(1)
  }
}));

const MarkdownContent = styled(Box)({
  '& h1, & h2, & h3, & h4': {
    color: '#1E1E2F',
    fontWeight: 600,
    marginBottom: '16px'
  },
  '& h1': { fontSize: '28px' },
  '& h2': { fontSize: '24px' },
  '& h3': { fontSize: '20px' },
  '& h4': { fontSize: '18px' },
  '& p': {
    fontSize: '16px',
    lineHeight: 1.8,
    color: '#42526E',
    marginBottom: '16px'
  },
  '& ul, & ol': {
    marginBottom: '16px',
    paddingLeft: '24px',
    '& li': {
      color: '#42526E',
      marginBottom: '8px',
      lineHeight: 1.7
    }
  },
  '& code': {
    background: '#F8F9FA',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
    color: '#0052CC'
  },
  '& pre': {
    margin: '16px 0',
    padding: '16px',
    borderRadius: '8px',
    background: '#1E1E2F',
    overflow: 'auto',
    '& code': {
      background: 'transparent',
      padding: 0,
      color: '#fff'
    }
  }
});

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

  const renderMarkdown = (content) => {
    if (!content) return null;
    
    return (
      <MarkdownContent>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </MarkdownContent>
    );
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
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' }
            }}>
              <BackButton
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                onClick={() => navigate('/projects')}
                sx={{ alignSelf: { xs: 'center', md: 'flex-start' }, mb: 3 }}
              >
                Back to Projects
              </BackButton>

              <Typography variant="h1" sx={{ 
                fontWeight: 800,
                mb: 4,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.75rem' },
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '-0.02em',
                textAlign: { xs: 'center', md: 'left' }
              }}>
                {project.title}
              </Typography>

              <ButtonContainer>
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
              </ButtonContainer>

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

              <Stack 
                direction="row" 
                spacing={1.5} 
                flexWrap="wrap" 
                sx={{ 
                  gap: { xs: 1, md: 1.5 },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mt: 2
                }}
              >
                {project.tags?.map((tag, index) => (
                  <TagChip 
                    key={index} 
                    label={tag}
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.9rem' },
                      px: 2,
                      height: { xs: 28, sm: 32 },
                      fontWeight: 500
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </ContentWrapper>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: { xs: 2, md: 4 } }}>
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
              <Paper sx={{ p: 4, borderRadius: '16px' }}>
                {renderMarkdown(project?.description)}
              </Paper>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary'
                }}>
                  Technical Details
                </Typography>
                <Paper sx={{ 
                  p: 4, 
                  borderRadius: '16px',
                  border: '1px solid #E8E8E8',
                  background: '#ffffff'
                }}>
                  {renderMarkdown(project?.content)}
                </Paper>
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

              {creator && (
                <DetailSection>
                  <Typography variant="h6" sx={{ 
                    mb: 3, 
                    fontWeight: 700,
                    color: '#1e1e2f',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    '&::before': {
                      content: '""',
                      width: '4px',
                      height: '24px',
                      background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
                      borderRadius: '4px',
                    }
                  }}>
                    Project Creator
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                  <Box className="creator-section" sx={{ 
                    display: 'flex', 
                    alignItems: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column', md: 'row' }
                  }}>
                    <CreatorAvatar src={creator.profileImage} alt={creator.name}>
                      {creator.name?.charAt(0)}
                    </CreatorAvatar>
                    
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#1e1e2f',
                        mb: 0.5
                      }}>
                        {creator.name}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 3,
                          fontSize: '0.9rem',
                          opacity: 0.8
                        }}
                      >
                        {creator.college} {creator.branch && `• ${creator.branch}`}
                      </Typography>

                      <Stack spacing={1.5}>
                        {creator.linkedinId && (
                          <SocialLink 
                            href={`https://linkedin.com/in/${creator.linkedinId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkedInIcon sx={{ 
                              mr: 1, 
                              color: '#0077b5',
                              fontSize: '1.25rem'
                            }} />
                            LinkedIn Profile
                          </SocialLink>
                        )}
                        
                        {creator.githubId && (
                          <SocialLink 
                            href={`https://github.com/${creator.githubId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitHubIcon sx={{ 
                              mr: 1, 
                              color: '#333',
                              fontSize: '1.25rem'
                            }} />
                            GitHub Profile
                          </SocialLink>
                        )}
                        
                        {creator.instagramId && (
                          <SocialLink 
                            href={`https://instagram.com/${creator.instagramId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <InstagramIcon sx={{ 
                              mr: 1, 
                              color: '#e4405f',
                              fontSize: '1.25rem'
                            }} />
                            Instagram Profile
                          </SocialLink>
                        )}
                        
                        {creator.mobileNumber && (
                          <SocialLink 
                            href={`tel:${creator.mobileNumber}`}
                            component="a"
                          >
                            <PhoneIcon sx={{ 
                              mr: 1, 
                              color: 'text.secondary',
                              fontSize: '1.25rem'
                            }} />
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