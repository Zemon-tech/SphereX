import { Container, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Code, Group, Timeline } from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
}));

const AboutContainer = styled(Container)({
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
  '& .MuiSvgIcon-root': {
    marginRight: '12px',
    color: '#0052CC',
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

const About = () => {
  return (
    <PageWrapper>
      <AboutContainer>
        <Title>About SphereX</Title>
        
        <Section>
          <SubTitle>
            <Code />
            Our Vision
          </SubTitle>
          <Description>
            SphereX is a dynamic platform connecting tech enthusiasts, creators, and users, 
            offering a space to explore cutting-edge tools, projects, and ideas in the tech world.
          </Description>
          <Description>
            Our mission is to inspire innovation and foster collaboration among tech enthusiasts globally,
            creating a vibrant ecosystem where ideas flourish and innovation thrives.
          </Description>
        </Section>

        <Section>
          <SubTitle>
            <Group />
            Our Community
          </SubTitle>
          <Description>
            We're building a diverse community of:
          </Description>
          <List>
            <li>Developers showcasing innovative projects</li>
            <li>Tech enthusiasts discovering new tools</li>
            <li>Entrepreneurs exploring tech solutions</li>
            <li>Content creators sharing tech insights</li>
          </List>
        </Section>

        <Section>
          <SubTitle>
            <Timeline />
            Our Journey
          </SubTitle>
          <Description>
            Starting as a simple idea to connect tech enthusiasts, SphereX has evolved into a 
            comprehensive platform offering:
          </Description>
          <List>
            <li>A curated tech news hub for latest updates</li>
            <li>Project showcase platform for developers</li>
            <li>WebStore featuring innovative tools and services</li>
            <li>Community-driven knowledge sharing</li>
          </List>
        </Section>

        <Section>
          <SubTitle>
            <Code />
            Future Goals
          </SubTitle>
          <Description>
            We're committed to:
          </Description>
          <List>
            <li>Expanding our developer tools and resources</li>
            <li>Enhancing community collaboration features</li>
            <li>Implementing AI-powered project recommendations</li>
            <li>Building a stronger global tech community</li>
          </List>
        </Section>
      </AboutContainer>
    </PageWrapper>
  );
};

export default About; 