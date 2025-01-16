import React from 'react';
import { Box, Container, Typography, Paper, Link, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkedIn } from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
  padding: '80px 0',
  minHeight: '100vh',
  [theme.breakpoints.down('sm')]: {
    padding: '40px 0 60px',
  }
}));

const FounderCard = styled(Paper)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '20px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: '300px',
  }
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 3, 4, 3),
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '44px',
  fontWeight: 800,
  background: 'linear-gradient(45deg, #1E1E2F, #2C2C44)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '60px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
    marginBottom: '40px',
  }
}));

const FounderName = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 700,
  color: '#1E1E2F',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  }
}));

const Role = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#0052CC',
  fontWeight: 600,
  marginBottom: '24px',
  letterSpacing: '0.5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    marginBottom: '20px',
  }
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.8,
  color: '#42526E',
  marginBottom: '24px',
  position: 'relative',
  fontStyle: 'italic',
  paddingLeft: '24px',
  borderLeft: '3px solid #0052CC',
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    marginBottom: '28px',
  }
}));

const LinkedInButton = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  color: '#0A66C2',
  backgroundColor: '#F0F7FF',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '30px',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#E1EFFF',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '12px 32px',
  }
}));

const Founders = () => {
  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <Title>Meet Our Founders</Title>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FounderCard elevation={0}>
              <ImageContainer>
                <img 
                  src="/images/shivang.jpg" 
                  alt="Shivang Kandoi"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=SK';
                  }}
                />
              </ImageContainer>
              <ContentSection>
                <FounderName>Shivang Kandoi</FounderName>
                <Role>Founder & CEO</Role>
                <Message>
                  "SphereX is my vision for a world where creators and innovators have a seamless platform 
                  to share, learn, and inspire the next wave of technological advancements."
                </Message>
                <LinkedInButton 
                  href="https://in.linkedin.com/in/shivang-kandoi-7a8579322"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn /> Connect on LinkedIn
                </LinkedInButton>
              </ContentSection>
            </FounderCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <FounderCard elevation={0}>
              <ImageContainer>
                <img 
                  src="/images/madhav.jpg" 
                  alt="Madhav Varshney"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://media.licdn.com/dms/image/v2/D5603AQHDTlzZ1RO4Cw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727323742336?e=1742428800&v=beta&t=foO8flnxvxvpF0XdVsCoDK7dzHyOvem6ttZkgiLd6z8';
                  }}
                />
              </ImageContainer>
              <ContentSection>
                <FounderName>Madhav Varshney</FounderName>
                <Role>Co-Founder & CTO</Role>
                <Message>
                  "At SphereX, we believe in the power of technology to transform ideas into reality. 
                  Our platform empowers creators and innovators to bring their visions to life."
                </Message>
                <LinkedInButton 
                  href="https://www.linkedin.com/in/madhav-varshney-70b25132a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn /> Connect on LinkedIn
                </LinkedInButton>
              </ContentSection>
            </FounderCard>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default Founders; 
