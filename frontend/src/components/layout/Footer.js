import { Box, Container, Typography, Link, Grid, IconButton, Divider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const FooterWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
  color: '#fff',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  position: 'relative',
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
}));

const FooterLink = styled(Link)({
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#6f9dff',
    textDecoration: 'none',
  },
});

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#6f9dff',
    transform: 'translateY(-2px)',
  },
}));

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              mb: 2,
              background: 'linear-gradient(45deg, #fff, #6f9dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              SphereX
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              Your comprehensive platform for tech news, project showcase, and developer tools.
              Stay connected with the latest in technology.
            </Typography>
            <Stack direction="row" spacing={1}>
              <SocialButton aria-label="github">
                <GitHubIcon />
              </SocialButton>
              <SocialButton aria-label="linkedin">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton aria-label="twitter">
                <TwitterIcon />
              </SocialButton>
              <SocialButton aria-label="email">
                <EmailIcon />
              </SocialButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Platform
            </Typography>
            <Stack spacing={1}>
              <FooterLink href="/tech-news">Tech News</FooterLink>
              <FooterLink href="/projects">Projects</FooterLink>
              <FooterLink href="/webstore">WebStore</FooterLink>
              <FooterLink href="/auth">Join Us</FooterLink>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">API Reference</FooterLink>
              <FooterLink href="#">Developer Guide</FooterLink>
              <FooterLink href="#">Community Forum</FooterLink>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ 
          borderColor: 'rgba(255, 255, 255, 0.1)',
          my: 3 
        }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            © {new Date().getFullYear()} SphereX. All rights reserved.
          </Typography>
          <Stack 
            direction="row" 
            spacing={3} 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              '& > *': {
                fontSize: '0.875rem',
              }
            }}
          >
            <FooterLink href="#">Status</FooterLink>
            <FooterLink href="#">Security</FooterLink>
            <FooterLink href="#">Support</FooterLink>
          </Stack>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 