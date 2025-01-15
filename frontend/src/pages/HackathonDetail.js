import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack,
  LocationOn,
  People,
  Instagram,
  Twitter,
  LinkedIn,
  GitHub,
  Facebook,
  YouTube,
  Language,
  Code,
  Lightbulb,
  Settings,
  Star,
  NetworkCheck,
  CardGiftcard,
  School,
  EmailOutlined,
  Phone,
  CalendarToday,
} from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const fadeInUp = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const style = document.createElement('style');
style.innerHTML = fadeInUp;
document.head.appendChild(style);

const StatusChip = styled(Chip)(({ status, theme }) => ({
  fontWeight: 600,
  fontSize: { xs: '0.85rem', sm: '0.9rem' },
  padding: theme.spacing(1, 2),
  height: 'auto',
  ...(status === 'upcoming' && {
    background: 'linear-gradient(45deg, #4caf50, #81c784)',
    color: '#fff',
  }),
  ...(status === 'ongoing' && {
    background: 'linear-gradient(45deg, #ff9800, #ffb74d)',
    color: '#fff',
  }),
  ...(status === 'ended' && {
    background: 'linear-gradient(45deg, #f44336, #e57373)',
    color: '#fff',
  }),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
  color: '#fff',
  padding: theme.spacing(6, 0, 12),
  position: 'relative',
  borderRadius: '0 0 60px 60px',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/path/to/pattern.svg")',
    opacity: 0.1,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0, 8),
    borderRadius: '0 0 40px 40px',
  },
}));

const DetailContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: theme.spacing(0, 3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  }
}));

const FloatingCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: theme.spacing(4),
  padding: theme.spacing(4),
  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
  position: 'relative',
  zIndex: 2,
  marginTop: theme.spacing(-8),
  border: '1px solid rgba(0,0,0,0.08)',
  backdropFilter: 'blur(20px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    marginTop: theme.spacing(-6),
    borderRadius: theme.spacing(3),
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.75rem',
    marginBottom: theme.spacing(4),
    position: 'relative',
  color: '#1a237e',
    '&::after': {
      content: '""',
      position: 'absolute',
    bottom: -8,
      left: 0,
    width: 60,
    height: 3,
    background: 'linear-gradient(90deg, #1a237e, #3949ab)',
    borderRadius: 3,
  },
  [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      marginBottom: theme.spacing(3),
  }
}));

const ContentCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: theme.spacing(2.5),
  border: '1px solid',
  borderColor: theme.palette.divider,
  height: '100%',
  transition: 'all 0.3s ease',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    borderColor: theme.palette.primary.main,
    zIndex: 2,
  }
}));

const ThemeCard = styled(ContentCard)(({ theme }) => ({
  background: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  margin: theme.spacing(1),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #6f9dff, #94b8ff)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    '&::before': {
      opacity: 1,
    },
    '& .theme-icon': {
      background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
      color: '#fff',
      transform: 'scale(1.1)',
    }
  }
}));

