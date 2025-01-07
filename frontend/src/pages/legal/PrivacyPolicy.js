import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Security, Storage, Cookie, AccountBox } from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
}));

const PolicyContainer = styled(Container)({
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

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#1E1E2F',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: '16px',
    color: '#0052CC',
    fontSize: '24px'
  }
}));

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

const UpdatedDate = styled(Typography)({
  color: '#42526E',
  fontSize: '14px',
  marginBottom: '32px',
  fontStyle: 'italic',
});

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <PolicyContainer>
        <Title>Privacy Policy</Title>
        <UpdatedDate>Last updated: {new Date().toLocaleDateString()}</UpdatedDate>

        <Section>
          <SubTitle>
            <Storage />
            Data Collection
          </SubTitle>
          <Description>
            We collect and process the following information to provide you with the best possible experience:
          </Description>
          <List>
            <li>Information collected during account creation (name, email)</li>
            <li>Data collected through interactions (likes, comments, bookmarks)</li>
            <li>Technical information necessary for platform functionality</li>
            <li>Usage data to improve our services</li>
          </List>
        </Section>

        <Section>
          <SubTitle>
            <Security />
            Data Protection
          </SubTitle>
          <Description>
            Your privacy and data security are our top priorities. We implement the following measures:
          </Description>
          <List>
            <li>SSL encryption for secure data transmission</li>
            <li>Regular security audits to prevent unauthorized access</li>
            <li>Strict data access controls and monitoring</li>
            <li>No selling or unauthorized sharing of user data</li>
          </List>
        </Section>

        <Section>
          <SubTitle>
            <Cookie />
            Cookies & Tracking
          </SubTitle>
          <Description>
            We use cookies and similar technologies to enhance your experience:
          </Description>
          <List>
            <li>Essential cookies for platform functionality</li>
            <li>Analytics cookies to understand user behavior</li>
            <li>Preference cookies to remember your settings</li>
            <li>Option to disable non-essential cookies through browser settings</li>
          </List>
        </Section>

        <Section>
          <SubTitle>
            <AccountBox />
            User Rights
          </SubTitle>
          <Description>
            You have control over your personal data:
          </Description>
          <List>
            <li>Access and update personal data through account settings</li>
            <li>Request data deletion or export</li>
            <li>Opt-out of marketing communications</li>
            <li>Contact privacy@spherex.com for privacy concerns</li>
          </List>
        </Section>

        <Section>
          <SubTitle>Third-Party Services</SubTitle>
          <Description>
            We integrate with trusted third-party services:
          </Description>
          <List>
            <li>Firebase for authentication and hosting</li>
            <li>MongoDB for data storage</li>
            <li>Analytics tools for platform improvement</li>
          </List>
          <Description>
            Each third-party service has its own privacy policy and data handling practices. 
            We encourage you to review their policies.
          </Description>
        </Section>

        <Section>
          <SubTitle>Updates to Policy</SubTitle>
          <Description>
            We may update this privacy policy to reflect changes in our practices or for legal reasons. 
            We will notify users of any material changes through email or platform notifications.
          </Description>
          <Description>
            For any questions or concerns about our privacy practices, please contact us at privacy@spherex.com
          </Description>
        </Section>
      </PolicyContainer>
    </PageWrapper>
  );
};

export default PrivacyPolicy; 