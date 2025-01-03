import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Welcome to SphereX
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Your platform for tech news, project showcase, and developer tools
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <FeaturePaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Tech News
            </Typography>
            <Typography color="text.secondary">
              Stay updated with the latest in technology
            </Typography>
          </FeaturePaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeaturePaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Project Showcase
            </Typography>
            <Typography color="text.secondary">
              Share and discover innovative projects
            </Typography>
          </FeaturePaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeaturePaper elevation={3}>
            <Typography variant="h5" gutterBottom>
              Developer Tools
            </Typography>
            <Typography color="text.secondary">
              Access powerful development tools
            </Typography>
          </FeaturePaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 