const PrizeCard = styled(Box)(({ theme, color }) => ({
  background: '#fff',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2.5),
  minHeight: '220px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: color,
    borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 50% 50%`,
    opacity: 0.1,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    borderColor: color,
    '& .prize-icon': {
      transform: 'scale(1.1) rotate(10deg)',
      background: color,
      color: '#fff',
    }
  }
}));

const EligibilityCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2.5),
  minHeight: { xs: '120px', sm: '140px' },
  display: 'flex',
  alignItems: 'flex-start',
  gap: { xs: 2, sm: 2.5 },
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(111, 157, 255, 0.08) 0%, transparent 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateX(8px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    borderColor: theme.palette.primary.main,
    '&::before': {
      opacity: 1,
    },
    '& .eligibility-number': {
      transform: 'scale(1.1)',
      background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
      color: '#fff',
      borderColor: 'transparent',
    }
  }
}));

const getSocialIcon = (platform) => {
  const platformName = platform.toLowerCase();
  
  switch (platformName) {
    case 'instagram':
      return <Instagram />;
    case 'twitter':
      return <Twitter />;
    case 'linkedin':
      return <LinkedIn />;
    case 'github':
      return <GitHub />;
    case 'facebook':
      return <Facebook />;
    case 'youtube':
      return <YouTube />;
    default:
      return <Language />;
  }
};

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (currentUser && hackathon?._id) {
        try {
          const response = await api.get(`/hackathons/${hackathon._id}/registration-status/${currentUser.uid}`);
          setHasRegistered(response.hasRegistered);
        } catch (error) {
          console.error('Error checking registration status:', error);
        }
      }
    };

    checkRegistrationStatus();
  }, [currentUser, hackathon?._id]);

  const handleRegisterClick = async () => {
    try {
      if (!currentUser) {
        navigate('/login', { 
          state: { from: `/hackathons/${id}` },
          replace: true 
        });
        return;
      }

      if (hasRegistered) {
        window.open(hackathon.registrationLink, '_blank', 'noopener,noreferrer');
        return;
      }

      await api.post(`/hackathons/${hackathon._id}/register-click`, {
        userId: currentUser.uid
      });
      
      setHasRegistered(true);
      window.open(hackathon.registrationLink, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error tracking registration click:', error);
    }
  };

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/hackathons/${id}`);
        setHackathon(response);
        setError('');
      } catch (err) {
        setError('Failed to fetch hackathon details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathonDetails();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
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

  if (!hackathon) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Hackathon not found</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ background: '#f8f9fa', minHeight: '100vh', pb: 10 }}>
      <HeroSection>
        <DetailContainer>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/hackathons')}
              sx={{
                color: '#fff',
                fontSize: { xs: '0.85rem', sm: '1rem' },
                py: { xs: 1, sm: 2 },
                px: { xs: 1.5, sm: 3 },
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              mb: 6,
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 5,
                  '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
                },
                '&:hover': { 
                background: 'rgba(255,255,255,0.25)',
                transform: 'translateX(-4px)',
                }
              }}
            >
              Back to Hackathons
            </Button>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' }, 
                mb: { xs: 4, md: 0 },
                pl: { md: 6 },
                pr: { xs: 2, md: 4 },
              }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 3,
                    background: 'linear-gradient(45deg, #fff 30%, rgba(255,255,255,0.8) 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    maxWidth: { md: '95%' },
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {hackathon.title}
                </Typography>
                
                <Stack 
                  direction="row" 
                  spacing={2} 
                  sx={{ 
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mb: 4,
                    flexWrap: 'wrap', 
                    gap: 2 
                  }}
                >
                  <StatusChip 
                    label={hackathon.status} 
                    status={hackathon.status} 
                    sx={{ 
                      backdropFilter: 'blur(10px)', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }} 
                  />
                  <Typography 
                    sx={{ 
                      background: 'rgba(255,255,255,0.15)',
                      py: 1, 
                      px: 2, 
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: { xs: '0.9rem', sm: '1rem' } 
                    }}
                  >
                    {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                  </Typography>
                </Stack>

                    <Button
                      variant="contained"
                      onClick={handleRegisterClick}
                      disabled={!hackathon.registrationLink || hackathon.status === 'ended'}
                      sx={{
                    py: { xs: 1.5, sm: 2.5 },
                    px: { xs: 3, sm: 6 },
                    borderRadius: '16px',
                    background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                        fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(33, 150, 243, 0.3)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        width: { xs: '100%', sm: 'auto' },
                    minHeight: { xs: '40px', sm: '48px' },
                    position: 'relative',
                    zIndex: 5,
                        '&:hover': {
                      background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                          transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(33, 150, 243, 0.4)',
                    }
                  }}
                >
                        {!currentUser ? 'Login to Register' :
                         hasRegistered ? 'Go to Registration Page' :
                         hackathon.status === 'ended' ? 'Registration Closed' : 
                         'Register Now'}
                    </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}>
              <Box
                component="img"
                src={hackathon.imageUrl}
                alt={hackathon.title}
                sx={{
                  width: '100%',
                    maxWidth: { xs: '100%', md: '90%' },
                    height: { xs: '280px', sm: '320px', md: '380px' },
                    objectFit: 'contain',
                  objectPosition: 'center',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  border: '4px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    mx: 'auto',
                    display: 'block',
                  '&:hover': {
                      transform: 'scale(1.02) translateY(-8px)',
                      boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
                  }
                }}
              />
              </Box>
            </Grid>
          </Grid>
        </DetailContainer>
      </HeroSection>

      <DetailContainer>
        <FloatingCard>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={3}>
                    <Box sx={{ 
                position: 'sticky', 
                top: 24,
                background: '#f8f9fa',
                borderRadius: '20px',
                p: 3,
                border: '1px solid rgba(0,0,0,0.08)'
              }}>
                <SectionTitle variant="h6" sx={{ fontSize: '1.25rem', mb: 3 }}>
                  Key Details
                </SectionTitle>
                
                <Stack spacing={3}>
                  <InfoCard
                    icon={<LocationOn />}
                    title="Location"
                    content={hackathon.location}
                  />
                  
                  <InfoCard
                    icon={<People />}
                    title="Participants"
                    content={`Max ${hackathon.maxParticipants} participants`}
                  />
                  
                  <InfoCard
                    icon={<CalendarToday />}
                    title="Date"
                    content={`${new Date(hackathon.startDate).toLocaleDateString()} - ${new Date(hackathon.endDate).toLocaleDateString()}`}
                  />
              </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} lg={9}>
              <Stack spacing={6}>
                <Section title="About this Hackathon">
                  <Typography sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.secondary'
                  }}>
                    {hackathon.description}
                  </Typography>
                </Section>

                {/* Themes Section */}
                {hackathon.themes?.length > 0 && (
                  <Section title="Themes">
                    <Grid 
                      container 
                      spacing={3}
                      alignItems="stretch"
                      sx={{ 
                        mt: 1,
                        '& .MuiGrid-item': {
                          display: 'flex',
                          '& > *': {
                            flex: 1,
                          }
                        }
                      }}
                    >
                      {hackathon.themes.map((theme, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <ThemeCard>
                            <Box
                              className="theme-icon"
                              sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, rgba(111, 157, 255, 0.1) 0%, rgba(111, 157, 255, 0.05) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main',
                                transition: 'all 0.3s ease',
                                mb: 3,
                                flexShrink: 0,
                                border: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              {index === 0 ? <Code sx={{ fontSize: 28 }} /> :
                               index === 1 ? <Settings sx={{ fontSize: 28 }} /> :
                               index === 2 ? <Star sx={{ fontSize: 28 }} /> :
                               <Lightbulb sx={{ fontSize: 28 }} />}
                            </Box>
                            <Box 
                              sx={{ 
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color: '#1e1e2f',
                                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                  lineHeight: 1.3,
                                }}
                              >
                                {theme.name}
                              </Typography>
                              {theme.description && (
                                <Typography
                                  color="text.secondary"
                                  sx={{
                                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                    lineHeight: 1.7,
                                    flex: 1,
                                    opacity: 0.85,
                                  }}
                                >
                                  {theme.description}
                                </Typography>
                              )}
                            </Box>
                          </ThemeCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Section>
                )}

                {/* Prizes Section */}
                {hackathon.prizes?.length > 0 && (
                  <Section title="Prizes & Rewards">
                    <Grid container spacing={3}>
                      {hackathon.prizes.map((prize, index) => {
                        const colors = {
                          0: '#FFD700',  // Gold
                          1: '#C0C0C0',  // Silver
                          2: '#CD7F32',  // Bronze
                        };
                        
                        return (
                          <Grid item xs={12} sm={12} md={4} key={index}>
                            <PrizeCard 
                              color={colors[index] || '#6f9dff'}
                              sx={{
                                minHeight: { xs: '180px', sm: '220px' },
                                p: { xs: 2, sm: 2.5 },
                              }}
                            >
                              <Box
                                className="prize-icon"
                                sx={{
                                  width: { xs: 48, sm: 60 },
                                  height: { xs: 48, sm: 60 },
                                  borderRadius: '20px',
                                  background: `${colors[index]}15` || 'rgba(111, 157, 255, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mb: 2,
                                  transition: 'all 0.3s ease',
                                  color: colors[index] || '#6f9dff',
                                  position: 'relative',
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: -2,
                                    borderRadius: 'inherit',
                                    border: '2px solid',
                                    borderColor: 'currentColor',
                                    opacity: 0.2,
                                  }
                                }}
                              >
                                <Typography 
                                  variant="h3" 
                                  sx={{ 
                                    fontWeight: 800,
                                    fontFamily: 'monospace',
                                    fontSize: { xs: '1.5rem', sm: '2rem' },
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                                  }}
                                >
                                  {index + 1}
                                </Typography>
                              </Box>

                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 700,
                                  mb: 1,
                                  color: colors[index] || '#6f9dff',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px',
                                  fontSize: { xs: '0.85rem', sm: '1rem' }
                                }}
                              >
                                {prize.position}
                              </Typography>

                              <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: 800,
                                  mb: 2,
                                  color: '#1e1e2f',
                                  fontSize: '1.5rem',
                                  lineHeight: 1.2
                                }}
                              >
                                {prize.prize}
                              </Typography>

                              <Typography
                                color="text.secondary"
                                sx={{
                                  lineHeight: 1.7,
                                  fontSize: '0.9rem',
                                  flex: 1,
                                  opacity: 0.8,
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {prize.description}
                              </Typography>

                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 20,
                                  right: 20,
                                  width: 32,
                                  height: 32,
                                  borderRadius: '12px',
                                  background: 'rgba(255,255,255,0.9)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  backdropFilter: 'blur(8px)',
                                  border: '1px solid',
                                  borderColor: 'divider',
                                }}
                              >
                                <Star sx={{ 
                                  color: colors[index] || '#6f9dff',
                                  fontSize: 20
                                }} />
                              </Box>
                            </PrizeCard>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Section>
                )}

                {/* Eligibility Section */}
                {hackathon.eligibility?.length > 0 && (
                  <Section title="Eligibility Criteria">
                    <Grid container spacing={3}>
                      {hackathon.eligibility.map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <EligibilityCard
                            sx={{
                              minHeight: { xs: '120px', sm: '140px' },
                              p: { xs: 2, sm: 2.5 },
                              gap: { xs: 2, sm: 2.5 },
                            }}
                          >
                            <Box
                              className="eligibility-number"
                              sx={{
                                width: { xs: 40, sm: 48 },
                                height: { xs: 40, sm: 48 },
                                borderRadius: '14px',
                                background: 'transparent',
                                border: '2px solid',
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                flexShrink: 0,
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                fontFamily: 'monospace',
                                '&::after': {
                                  content: '""',
                                  position: 'absolute',
                                  inset: -4,
                                  borderRadius: 'inherit',
                                  border: '1px solid',
                                  borderColor: 'primary.main',
                                  opacity: 0.2,
                                }
                              }}
                            >
                              {(index + 1).toString().padStart(2, '0')}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                sx={{
                                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                                  lineHeight: 1.6,
                                  color: '#1e1e2f',
                                  fontWeight: 500,
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {item.criteria}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ 
                                  mt: 1,
                                  opacity: 0.8,
                                  fontSize: '0.85rem',
                                  overflow: 'hidden',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                Make sure you meet this requirement before applying
                              </Typography>
                            </Box>
                          </EligibilityCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Section>
                )}

                {/* Perks Section */}
                {hackathon.perks?.length > 0 && (
                  <Section title="Perks & Benefits">
                    <Box sx={{ mb: 6 }}>
                    <Grid 
                      container 
                      spacing={3}
                      sx={{
                        '& .MuiGrid-item': {
                          display: 'flex',
                          }
                      }}
                    >
                      {hackathon.perks.map((perk, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                            sx={{
                              background: '#fff',
                                p: { xs: 3, md: 4 },
                                borderRadius: '16px',
                              border: '1px solid',
                              borderColor: 'divider',
                              display: 'flex',
                              flexDirection: 'column',
                                gap: 2.5,
                              width: '100%',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                  boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                                borderColor: 'primary.main',
                                  zIndex: 2,
                              }
                            }}
                          >
                            <Box
                              sx={{
                                  width: 56,
                                  height: 56,
                                borderRadius: '14px',
                                  background: 'rgba(111, 157, 255, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main',
                              }}
                            >
                                {index === 0 ? <NetworkCheck sx={{ fontSize: 28 }} /> :
                                 index === 1 ? <CardGiftcard sx={{ fontSize: 28 }} /> :
                                 <School sx={{ fontSize: 28 }} />}
                            </Box>
                            <Typography 
                              variant="h6" 
                              sx={{
                                  fontWeight: 600,
                                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                color: '#1e1e2f',
                              }}
                            >
                              {perk.title}
                            </Typography>
                            <Typography 
                              sx={{ 
                                  color: 'text.secondary',
                                  fontSize: '0.95rem',
                                lineHeight: 1.7,
                              }}
                            >
                              {perk.description}
                            </Typography>
                            </Box>
                        </Grid>
                      ))}
                    </Grid>
                    </Box>
                  </Section>
                )}

                {/* Sponsors Section */}
                {hackathon.sponsors?.length > 0 && (
                  <Section title="Our Sponsors">
                    <Grid 
                      container 
                      spacing={4}
                      sx={{
                        mb: 6,
                        position: 'relative',
                        '& .MuiGrid-item': {
                          display: 'flex',
                          }
                      }}
                    >
                      {hackathon.sponsors.map((sponsor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box
                            sx={{
                              background: '#fff',
                              p: { xs: 4, sm: 5 },
                              borderRadius: '20px',
                              border: '1px solid',
                              borderColor: 'divider',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              minHeight: '300px',
                              position: 'relative',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                                borderColor: 'primary.main',
                              }
                            }}
                          >
                            <Box
                              sx={{
                                width: '100%',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                            }}
                          >
                            <Box
                              component="img"
                              src={sponsor.logo}
                              alt={sponsor.name}
                              sx={{
                                width: '100%',
                                  maxWidth: '200px',
                                  height: '100px',
                                objectFit: 'contain',
                                  mb: 3,
                                transition: 'transform 0.3s ease',
                              }}
                            />
                            <Typography 
                              variant="h6"
                              sx={{ 
                                fontWeight: 600,
                                  fontSize: { xs: '1.25rem', sm: '1.35rem' },
                                color: '#1e1e2f',
                                  textAlign: 'center',
                              }}
                            >
                              {sponsor.name}
                            </Typography>
                            </Box>
                            
                            <Button
                              variant="outlined"
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                width: '100%',
                                borderRadius: '12px',
                                py: 1.5,
                                px: 3,
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                borderColor: 'divider',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  background: 'rgba(111, 157, 255, 0.04)',
                                }
                              }}
                            >
                              Visit Website
                            </Button>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Section>
                )}

                {/* Contact Section */}
                {hackathon.contact?.length > 0 && (
                  <Section title="Contact Information">
                    <Grid 
                      container 
                      spacing={4}
                      sx={{ mb: 6 }}
                    >
                      {hackathon.contact.map((contact, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          <Box
                            sx={{
                              background: '#fff',
                              p: { xs: 3, sm: 4 },
                              borderRadius: '24px',
                              border: '1px solid',
                              borderColor: 'divider',
                              height: '100%',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                                borderColor: 'primary.main',
                              }
                            }}
                          >
                            {/* Contact Header */}
                            <Box sx={{ mb: 4 }}>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 700,
                                  color: '#1e1e2f',
                                  mb: 1,
                                  fontSize: { xs: '1.35rem', sm: '1.5rem' },
                                }}
                              >
                                {contact.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: 'text.secondary',
                                  fontSize: { xs: '1rem', sm: '1.1rem' },
                                  fontWeight: 500,
                                }}
                              >
                                {contact.role}
                              </Typography>
                            </Box>
                            
                            {/* Contact Info */}
                            <Stack spacing={3}>
                              {/* Email Box */}
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 3,
                                  p: { xs: 2.5, sm: 3 },
                                  borderRadius: '16px',
                                  background: 'rgba(111, 157, 255, 0.04)',
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: 'rgba(111, 157, 255, 0.08)',
                                    borderColor: 'primary.main',
                                    transform: 'translateX(4px)',
                                  }
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: '14px',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    flexShrink: 0,
                                  }}
                                >
                                  <EmailOutlined sx={{ color: 'primary.main', fontSize: 24 }} />
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 0.5, fontSize: '0.9rem' }}
                                  >
                                    Email
                                  </Typography>
                                  <Typography
                                    component="a"
                                    href={`mailto:${contact.email}`}
                                    sx={{
                                      color: '#1e1e2f',
                                      textDecoration: 'none',
                                      fontWeight: 500,
                                      fontSize: '1rem',
                                      display: 'block',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      '&:hover': {
                                        color: 'primary.main',
                                      }
                                    }}
                                  >
                                    {contact.email}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Phone Box - Similar styling updates for phone */}
                              {contact.phone && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    p: { xs: 2.5, sm: 3 },
                                    borderRadius: '16px',
                                    background: 'rgba(111, 157, 255, 0.04)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      background: 'rgba(111, 157, 255, 0.08)',
                                      borderColor: 'primary.main',
                                      transform: 'translateX(4px)',
                                    }
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 48,
                                      height: 48,
                                      borderRadius: '12px',
                                      background: '#fff',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    }}
                                  >
                                    <Phone sx={{ color: 'primary.main', fontSize: 24 }} />
                                  </Box>
                                  <Box sx={{ flex: 1 }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mb: 0.5, fontSize: '0.9rem' }}
                                    >
                                      Phone
                                    </Typography>
                                    <Typography
                                      component="a"
                                      href={`tel:${contact.phone}`}
                                      sx={{
                                        color: '#1e1e2f',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        fontSize: '1rem',
                                        '&:hover': {
                                          color: 'primary.main',
                                        }
                                      }}
                                    >
                                      {contact.phone}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                            </Stack>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Section>
                )}

                {/* Social Media Section */}
                {hackathon.socialMedia?.length > 0 && (
                  <Section title="Connect With Us">
                    <Grid container spacing={3}>
                      {hackathon.socialMedia.map((social, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Button
                            variant="outlined"
                            fullWidth
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={getSocialIcon(social.platform)}
                            sx={{
                              height: { xs: 40, sm: 56 },
                              borderRadius: '12px',
                              textTransform: 'none',
                              fontSize: { xs: '0.8rem', sm: '0.95rem' },
                              fontWeight: 500,
                              borderColor: 'divider',
                              color: '#1e1e2f',
                              px: { xs: 1.5, sm: 3 },
                              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                              transition: 'all 0.3s ease',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: 'flex',
                              alignItems: 'center',
                              '& .MuiButton-startIcon': {
                                marginRight: { xs: 0.5, sm: 1 },
                                flexShrink: 0,
                                '& .MuiSvgIcon-root': {
                                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                                }
                              },
                              '& .MuiButton-endIcon': {
                                marginLeft: 'auto',
                                flexShrink: 0,
                              },
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                background: '#fff',
                                borderColor: 'primary.main',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                '& .MuiSvgIcon-root': {
                                  color: 'primary.main',
                                }
                              }
                            }}
                          >
                            {social.platform}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Section>
                )}

                {/* No Data Message */}
                {!hackathon.themes?.length && 
                 !hackathon.eligibility?.length && 
                 !hackathon.prizes?.length && 
                 !hackathon.sponsors?.length && 
                 !hackathon.socialMedia?.length && (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      px: 3,
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
                      borderRadius: 2,
                      border: '1px dashed',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="h5" gutterBottom color="text.primary" fontWeight={600}>
                      Additional Information Coming Soon
                    </Typography>
                    <Typography color="text.secondary">
                      Stay tuned for more details about this hackathon.
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
          </Grid>
        </FloatingCard>
      </DetailContainer>
    </Box>
  );
};

const InfoCard = ({ icon, title, content }) => (
  <Box sx={{ 
    display: 'flex', 
    gap: 2,
    alignItems: 'flex-start'
  }}>
    <Box sx={{
      width: 44,
      height: 44,
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
      border: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'primary.main'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" fontWeight={500}>
        {content}
      </Typography>
    </Box>
  </Box>
);

const Section = ({ title, children }) => (
  <Box>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </Box>
);

export default HackathonDetail; 