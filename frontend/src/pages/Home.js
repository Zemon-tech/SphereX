import { Container, Typography, Grid, Box, Button, Card, CardContent, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Code as CodeIcon, 
  Newspaper as NewsIcon,
  Build as BuildIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebaseIcon from '../assets/icons/firebase-icon.svg';
import nodejsIcon from '../assets/icons/nodejs-icon.svg';
import mongodbIcon from '../assets/icons/mongodb-icon.svg';
import reactjsIcon from '../assets/icons/reactjs-icon.svg';
import expressjsIcon from '../assets/icons/expressjs-icon.svg';

// Enhanced hero section with more dynamic background
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2F 100%)',
  color: '#fff',
  minHeight: '92vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginTop: '-64px',
  paddingTop: '84px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.08) 0%, rgba(15, 15, 26, 0) 70%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(15, 15, 26, 0.3) 0%, rgba(15, 15, 26, 0) 100%)',
    pointerEvents: 'none',
  }
}));

// Enhanced hero content with better spacing and animations
const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6, 2),
  },
}));

// Enhanced feature cards with hover effects
const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  background: '#fff',
  borderRadius: '24px',
  border: '1px solid rgba(0,0,0,0.08)',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    '& .icon-wrapper': {
      transform: 'scale(1.1)',
      boxShadow: '0 12px 24px rgba(111, 157, 255, 0.2)',
    }
  }
}));

// Styled statistics box
const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: '#fff',
  borderRadius: '24px',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
  }
}));

// Styled icon wrapper
const StyledIcon = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  transition: 'all 0.3s ease',
  className: 'icon-wrapper',
  '& svg': {
    fontSize: '40px',
    color: '#fff',
  }
}));

const TechStackSection = styled(Box)(({ theme }) => ({
  background: '#fff',
  padding: theme.spacing(16, 0),
  position: 'relative',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  marginRight: 'calc(-50vw + 50%)',
  borderTop: '1px solid rgba(0,0,0,0.08)',
  marginTop: theme.spacing(8),
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  border: '1px solid rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  }
}));

const WorkflowSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  padding: theme.spacing(16, 0),
  position: 'relative',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  marginRight: 'calc(-50vw + 50%)',
  minHeight: '600px',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeroSection>
        <HeroContent maxWidth="lg">
          {currentUser ? (
            // Logged in user view
            <>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                Welcome back, {currentUser.displayName?.split(' ')[0] || 'User'}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                  fontWeight: 400,
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.5,
                }}
              >
                Continue exploring the latest tech news, projects, and developer tools
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button
                  component={Link}
                  to="/tech-news"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#6f9dff',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#94b8ff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(111, 157, 255, 0.3)',
                    },
                  }}
                >
                  Latest News
                </Button>
                <Button
                  component={Link}
                  to="/projects"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View Projects
                </Button>
              </Stack>
            </>
          ) : (
            // Non-logged in user view
            <>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                }}
              >
                Your Gateway to Tech Innovation
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                  fontWeight: 400,
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.5,
                }}
              >
                Discover the latest tech news, showcase your projects, and access powerful developer tools
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#6f9dff',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#94b8ff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(111, 157, 255, 0.3)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/tech-news"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '16px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Explore
                </Button>
              </Stack>
            </>
          )}
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 12, mb: 0 }}>
        <Grid container spacing={4} sx={{ mb: 12 }}>
          <Grid item xs={12} md={4}>
            <StatBox>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>500+</Typography>
              <Typography variant="h6" color="text.secondary">Active Projects</Typography>
            </StatBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>1000+</Typography>
              <Typography variant="h6" color="text.secondary">Developer Tools</Typography>
            </StatBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatBox>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>10K+</Typography>
              <Typography variant="h6" color="text.secondary">Community Members</Typography>
            </StatBox>
          </Grid>
        </Grid>

        <Typography variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1e1e2f, #2c2c44)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px'
          }}>
          Platform Features
        </Typography>

        <Grid container spacing={4}>
          {[
            { icon: <NewsIcon />, title: 'Tech News', description: 'Stay updated with the latest technology trends and innovations' },
            { icon: <CodeIcon />, title: 'Project Showcase', description: 'Share and discover innovative software projects' },
            { icon: <BuildIcon />, title: 'Developer Tools', description: 'Access powerful tools to enhance your development workflow' },
            { icon: <SpeedIcon />, title: 'High Performance', description: 'Lightning-fast loading and optimal user experience' },
            { icon: <SecurityIcon />, title: 'Secure Platform', description: 'Enterprise-grade security for your data and projects' },
            { icon: <GroupIcon />, title: 'Active Community', description: 'Connect with developers from around the world' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <StyledIcon>
                    {feature.icon}
                  </StyledIcon>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        {/* Tech Stack Section */}
        <TechStackSection>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                mb: 10,
                fontWeight: 700,
                color: '#1A1A2F',
              }}
            >
              Powered by Modern Technologies
            </Typography>
            
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              sx={{ 
                gap: { xs: 4, md: 8 },
                px: 2
              }}
            >
              {[
                { icon: reactjsIcon, name: 'React.js' },
                { icon: expressjsIcon, name: 'Express.js' },
                { icon: mongodbIcon, name: 'MongoDB' },
                { icon: nodejsIcon, name: 'Node.js' },
                { icon: firebaseIcon, name: 'Firebase' }
              ].map((tech, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: { xs: '120px', md: '140px' }
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      style={{ 
                        width: 64, 
                        height: 64,
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '1rem'
                    }}
                  >
                    {tech.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Container>
        </TechStackSection>

        {/* Workflow Section */}
        <WorkflowSection>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                mb: 12,
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              How It Works
            </Typography>
            <Grid container spacing={8}>
              {[
                { 
                  number: '01', 
                  title: 'Sign Up', 
                  description: 'Create your account in seconds',
                  gradient: 'linear-gradient(135deg, #6f9dff, #94b8ff)'
                },
                { 
                  number: '02', 
                  title: 'Explore', 
                  description: 'Discover projects and tools',
                  gradient: 'linear-gradient(135deg, #7c4dff, #b388ff)'
                },
                { 
                  number: '03', 
                  title: 'Connect', 
                  description: 'Join the developer community',
                  gradient: 'linear-gradient(135deg, #0288d1, #29b6f6)'
                },
                { 
                  number: '04', 
                  title: 'Build', 
                  description: 'Start creating amazing things',
                  gradient: 'linear-gradient(135deg, #2e7d32, #66bb6a)'
                }
              ].map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      position: 'relative',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        mb: 3,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -10,
                          left: -10,
                          right: -10,
                          bottom: -10,
                          background: step.gradient,
                          opacity: 0.1,
                          borderRadius: '30px',
                          transition: 'opacity 0.3s ease',
                        }
                      }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          background: step.gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 800,
                          fontSize: '5rem',
                          lineHeight: 1
                        }}
                      >
                        {step.number}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 700,
                        fontSize: '1.5rem'
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      sx={{
                        fontSize: '1.1rem',
                        lineHeight: 1.6
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </WorkflowSection>

        {/* Testimonials Section */}
        <Box sx={{ 
          py: 16,
          background: '#fff',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(111, 157, 255, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }
        }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                mb: 12,
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              What Developers Say
            </Typography>
            <Grid container spacing={6}>
              {[
                {
                  name: 'Alex Chen',
                  role: 'Full Stack Developer',
                  content: 'This platform has revolutionized how I discover and share developer tools. The community is incredibly supportive.',
                  avatar: '/images/avatars/avatar1.jpg'
                },
                {
                  name: 'Sarah Johnson',
                  role: 'Frontend Engineer',
                  content: 'The quality of projects and tools available here is outstanding. It\'s become an essential part of my development workflow.',
                  avatar: '/images/avatars/avatar2.jpg'
                },
                {
                  name: 'Michael Brown',
                  role: 'DevOps Engineer',
                  content: 'The platform\'s focus on security and performance makes it stand out. It\'s a game-changer for the developer community.',
                  avatar: '/images/avatars/avatar3.jpg'
                }
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TestimonialCard
                    sx={{
                      position: 'relative',
                      overflow: 'visible',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #6f9dff, #94b8ff)',
                        borderRadius: '4px 4px 0 0'
                      }
                    }}
                  >
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={testimonial.avatar}
                        sx={{ 
                          width: 64, 
                          height: 64,
                          border: '3px solid #fff',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            mb: 0.5
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.95rem'
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography 
                      sx={{ 
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        color: 'text.secondary',
                        fontStyle: 'italic'
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>
                  </TestimonialCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>

      <Box 
        sx={{ 
          width: '100%',
          background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.08) 0%, rgba(30, 30, 47, 0) 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: '#fff',
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                px: 2,
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Join our community and start exploring the possibilities
            </Typography>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#6f9dff',
                padding: '16px 40px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '12px',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#94b8ff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(111, 157, 255, 0.3)',
                },
              }}
            >
              Join Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 