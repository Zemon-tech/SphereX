import { Box, Container, Grid, Typography, Stack, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const FooterWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
  padding: '60px 0 40px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 0 32px',
  }
}));

const FooterContainer = styled(Container)({
  position: 'relative',
  zIndex: 1,
});

const FooterLink = styled(Link)({
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  fontSize: '0.95rem',
  display: 'inline-block',
  '&:hover': {
    color: '#fff',
    transform: 'translateX(4px)',
  }
});

const SocialButton = styled(MuiLink)({
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  padding: '8px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: '#fff',
    background: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)',
  }
});

const FooterSection = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  }
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#fff',
  marginBottom: theme.spacing(3),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '40px',
    height: '2px',
    background: '#0052CC',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    '&::after': {
      left: '50%',
      transform: 'translateX(-50%)',
    }
  }
}));

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#fff',
                  mb: 2,
                  background: 'linear-gradient(45deg, #fff, #6f9dff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SphereX
              </Typography>
              <Typography 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  mb: 3,
                  maxWidth: '400px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Connecting tech enthusiasts, showcasing innovation, and inspiring 
                the next generation of creators.
              </Typography>
              <Stack 
                direction="row" 
                spacing={1}
                sx={{ 
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <SocialButton href="https://github.com/spherex" target="_blank">
                  <GitHub />
                </SocialButton>
                <SocialButton href="https://linkedin.com/company/spherex" target="_blank">
                  <LinkedIn />
                </SocialButton>
                <SocialButton href="https://twitter.com/spherex" target="_blank">
                  <Twitter />
                </SocialButton>
              </Stack>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle>Company</FooterTitle>
              <Stack 
                spacing={2}
                sx={{
                  alignItems: { xs: 'center', md: 'flex-start' }
                }}
              >
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </Stack>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle>Resources</FooterTitle>
              <Stack 
                spacing={2}
                sx={{
                  alignItems: { xs: 'center', md: 'flex-start' }
                }}
              >
                <FooterLink to="/support">Support</FooterLink>
                <FooterLink to="/founders">Founders</FooterLink>
              </Stack>
            </FooterSection>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            mt: 6, 
            pt: 3, 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}
        >
          <Typography 
            sx={{ 
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.9rem'
            }}
          >
            © {new Date().getFullYear()} SphereX. All rights reserved.
          </Typography>
        </Box>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer; 