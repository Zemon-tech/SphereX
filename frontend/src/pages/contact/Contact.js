import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Email, Phone, LocationOn, LinkedIn, Twitter, GitHub } from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
}));

const ContactContainer = styled(Container)({
  maxWidth: '800px !important',
  margin: '0 auto',
});

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  border: '1px solid #E8E8E8',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: '#0052CC',
    borderRadius: '4px 0 0 4px',
  }
}));

const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 700,
  color: '#1E1E2F',
  marginBottom: '24px',
});

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(2),
    color: '#0052CC',
  }
}));

const SocialButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  margin: theme.spacing(0, 1, 1, 0),
  borderRadius: '8px',
  textTransform: 'none',
  minWidth: '140px',
  border: '1px solid rgba(0, 82, 204, 0.5)',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    fontSize: '20px'
  },
  '&:hover': {
    background: 'rgba(0, 82, 204, 0.04)',
    border: '1px solid #0052CC',
    transform: 'translateY(-2px)',
  }
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center'
  }
}));

const StyledForm = styled('form')(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  }
}));

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <PageWrapper>
      <ContactContainer>
        <Title>Contact Us</Title>

        <Section>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Get in Touch
              </Typography>
              <ContactInfo>
                <Email />
                <Typography>contact@spherex.com</Typography>
              </ContactInfo>
              <ContactInfo>
                <Phone />
                <Typography>+1-800-SPHEREX</Typography>
              </ContactInfo>
              <ContactInfo>
                <LocationOn />
                <Typography>Tech Hub, Innovation Street<br />Silicon Valley, CA 94025</Typography>
              </ContactInfo>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Follow Us
                </Typography>
                <SocialContainer>
                  <SocialButton
                    variant="outlined"
                    color="primary"
                    startIcon={<LinkedIn />}
                    href="https://linkedin.com/spherex"
                    target="_blank"
                    sx={{ 
                      borderColor: '#0A66C2',
                      color: '#0A66C2',
                      '&:hover': {
                        borderColor: '#0A66C2',
                        background: 'rgba(10, 102, 194, 0.04)'
                      }
                    }}
                  >
                    LinkedIn
                  </SocialButton>
                  <SocialButton
                    variant="outlined"
                    color="primary"
                    startIcon={<Twitter />}
                    href="https://twitter.com/spherex"
                    target="_blank"
                    sx={{ 
                      borderColor: '#1DA1F2',
                      color: '#1DA1F2',
                      '&:hover': {
                        borderColor: '#1DA1F2',
                        background: 'rgba(29, 161, 242, 0.04)'
                      }
                    }}
                  >
                    Twitter
                  </SocialButton>
                  <SocialButton
                    variant="outlined"
                    color="primary"
                    startIcon={<GitHub />}
                    href="https://github.com/spherex"
                    target="_blank"
                    sx={{ 
                      borderColor: '#24292E',
                      color: '#24292E',
                      '&:hover': {
                        borderColor: '#24292E',
                        background: 'rgba(36, 41, 46, 0.04)'
                      }
                    }}
                  >
                    GitHub
                  </SocialButton>
                </SocialContainer>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Send us a Message
              </Typography>
              <StyledForm onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </StyledForm>
            </Grid>
          </Grid>
        </Section>
      </ContactContainer>
    </PageWrapper>
  );
};

export default Contact; 