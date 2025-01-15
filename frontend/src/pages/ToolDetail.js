import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Launch as LaunchIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import EditToolDialog from '../components/tools/EditToolDialog';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
  color: '#fff',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 0%, rgba(111, 157, 255, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
    '& .hero-content': {
      textAlign: 'center',
      '& .MuiStack-root': {
        justifyContent: 'center'
      },
      '& .tool-name': {
        background: 'linear-gradient(45deg, #fff 30%, #94b8ff 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 12px rgba(0,0,0,0.1)'
      },
      '& .tool-icon': {
        transform: 'scale(1.1)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.15)'
        }
      }
    }
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '24px',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100px',
    height: '100px',
    borderRadius: '20px',
    marginBottom: theme.spacing(3),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
    }
  }
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: '#fff',
  borderRadius: '12px',
  height: 32,
  padding: '0 12px',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontSize: '0.875rem',
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 28,
    '& .MuiChip-label': {
      fontSize: '0.75rem',
      padding: '0 6px',
    }
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  '&.MuiButton-contained': {
    background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #2c2c44 0%, #1e1e2f 100%)',
    }
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 16px',
    fontSize: '0.875rem',
  }
}));

const DetailSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '24px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '16px',
    '& .section-title': {
      fontSize: '1.25rem',
      marginBottom: theme.spacing(2)
    },
    '& .feature-item': {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1.5),
      background: 'rgba(111, 157, 255, 0.04)',
      border: '1px solid',
      borderColor: theme.palette.divider,
      marginBottom: theme.spacing(2)
    }
  }
}));

const InfoCategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(111, 157, 255, 0.08)',
  color: theme.palette.text.primary,
  borderRadius: '12px',
  height: 28,
  border: '1px solid rgba(111, 157, 255, 0.1)',
  transition: 'all 0.3s ease',
  '& .MuiChip-label': {
    padding: '0 12px',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  '&:hover': {
    backgroundColor: 'rgba(111, 157, 255, 0.12)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(111, 157, 255, 0.08)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 24,
    '& .MuiChip-label': {
      fontSize: '0.75rem',
      padding: '0 8px',
    }
  }
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  background: 'rgba(0,0,0,0.2)',
  padding: '6px 16px',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    padding: '12px',
    background: 'rgba(0,0,0,0.25)',
    backdropFilter: 'blur(8px)'
  }
}));

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin, currentUser } = useAuth();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await api.get(`/tools/${id}`);
        setTool(response);
      } catch (error) {
        console.error('Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [id]);

  useEffect(() => {
    if (tool && currentUser) {
      const existingRating = tool.ratings?.find(r => r.userId === currentUser.uid);
      if (existingRating) {
        setUserRating(existingRating.rating);
      }
    }
  }, [tool, currentUser]);

  const handleEdit = async (updatedData) => {
    try {
      const response = await api.put(`/tools/${id}`, updatedData);
      if (response) {
        setTool(response);
        setOpenEditDialog(false);
      }
    } catch (error) {
      console.error('Error updating tool:', error);
    }
  };

  const handleRating = async (newValue) => {
    try {
      const response = await api.post(`/tools/${id}/rate`, { rating: newValue });
      setTool(prev => ({
        ...prev,
        averageRating: response.averageRating,
        ratings: [
          ...(prev.ratings || []).filter(r => r.userId !== currentUser.uid),
          { userId: currentUser.uid, rating: newValue }
        ]
      }));
      setUserRating(newValue);
    } catch (error) {
      console.error('Error rating tool:', error);
    }
  };

  if (loading || !tool) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ 
                color: 'white', 
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                opacity: 0.9,
                '&:hover': {
                  opacity: 1,
                  transform: 'translateX(-4px)'
                }
              }}
              onClick={() => navigate('/webstore')}
            >
              Back to Web Store
            </Button>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Stack 
                  spacing={3} 
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Box className="tool-icon">
                    <IconWrapper>
                      <img 
                        src={tool.imageUrl || '/default-tool.png'} 
                        alt={tool.name}
                        style={{ 
                          filter: 'brightness(1.1) contrast(1.1)'
                        }} 
                      />
                    </IconWrapper>
                  </Box>

                  <Typography
                    variant="h4"
                    className="tool-name"
                    sx={{
                      fontWeight: 800,
                      textAlign: { xs: 'center', md: 'left' },
                      fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
                      letterSpacing: '-0.02em',
                      mb: { xs: 2, md: 3 }
                    }}
                  >
                    {tool.name}
                  </Typography>

                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems="center"
                    width="100%"
                  >
                    <CategoryChip 
                      label={tool.category}
                      sx={{
                        backdropFilter: 'blur(8px)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        '&:hover': {
                          border: '1px solid rgba(255,255,255,0.3)',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.07) 100%)'
                        }
                      }}
                    />
                    <RatingContainer>
                      <Rating
                        value={userRating}
                        onChange={(event, newValue) => handleRating(newValue)}
                        precision={0.5}
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#FFB400'
                          }
                        }}
                      />
                      <Typography 
                        variant="body2"
                        sx={{ 
                          opacity: 0.9,
                          fontWeight: 500
                        }}
                      >
                        {tool.averageRating || 0} ({tool.ratings?.length || 0})
                      </Typography>
                    </RatingContainer>
                  </Stack>

                  <Stack 
                    direction="row" 
                    spacing={1} 
                    flexWrap="wrap"
                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                    sx={{ gap: 1 }}
                  >
                    {tool.tags?.map((tag, index) => (
                      <CategoryChip
                        key={index}
                        label={tag}
                        size="small"
                      />
                    ))}
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  alignItems: { xs: 'stretch', md: 'flex-end' },
                  mt: { xs: 2, md: 0 }
                }}>
                  <ActionButton
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={tool.link}
                    target="_blank"
                    fullWidth
                  >
                    Visit Tool
                  </ActionButton>
                  {isAdmin && (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setOpenEditDialog(true)}
                      fullWidth
                      sx={{
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: '#fff'
                      }}
                    >
                      Edit Tool
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={8}>
            <DetailSection>
              <Typography variant="h5" className="section-title" sx={{ fontWeight: 700, mb: 3 }}>
                About
              </Typography>
              <Typography sx={{ 
                color: 'text.secondary', 
                lineHeight: 1.8,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {tool.description}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant="h5" className="section-title" sx={{ fontWeight: 700, mb: 3 }}>
                Features
              </Typography>
              <Stack spacing={2}>
                {tool.features?.map((feature, index) => (
                  <Box key={index} className="feature-item">
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </DetailSection>

            {tool.previewImages?.length > 0 && (
              <DetailSection>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  Preview
                </Typography>
                <ImageList cols={2} gap={16}>
                  {tool.previewImages.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        loading="lazy"
                        style={{ borderRadius: '12px' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </DetailSection>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <DetailSection>
              <Typography variant="h6" className="section-title" sx={{ fontWeight: 700, mb: 3 }}>
                Information
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <PersonIcon color="primary" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Creator
                    </Typography>
                  </Stack>
                  <Typography>{tool.creator || 'Unknown'}</Typography>
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <CalendarIcon color="primary" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Released
                    </Typography>
                  </Stack>
                  <Typography>
                    {new Date(tool.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    flexWrap="wrap" 
                    gap={1}
                    sx={{
                      '& > *': {
                        margin: '0 !important'
                      }
                    }}
                  >
                    {tool.tags?.map((tag, index) => (
                      <InfoCategoryChip
                        key={index}
                        label={tag}
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DetailSection>
          </Grid>
        </Grid>
      </Container>

      <EditToolDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleEdit}
        tool={tool}
      />
    </>
  );
};

export default ToolDetail; 