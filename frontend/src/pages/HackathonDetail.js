import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Grid,
  Paper,
  Stack,
  Avatar,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday,
  LocationOn,
  People,
  Email,
  Link as LinkIcon,
  EmojiEvents,
  School,
  Business as BusinessIcon,
  CheckCircle,
  Phone
} from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(8),
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  },
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4.5),
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  background: '#fff',
  height: 'auto',
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 !important',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4.5),
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(2),
  background: '#fff',
  transition: 'all 0.3s ease',
  marginBottom: theme.spacing(4),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StatusChip = styled(Chip)(({ status, theme }) => ({
  fontWeight: 600,
  ...(status === 'upcoming' && {
    backgroundColor: theme.palette.success.main,
      color: '#fff',
  }),
  ...(status === 'ongoing' && {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  }),
  ...(status === 'ended' && {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
  }),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  marginBottom: theme.spacing(5),
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: theme.palette.text.primary,
  '& .MuiSvgIcon-root': {
    fontSize: '1.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4),
  },
}));

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const [hasRegistered, setHasRegistered] = useState(false);
  const matchesXS = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const controller = new AbortController();

    const fetchHackathonDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/hackathons/${id}`, {
          signal: controller.signal
        });
        setHackathon(response);
        setError('');
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Failed to fetch hackathon details');
          console.error('Error:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHackathonDetails();
    return () => controller.abort();
  }, [id]);

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

      if (!hackathon?._id) {
        setError('Invalid hackathon data');
        return;
      }

      if (hasRegistered) {
        if (!hackathon.registrationLink) {
          setError('Registration link not available');
          return;
        }
        window.open(hackathon.registrationLink, '_blank', 'noopener,noreferrer');
        return;
      }

      await api.post(`/hackathons/${hackathon._id}/register-click`, {
        userId: currentUser.uid
      });
      
      setHasRegistered(true);
      
      if (hackathon.registrationLink) {
      window.open(hackathon.registrationLink, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error tracking registration click:', error);
      setError('Failed to process registration. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Alert severity="error">{error}</Alert>
      </StyledContainer>
    );
  }

  if (!hackathon) {
    return (
      <StyledContainer>
        <Alert severity="info">Hackathon not found</Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
            <Button
        startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/hackathons')}
        sx={{ mb: 3 }}
            >
              Back to Hackathons
            </Button>

      <Box
        component="img"
        src={hackathon.imageUrl}
        alt={hackathon.title}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/1200x400?text=Hackathon';
          e.target.onerror = null;
        }}
                  sx={{ 
          width: '100%',
          height: { xs: 200, sm: 300, md: 400 },
          objectFit: 'cover',
          borderRadius: { xs: 1.5, sm: 2 },
          mb: { xs: 2, sm: 3, md: 4 },
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />

      <StyledCard 
        elevation={0} 
                  sx={{ 
                    mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1, width: '100%' }}>
                    <Button
                      variant="contained"
            fullWidth
            size="large"
                      onClick={handleRegisterClick}
                      disabled={!hackathon.registrationLink || hackathon.status === 'ended'}
                      sx={{
              py: { xs: 1.25, sm: 1.5 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: { xs: 1.5, sm: 2 },
                    textTransform: 'none',
              boxShadow: 2,
                        '&:hover': {
                boxShadow: 4,
                    }
                  }}
                >
                        {!currentUser ? 'Login to Register' :
                         hasRegistered ? 'Go to Registration Page' :
                         hackathon.status === 'ended' ? 'Registration Closed' : 
                         'Register Now'}
                    </Button>
              </Box>

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          sx={{ 
            flex: 2,
                width: '100%',
            justifyContent: 'space-around'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn color="primary" />
            <Typography>{hackathon.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <People color="primary" />
            <Typography>Max {hackathon.maxParticipants} participants</Typography>
          </Box>
          {hackathon.registrationLink && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkIcon color="primary" />
              <Typography>Registration available</Typography>
            </Box>
          )}
        </Stack>
      </StyledCard>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Stack 
            spacing={6}
            sx={{
              width: '100%',
              '& > *': {
                width: '100%',
                margin: '0 !important',
              }
            }}
          >
            <StyledCard elevation={0}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: { xs: 1.3, sm: 1.2 },
                  mb: 3,
                }}
              >
                {hackathon.title}
              </Typography>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mb: 3 }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
              >
                <StatusChip label={hackathon.status} status={hackathon.status} />
                <Chip 
                    icon={<CalendarToday />}
                  label={`${new Date(hackathon.startDate).toLocaleDateString()} - ${new Date(hackathon.endDate).toLocaleDateString()}`}
                  sx={{ height: 32 }}
                  />
              </Stack>

              <Typography 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                    fontSize: '1.1rem',
                  lineHeight: 1.7,
                }}
              >
                    {hackathon.description}
                  </Typography>
            </StyledCard>

                {hackathon.themes?.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <SectionTitle>
                  <School />
                  Themes
                </SectionTitle>
                <Grid container spacing={3}>
                  {hackathon.themes.map((theme, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ContentBox>
                        <Typography
                          variant="h6" 
                          gutterBottom
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 600,
                            mb: 2
                          }}
                        >
                          {theme.name}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {theme.description}
                        </Typography>
                      </ContentBox>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {hackathon.eligibility?.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <SectionTitle>
                  <CheckCircle />
                  Eligibility Criteria
                </SectionTitle>
                <Stack spacing={3}>
                  {hackathon.eligibility.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        gap: 3,
                        p: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: '1rem',
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          flex: 1,
                          lineHeight: 1.7,
                          pt: 0.5
                        }}
                      >
                        {item.criteria}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {hackathon.prizes?.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <SectionTitle>
                  <EmojiEvents />
                  Prizes
                </SectionTitle>
                <Grid container spacing={3}>
                  {hackathon.prizes.map((prize, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ContentBox>
                                <Typography
                            variant="subtitle1" 
                            fontWeight={700}
                            color="primary.main"
                            gutterBottom
                          >
                            {prize.position}
                                </Typography>
                                <Typography
                            variant="h5" 
                            gutterBottom
                            sx={{ fontWeight: 700 }}
                          >
                            {prize.prize}
                                </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {prize.description}
                          </Typography>
                        </ContentBox>
                          </Grid>
                        ))}
                      </Grid>
                </Box>
              )}

                {hackathon.perks?.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <SectionTitle>
                  <EmojiEvents />
                  Perks & Benefits
                </SectionTitle>
                    <Grid container spacing={3}>
                      {hackathon.perks.map((perk, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ContentBox>
                            <Typography 
                          variant="subtitle1" 
                          fontWeight={600} 
                          gutterBottom
                          sx={{ color: 'primary.main' }}
                            >
                              {perk.title}
                            </Typography>
                        <Typography variant="body2" color="text.secondary">
                              {perk.description}
                            </Typography>
                      </ContentBox>
                        </Grid>
                      ))}
                    </Grid>
              </Box>
            )}

                {hackathon.sponsors?.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <SectionTitle>
                  <BusinessIcon />
                  Sponsors
                </SectionTitle>
                    <Grid container spacing={3}>
                      {hackathon.sponsors.map((sponsor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box
                            sx={{
                          p: 3,
                              border: '1px solid',
                              borderColor: 'divider',
                          borderRadius: 2,
                              textAlign: 'center',
                            }}
                          >
                            <Box
                              component="img"
                              src={sponsor.logo}
                              alt={sponsor.name}
                              sx={{
                                width: '100%',
                            maxWidth: 200,
                            height: 100,
                                objectFit: 'contain',
                            mb: 2,
                          }}
                        />
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                              {sponsor.name}
                            </Typography>
                            <Button
                              variant="outlined"
                            size="small"
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            fullWidth
                              >
                                Visit Website
                              </Button>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
              </Box>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack 
            spacing={4}
            sx={{
              position: 'sticky',
              top: 24,
              width: '100%',
              alignSelf: 'flex-start',
              '& > *': {
                width: '100%',
              }
            }}
          >
            {hackathon.contact?.length > 0 && (
              <StyledCard elevation={0}>
                              <Typography
                  variant="h6" 
                  gutterBottom
                                sx={{
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    mb: 3 
                  }}
                >
                  Contact Information
                              </Typography>
                            <Stack spacing={3}>
                  {hackathon.contact.map((contact, index) => (
                              <Box
                      key={index}
                                sx={{
                        p: 2,
                                  border: '1px solid',
                                  borderColor: 'divider',
                        borderRadius: 2,
                                  '&:hover': {
                                    borderColor: 'primary.main',
                          bgcolor: 'background.paper',
                                  }
                                }}
                              >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar 
                                  sx={{
                            bgcolor: 'primary.main',
                            width: { xs: 40, sm: 48 },
                            height: { xs: 40, sm: 48 },
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                          }}
                        >
                          {contact.name.charAt(0)}
                        </Avatar>
                        <Box>
                                  <Typography
                            variant="subtitle1" 
                            fontWeight={600}
                            sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                          >
                            {contact.name}
                                  </Typography>
                                  <Typography
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                          >
                            {contact.role}
                                  </Typography>
                                </Box>
                              </Box>

                      <Stack spacing={1.5}>
                        {contact.email && (
                          <Button
                            startIcon={<Email />}
                            href={`mailto:${contact.email}`}
                            fullWidth
                            variant="outlined"
                            size="small"
                                  sx={{
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              fontSize: { xs: '0.875rem', sm: '1rem' }
                            }}
                          >
                            {contact.email}
                          </Button>
                        )}
                        
                        {contact.phone && (
                          <Button
                            startIcon={<Phone />}
                                      href={`tel:${contact.phone}`}
                            fullWidth
                            variant="outlined"
                            size="small"
                                      sx={{
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              fontSize: { xs: '0.875rem', sm: '1rem' }
                                      }}
                                    >
                                      {contact.phone}
                          </Button>
                              )}
                            </Stack>
                          </Box>
                      ))}
                </Stack>
              </StyledCard>
                )}

                {hackathon.socialMedia?.length > 0 && (
              <StyledCard elevation={0}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    mb: 2 
                  }}
                >
                  Connect With Us
                </Typography>
                <Stack 
                  spacing={{ xs: 1.5, sm: 2 }}
                  direction="column"
                >
                      {hackathon.socialMedia.map((social, index) => (
                          <Button
                      key={index}
                            variant="outlined"
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                      fullWidth
                      size={matchesXS ? "small" : "medium"}
                            sx={{
                        justifyContent: 'flex-start', 
                              textTransform: 'none',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        py: { xs: 1, sm: 1.5 }
                            }}
                          >
                            {social.platform}
                          </Button>
                  ))}
                </Stack>
              </StyledCard>
                )}
              </Stack>
            </Grid>
          </Grid>
    </StyledContainer>
  );
};

export default HackathonDetail; 