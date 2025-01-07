import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
}));

const APIContainer = styled(Container)({
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

const SubTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1E1E2F',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
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
  marginBottom: '24px',
});

const List = styled('ul')({
  margin: '0 0 24px 0',
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
    }
  }
});

const CodeBlock = styled(Box)({
  background: '#1E1E2F',
  borderRadius: '8px',
  padding: '16px',
  color: '#fff',
  fontFamily: 'monospace',
  fontSize: '14px',
  marginBottom: '24px',
  overflowX: 'auto',
});

const API = () => {
  return (
    <PageWrapper>
      <APIContainer>
        <Title>API Documentation</Title>
        
        <Section>
          <SubTitle>Overview</SubTitle>
          <Description>
            The SphereX API allows developers to programmatically access data on projects, 
            tools, news articles, and more.
          </Description>

          <SubTitle>Key Features</SubTitle>
          <List>
            <li>Retrieve tech news updates in JSON format</li>
            <li>Fetch details of projects and tools</li>
            <li>Search and filter projects or tools by category or tags</li>
          </List>
        </Section>

        <Section>
          <SubTitle>Authentication</SubTitle>
          <Description>
            All API requests require authentication using an API key. You'll receive your API key
            after registering an account.
          </Description>
          <CodeBlock>
            {`// Example API request with authentication
fetch('https://api.spherex.com/v1/news', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`}
          </CodeBlock>
        </Section>

        <Section>
          <SubTitle>Endpoints</SubTitle>
          <List>
            <li>GET /api/news: Fetch latest tech news</li>
            <li>GET /api/projects: Retrieve project cards with details</li>
            <li>GET /api/tools: Access tool listings</li>
            <li>POST /api/submit: Submit a project or tool (requires authentication)</li>
          </List>

          <SubTitle>Rate Limits</SubTitle>
          <Description>
            To ensure fair usage, API calls are limited to 1000 requests per day per API key.
            If you need higher limits, please contact our support team.
          </Description>
        </Section>

        <Section>
          <SubTitle>Example Usage</SubTitle>
          <CodeBlock>
            {`// Fetch latest tech news
const response = await fetch('https://api.spherex.com/v1/news', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const news = await response.json();`}
          </CodeBlock>

          <CodeBlock>
            {`// Submit a new project
await fetch('https://api.spherex.com/v1/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Project Name',
    description: 'Project Description',
    tags: ['react', 'nodejs']
  })
});`}
          </CodeBlock>
        </Section>
      </APIContainer>
    </PageWrapper>
  );
};

export default API; 