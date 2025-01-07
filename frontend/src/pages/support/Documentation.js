import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '40px 0 60px'
  }
}));

const DocContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    padding: '0 20px'
  }
});

const MainTitle = styled(Typography)({
  fontSize: '42px',
  fontWeight: 700,
  color: '#1E1E2F',
  textAlign: 'center',
  letterSpacing: '-0.5px',
  maxWidth: '800px',
  margin: '0 auto 48px',
  '@media (max-width: 600px)': {
    fontSize: '32px',
    margin: '0 auto 40px',
    lineHeight: 1.3
  }
});

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),
  position: 'relative',
  padding: '32px 40px',
  borderRadius: '16px',
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
  },
  transition: 'all 0.3s ease',
  border: '1px solid #E8E8E8',
  width: '100%',
  maxWidth: '800px',
  '&:last-child': {
    marginBottom: 0
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: '#0052CC',
    borderRadius: '4px 0 0 4px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '28px 24px',
    marginBottom: theme.spacing(4),
    '& > *:last-child': {
      marginBottom: 0
    }
  }
}));

const SectionTitle = styled(Typography)({
  fontSize: '28px',
  fontWeight: 700,
  color: '#1e1e2f',
  marginBottom: '24px',
  paddingBottom: '12px',
  position: 'relative',
  display: 'inline-block',
  '@media (max-width: 600px)': {
    fontSize: '24px',
    marginBottom: '24px',
    paddingBottom: '10px',
    lineHeight: 1.3
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: '#0052CC',
    borderRadius: '2px',
  }
});

const SubSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  position: 'relative',
  paddingLeft: theme.spacing(2),
  maxWidth: '720px',
  margin: '32px auto',
  '&:last-child': {
    marginBottom: 0
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1.5)
  }
}));

const SubTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1e1e2f',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    fontSize: '18px',
    marginBottom: '12px'
  },
  '&::before': {
    content: '""',
    width: '8px',
    height: '8px',
    background: '#0052CC',
    borderRadius: '50%',
    marginRight: '12px',
  }
});

const Description = styled(Typography)({
  color: '#42526E',
  fontSize: '16px',
  lineHeight: 1.8,
  marginBottom: '20px',
  letterSpacing: '0.2px',
  fontWeight: 400,
  maxWidth: '720px',
  margin: '0 auto 20px',
  '@media (max-width: 600px)': {
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '16px'
  }
});

const List = styled('ul')({
  margin: '16px 0',
  paddingLeft: '28px',
  '& li': {
    color: '#42526E',
    marginBottom: '12px',
    position: 'relative',
    padding: '4px 0',
    lineHeight: 1.7,
    fontSize: '15px',
    listStyleType: 'none',
    '&::before': {
      content: '"•"',
      color: '#0052CC',
      position: 'absolute',
      left: '-20px',
      fontSize: '18px',
    },
    '&:hover': {
      color: '#42526E',
    },
    transition: 'all 0.2s ease',
    '&:last-child': {
      marginBottom: 0
    },
    '@media (max-width: 600px)': {
      marginBottom: '10px',
      fontSize: '14px',
      padding: '2px 0',
      '&::before': {
        fontSize: '16px',
        left: '-18px',
        top: '7px'
      }
    }
  }
});

const HighlightBox = styled(Box)(({ theme }) => ({
  background: '#F8F9FA',
  padding: '24px 32px',
  borderRadius: '8px',
  marginTop: '24px',
  border: '1px solid #E8E8E8',
  width: '100%',
  maxWidth: '720px',
  margin: '24px auto 0',
  '& .MuiTypography-root': {
    marginBottom: '8px',
    '&:last-child': {
      marginBottom: 0
    }
  },
  [theme.breakpoints.down('sm')]: {
    padding: '24px 20px',
    marginTop: '16px',
    '& .MuiTypography-root': {
      marginBottom: '12px'
    }
  }
}));

