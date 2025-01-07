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
  Rating,
  IconButton
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
    padding: theme.spacing(4, 2),
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '24px',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  marginBottom: theme.spacing(3),
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90px',
    height: '90px',
    borderRadius: '20px',
    marginBottom: theme.spacing(2),
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
    padding: theme.spacing(2),
    borderRadius: '16px',
  }
}));

const AdminButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
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
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: 'white', 
              mb: 4,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
            onClick={() => navigate('/webstore')}
          >
            Back to Web Store
          </Button>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: { xs: 'center', md: 'flex-start' },
                width: '100%' 
              }}>
                <IconWrapper>
                  <img src={tool.imageUrl || '/default-tool.png'} alt={tool.name} />
                </IconWrapper>
              </Box>

              <Stack 
                direction="row" 
                spacing={2} 
                alignItems="center"
                sx={{ 
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                {isAdmin && (
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mt: { xs: 2, md: 0 }
                  }}>
                    <AdminButton onClick={() => setOpenEditDialog(true)}>
                      <EditIcon />
                    </AdminButton>
                  </Box>
                )}

                <CategoryChip 
                  label={tool.category}
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                />
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  background: 'rgba(0,0,0,0.2)',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Rating
                    value={userRating}
                    onChange={(event, newValue) => handleRating(newValue)}
                    precision={0.5}
                    size={window.innerWidth < 600 ? 'small' : 'medium'}
                    sx={{
                      '& .MuiRating-icon': {
                        color: 'rgba(255, 180, 0, 0.5)',
                      },
                      '& .MuiRating-iconFilled': {
                        color: '#FFB400',
                      },
                      '& .MuiRating-iconHover': {
                        color: '#FFB400',
                      }
                    }}
                  />
                  <Typography sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                    {tool.averageRating || 0} ({tool.ratings?.length || 0})
                  </Typography>
                </Box>

                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ 
                    mt: 3,
                    flexWrap: 'wrap',
                    gap: 1,
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
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
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'stretch', md: 'center' },
                  mt: { xs: 2, md: 0 }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  width: '100%', 
                  justifyContent: { xs: 'center', md: 'flex-end' }
                }}>
                  <ActionButton
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={tool.link}
                    target="_blank"
                    sx={{ 
                      width: { xs: '100%', sm: 'auto', md: '285px' }
                    }}
                  >
                    Visit Tool
                  </ActionButton>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <DetailSection>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                About
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {tool.description}
              </Typography>
            </DetailSection>

            <DetailSection>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Features
              </Typography>
              <Stack spacing={2}>
                {tool.features?.map((feature, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
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
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
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