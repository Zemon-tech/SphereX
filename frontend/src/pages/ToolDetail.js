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
  Book as BookIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import EditToolDialog from '../components/tools/EditToolDialog';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(135deg, rgba(30, 30, 47, 0.95) 0%, rgba(44, 44, 68, 0.95) 100%)',
  padding: theme.spacing(8, 0),
  marginTop: theme.spacing(-6),
  color: '#fff',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(111, 157, 255, 0.1), transparent 70%)',
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
  }
}));

const DetailSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '24px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
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
            sx={{ color: 'white', mb: 4 }}
            onClick={() => navigate('/webstore')}
          >
            Back to Web Store
          </Button>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2.5}>
              <IconWrapper>
                <img src={tool.imageUrl || '/default-tool.png'} alt={tool.name} />
              </IconWrapper>
            </Grid>
            <Grid item xs={12} md={6.5}>
              <Stack spacing={2}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em'
                }}>
                  {tool.name}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={tool.category}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '8px',
                      height: '32px'
                    }}
                  />
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    background: 'rgba(0,0,0,0.2)',
                    padding: '6px 16px',
                    borderRadius: '8px'
                  }}>
                    <Rating
                      value={userRating}
                      onChange={(event, newValue) => handleRating(newValue)}
                      precision={0.5}
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
                    <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      {tool.averageRating || 0} ({tool.ratings?.length || 0})
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack spacing={2} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                {tool.link && (
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                    <ActionButton
                      variant="contained"
                      startIcon={<LaunchIcon />}
                      href={tool.link}
                      target="_blank"
                      sx={{ 
                        width: { xs: '100%', md: '285px' }
                      }}
                    >
                      Visit Tool
                    </ActionButton>
                  </Box>
                )}
                <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
                  <ActionButton
                    variant="outlined"
                    startIcon={<BookIcon />}
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.3)',
                      flex: 1,
                      maxWidth: 140,
                      padding: '8px 16px',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                    href={tool.link ? `${tool.link}/docs` : '#'}
                    target="_blank"
                  >
                    Dev Docs
                  </ActionButton>
                  {isAdmin && (
                    <ActionButton
                      startIcon={<EditIcon />}
                      variant="outlined"
                      onClick={() => setOpenEditDialog(true)}
                      sx={{ 
                        color: 'white', 
                        borderColor: 'rgba(255,255,255,0.3)',
                        width: 140,
                        padding: '8px 16px',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      Edit
                    </ActionButton>
                  )}
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
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {tool.tags?.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
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