const Documentation = () => {
  return (
    <PageWrapper>
      <DocContainer>
        <MainTitle>SphereX Documentation</MainTitle>

        {/* About Section */}
        <Section>
          <SectionTitle>About SphereX</SectionTitle>
          <Description>
            SphereX is a dynamic platform connecting tech enthusiasts, creators, and users, 
            offering a space to explore cutting-edge tools, projects, and ideas in the tech world.
          </Description>

          <HighlightBox>
            <SubTitle>Our Mission</SubTitle>
            <List>
              <li>To inspire innovation and foster collaboration among tech enthusiasts globally</li>
              <li>To provide a hub for discovering new ideas, projects, and tools</li>
              <li>To connect creators with their audience effectively</li>
            </List>
          </HighlightBox>

          <SubSection>
            <SubTitle>Target Audience</SubTitle>
            <List>
              <li>Developers seeking to showcase their projects</li>
              <li>Tech enthusiasts exploring new tools and innovations</li>
              <li>Entrepreneurs looking for tech solutions</li>
              <li>Anyone passionate about technology and innovation</li>
            </List>
          </SubSection>
        </Section>

        {/* API Documentation Section */}
        <Section>
          <SectionTitle>API Documentation</SectionTitle>
          <Description>
            The SphereX API allows developers to programmatically access data on projects, 
            tools, news articles, and more.
          </Description>

          <SubSection>
            <SubTitle>Key Features</SubTitle>
            <List>
              <li>Retrieve tech news updates in JSON format</li>
              <li>Fetch details of projects and tools</li>
              <li>Search and filter projects or tools by category or tags</li>
            </List>
          </SubSection>

          <HighlightBox>
            <SubTitle>Authentication</SubTitle>
            <List>
              <li>API key provided after user registration</li>
              <li>Secure authentication using API keys</li>
              <li>Rate limit: 1000 requests per day</li>
            </List>
          </HighlightBox>

          <SubSection>
            <SubTitle>Available Endpoints</SubTitle>
            <List>
              <li>GET /api/news: Fetch latest tech news</li>
              <li>GET /api/projects: Retrieve project cards with details</li>
              <li>GET /api/tools: Access tool listings</li>
              <li>POST /api/submit: Submit a project or tool (requires authentication)</li>
            </List>
          </SubSection>
        </Section>

        {/* Support Section */}
        <Section>
          <SectionTitle>Support</SectionTitle>
          <Description>
            Get assistance for any issues faced while using the platform.
          </Description>

          <SubSection>
            <SubTitle>Support Categories</SubTitle>
            <List>
              <li>General Queries: Account setup, platform navigation</li>
              <li>Submission Issues: Help with submitting projects or tools</li>
              <li>Technical Support: API, search, or other platform features</li>
            </List>
          </SubSection>

          <HighlightBox>
            <SubTitle>Contact Methods</SubTitle>
            <List>
              <li>Email Support: support@spherex.com</li>
              <li>Live Chat: Available during business hours</li>
              <li>Help Desk: Submit tickets for complex issues</li>
            </List>
          </HighlightBox>
        </Section>

        {/* Privacy Section */}
        <Section>
          <SectionTitle>Privacy Overview</SectionTitle>
          <Description>
            Learn how we collect, use, and protect your data.
          </Description>

          <SubSection>
            <SubTitle>Data Protection</SubTitle>
            <List>
              <li>SSL encryption for secure data transmission</li>
              <li>Regular security audits</li>
              <li>No selling or unauthorized sharing of user data</li>
            </List>
          </SubSection>

          <HighlightBox>
            <SubTitle>User Rights</SubTitle>
            <List>
              <li>Access and update personal data through account settings</li>
              <li>Request data deletion</li>
              <li>Contact privacy@spherex.com for concerns</li>
            </List>
          </HighlightBox>
        </Section>
      </DocContainer>
    </PageWrapper>
  );
};

export default Documentation; 