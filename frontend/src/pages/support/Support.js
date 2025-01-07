import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Email, Chat, Help } from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
}));

const SupportContainer = styled(Container)({
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

const ContactButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  }
}));

const Support = () => {
  return (
    <PageWrapper>
      <SupportContainer>
        <Title>Support Center</Title>
        
        <Section>
          <SubTitle>Overview</SubTitle>
          <Description>
            Get assistance for any issues faced while using the platform. Our support team is here to help you.
          </Description>

          <Box sx={{ mb: 4 }}>
            <ContactButton
              variant="contained"
              color="primary"
              startIcon={<Email />}
              href="mailto:support@spherex.com"
            >
              Email Support
            </ContactButton>
            <ContactButton
              variant="outlined"
              color="primary"
              startIcon={<Chat />}
            >
              Live Chat
            </ContactButton>
            <ContactButton
              variant="outlined"
              color="primary"
              startIcon={<Help />}
            >
              Help Desk
            </ContactButton>
          </Box>
        </Section>

        <Section>
          <SubTitle>Support Categories</SubTitle>
          <List>
            <li>General Queries: Account setup, platform navigation, content interaction</li>
            <li>Submission Issues: Help with submitting projects or tools</li>
            <li>Technical Support: Troubleshooting API, search, or other platform features</li>
          </List>
        </Section>

        <Section>
          <SubTitle>Contact Methods</SubTitle>
          <List>
            <li>Email Support: support@spherex.com</li>
            <li>Live Chat: Available during business hours</li>
            <li>Help Desk: Submit tickets for complex issues</li>
          </List>
        </Section>

        <Section>
          <SubTitle>Frequently Asked Questions</SubTitle>
          <Description>
            Find quick answers to common questions about using SphereX.
          </Description>
          <List>
            <li>How do I reset my password?</li>
            <li>How can I submit a project?</li>
            <li>What should I do if my submission is rejected?</li>
            <li>How can I update my profile information?</li>
            <li>How do I report a technical issue?</li>
          </List>
        </Section>
      </SupportContainer>
    </PageWrapper>
  );
};

export default Support; 