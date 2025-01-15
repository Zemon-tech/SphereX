import { Container, Typography, Grid, Box, Button, Stack, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebaseIcon from '../assets/icons/firebase-icon.svg';
import nodejsIcon from '../assets/icons/nodejs-icon.svg';
import mongodbIcon from '../assets/icons/mongodb-icon.svg';
import reactjsIcon from '../assets/icons/reactjs-icon.svg';
import expressjsIcon from '../assets/icons/expressjs-icon.svg';
import { useState, useEffect } from 'react';
import NewsCard from '../components/news/NewsCard';
import ToolCard from '../components/tools/ToolCard';
import api from '../services/api';
import HackathonCard from '../components/hackathons/HackathonCard'; 
import { 
  Code as CodeIcon, 
  Newspaper as NewsIcon,
  Build as BuildIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

// Enhanced hero section with more dynamic background
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2F 100%)',
  color: '#fff',
  minHeight: '75vh', // Reduced from 92vh
  [theme.breakpoints.down('md')]: {
    minHeight: '60vh', // Even shorter for mobile
  },
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
  padding: theme.spacing(6, 2), // Default padding for desktop
  [theme.breakpoints.down('md')]: { // Only apply these changes for mobile
    padding: theme.spacing(2, 2),
  },
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

const WorkflowSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  padding: theme.spacing(8, 0),
  position: 'relative',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  marginRight: 'calc(-50vw + 50%)',
  minHeight: '300px',
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

const SliderSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  background: '#fff',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  }
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
  msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
  scrollbarWidth: 'none', // Hide scrollbar for Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for Chrome, Safari and Opera
  },
  '.slider-content': {
    display: 'flex',
    gap: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
      justifyContent: 'flex-start', // Change to flex-start for proper infinite scroll
    },
    '& > *': {
      flex: '0 0 350px',
      scrollSnapAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        flex: '0 0 300px',
      }
    }
  }
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  height: 'auto',
  minHeight: '180px',
  background: '#fff',
  borderRadius: theme.spacing(1.5),
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(2.5),
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  isolation: 'isolate',
  zIndex: 1,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(111, 157, 255, 0.2)',
    borderColor: theme.palette.primary.main,
    zIndex: 2,
    '& .feature-icon': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(111, 157, 255, 0.3)',
    }
  },
}));

  const PlatformFeatures = () => {
  const theme = useTheme();
    const features = [
      { icon: <NewsIcon />, title: 'Tech News', description: 'Stay updated with the latest technology trends and innovations' },
      { icon: <CodeIcon />, title: 'Project Showcase', description: 'Share and discover innovative software projects' },
      { icon: <BuildIcon />, title: 'Developer Tools', description: 'Access powerful tools to enhance your development workflow' },
      { icon: <SpeedIcon />, title: 'High Performance', description: 'Lightning-fast loading and optimal user experience' },
      { icon: <SecurityIcon />, title: 'Secure Platform', description: 'Enterprise-grade security for your data and projects' },
      { icon: <GroupIcon />, title: 'Active Community', description: 'Connect with developers from around the world' },
    ];

    return (
    <Box sx={{ 
      py: { xs: 6, md: 8 },
      pb: { xs: 8, md: 10 },
      background: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ 
              textAlign: 'center', 
            mb: { xs: 4, md: 5 },
              fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #6f9dff, #94b8ff)'
              }
            }}
          >
            Platform Features
          </Typography>

        {/* Desktop View - Grid Layout */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Grid 
            container 
            spacing={3} 
            sx={{ 
              position: 'relative',
              '& .MuiGrid-item': {
                marginTop: 0,
                paddingTop: theme.spacing(3),
              }
            }}
          >
              {features.map((feature, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                }}
              >
                <FeatureBox sx={{ width: '100%' }}>
                  <Box
                    className="feature-icon"
                    sx={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      transition: 'all 0.3s ease',
                      '& svg': {
                        fontSize: '28px',
                        color: '#fff',
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1.5,
                        fontWeight: 700,
                        color: '#1e1e2f',
                        fontSize: '1.125rem',
                        lineHeight: 1.3
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        maxWidth: '220px',
                        mx: 'auto',
                        fontSize: '0.875rem'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </FeatureBox>
                </Grid>
              ))}
            </Grid>
          </Box>

        {/* Mobile View - Slider Layout */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <SliderContainer>
              <Box 
                className="slider-content"
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    paddingLeft: 'calc(50% - 150px)',
                    paddingRight: 'calc(50% - 150px)',
                  }
                }}
              >
              {features.map((feature, index) => (
                  <Box 
                    key={index}
                    sx={{
                    flex: '0 0 300px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                  <FeatureBox>
                    <Box
                      className="feature-icon"
                      sx={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #6f9dff 0%, #94b8ff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2.5,
                        transition: 'all 0.3s ease',
                        '& svg': {
                          fontSize: '28px',
                          color: '#fff',
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1.5,
                          fontWeight: 700,
                          color: '#1e1e2f',
                          fontSize: '1.125rem',
                          lineHeight: 1.3
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          maxWidth: '220px',
                          mx: 'auto',
                          fontSize: '0.875rem'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </FeatureBox>
                  </Box>
                ))}
              </Box>
            </SliderContainer>
          </Box>
        </Container>
      </Box>
    );
};

const Home = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredTools, setFeaturedTools] = useState([]);
  const [featuredHackathons, setFeaturedHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        setLoading(true);
        const [newsResponse, toolsResponse, hackathonsResponse] = await Promise.all([
          api.get('/news?featured=true&limit=6'),
          api.get('/tools?featured=true&limit=6'),
          api.get('/hackathons?featured=true&limit=6')
        ]);
        setFeaturedNews(newsResponse);
        setFeaturedTools(toolsResponse);
        setFeaturedHackathons(hackathonsResponse);
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  const getInfiniteItems = (items) => {
    return [...items, ...items, ...items];
  };

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
                  fontSize: '4.5rem', // Default size for desktop
                  fontWeight: 800,
                  mb: 2,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  [theme.breakpoints.down('md')]: { // Only apply these changes for mobile
                    fontSize: '2rem',
                    mb: 1,
                  },
                  [theme.breakpoints.only('sm')]: {
                    fontSize: '3.5rem',
                  },
                }}
              >
                Welcome back, {currentUser.displayName?.split(' ')[0] || 'User'}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.75rem', // Default size for desktop
                  fontWeight: 400,
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.5,
                  [theme.breakpoints.down('md')]: { // Only apply these changes for mobile
                    fontSize: '1rem',
                    mb: 2,
                  },
                  [theme.breakpoints.only('sm')]: {
                    fontSize: '1.5rem',
                  },
                }}
              >
                Continue exploring the latest tech news, projects, and developer tools
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ 
                  mt: 4,
                  [theme.breakpoints.down('md')]: {
                    mt: 2,
                    '& > *': {
                      marginTop: theme.spacing(1),
                    },
                  },
                }}
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
                  to="/hackathons"
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
                  Hackathons
                </Button>
              </Stack>
            </>
          ) : (
            // Non-logged in user view
            <>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: '4.5rem', // Default size for desktop
                  fontWeight: 800,
                  mb: 2,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  [theme.breakpoints.down('md')]: { // Only apply these changes for mobile
                    fontSize: '2rem',
                    mb: 1,
                  },
                  [theme.breakpoints.only('sm')]: {
                    fontSize: '3.5rem',
                  },
                }}
              >
                Your Gateway to Tech Innovation
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.75rem', // Default size for desktop
                  fontWeight: 400,
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.5,
                  [theme.breakpoints.down('md')]: { // Only apply these changes for mobile
                    fontSize: '1rem',
                    mb: 2,
                  },
                  [theme.breakpoints.only('sm')]: {
                    fontSize: '1.5rem',
                  },
                }}
              >
                Discover the latest tech news, showcase your projects, and access powerful developer tools
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ 
                  mt: 4,
                  [theme.breakpoints.down('md')]: {
                    mt: 2,
                    '& > *': {
                      marginTop: theme.spacing(1),
                    },
                  },
                }}
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
                  to="/hackathons"
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
                  Hackathons
                </Button>
              </Stack>
            </>
          )}
        </HeroContent>
      </HeroSection>

      {/* Featured News Section */}
      {featuredNews?.length > 0 && (
        <SliderSection>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
          sx={{ 
            textAlign: 'center', 
                mb: { xs: 4, md: 6 },
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6f9dff, #94b8ff)'
                }
              }}
            >
              Featured News
            </Typography>

            {loading ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2,
                py: 8 
              }}>
                <CircularProgress sx={{ color: '#6f9dff' }} />
                <Typography color="text.secondary">Loading latest news...</Typography>
              </Box>
            ) : (
              <SliderContainer>
                <Box 
                  className="slider-content"
                  sx={{
                    [theme.breakpoints.down('sm')]: {
                      paddingLeft: 'calc(50% - 150px)',
                      paddingRight: 'calc(50% - 150px)',
                    }
                  }}
                >
                  {getInfiniteItems(featuredNews.slice(0, 6)).map((news, index) => (
                    <Box 
                      key={`${news._id}-${index}`}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <NewsCard news={news} />
                    </Box>
                  ))}
                </Box>
              </SliderContainer>
            )}
          </Container>
        </SliderSection>
      )}

      {/* Featured Hackathons Section */}
      {featuredHackathons?.length > 0 && (
        <SliderSection>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6f9dff, #94b8ff)'
                }
              }}
            >
              Featured Hackathons
        </Typography>

            {loading ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2,
                py: 8 
              }}>
                <CircularProgress sx={{ color: '#6f9dff' }} />
                <Typography color="text.secondary">Loading hackathons...</Typography>
              </Box>
            ) : (
              <SliderContainer>
                <Box 
                  className="slider-content"
                  sx={{
                    [theme.breakpoints.down('sm')]: {
                      paddingLeft: 'calc(50% - 150px)',
                      paddingRight: 'calc(50% - 150px)',
                    }
                  }}
                >
                  {getInfiniteItems(featuredHackathons.slice(0, 6)).map((hackathon, index) => (
                    <Box 
                      key={`${hackathon._id}-${index}`}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <HackathonCard 
                        hackathon={hackathon} 
                        hideActions 
                        disableClick
                      />
                    </Box>
                  ))}
                </Box>
              </SliderContainer>
            )}
          </Container>
        </SliderSection>
      )}

      {/* Featured Tools Section */}
      {featuredTools?.length > 0 && (
        <SliderSection>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #6f9dff, #94b8ff)'
                }
              }}
            >
              Featured Tools
                  </Typography>

            {loading ? (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                gap: 2,
                py: 8 
              }}>
                <CircularProgress sx={{ color: '#6f9dff' }} />
                <Typography color="text.secondary">Loading latest tools...</Typography>
              </Box>
            ) : (
              <SliderContainer>
                <Box 
                  className="slider-content"
                  sx={{
                    [theme.breakpoints.down('sm')]: {
                      paddingLeft: 'calc(50% - 150px)',
                      paddingRight: 'calc(50% - 150px)',
                    }
                  }}
                >
                  {getInfiniteItems(featuredTools.slice(0, 6)).map((tool, index) => (
                    <Box 
                      key={`${tool._id}-${index}`}
                      sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)'
                        }
                      }}
                    >
                      <ToolCard tool={tool} />
                    </Box>
                  ))}
                </Box>
              </SliderContainer>
            )}
          </Container>
        </SliderSection>
      )}

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

      <PlatformFeatures />

        <WorkflowSection>
          <Container maxWidth="lg" sx={{ pb: 0 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center',
                mb: 8,
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
            <Grid container spacing={4}>
              {[
                { 
                  number: '01', 
                  title: 'Sign Up', 
                  description: 'Create your account in seconds'
                },
                { 
                  number: '02', 
                  title: 'Explore', 
                  description: 'Discover projects and tools'
                },
                { 
                  number: '03', 
                  title: 'Connect', 
                  description: 'Join the developer community'
                },
                { 
                  number: '04', 
                  title: 'Build', 
                  description: 'Start creating amazing things'
                }
              ].map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #1e1e2f, #6f9dff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {step.number}
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </WorkflowSection>
    </Box>
  );
};

export default Home; 