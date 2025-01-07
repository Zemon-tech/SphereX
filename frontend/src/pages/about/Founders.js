import { Container, Typography, Box, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkedIn } from '@mui/icons-material';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#F8F9FA',
  padding: '60px 0',
  overflowX: 'hidden',
}));

const FounderContainer = styled(Container)({
  maxWidth: '1200px !important',
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
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
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
    padding: theme.spacing(3),
  }
}));

const Title = styled(Typography)({
  fontSize: '32px',
  fontWeight: 700,
  color: '#1E1E2F',
  marginBottom: '24px',
  textAlign: 'center'
});

const SubTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 600,
  color: '#1E1E2F',
  marginBottom: '16px',
});

const Role = styled(Typography)({
  color: '#0052CC',
  fontSize: '18px',
  fontWeight: 500,
  marginBottom: '16px',
  fontStyle: 'italic'
});

const Description = styled(Typography)({
  color: '#42526E',
  fontSize: '16px',
  lineHeight: 1.8,
  marginBottom: '24px',
  maxWidth: '900px',
  margin: '0 auto 24px',
});

const Quote = styled(Box)({
  padding: '24px',
  background: '#F8F9FA',
  borderRadius: '8px',
  marginBottom: '24px',
  borderLeft: '4px solid #0052CC',
  fontStyle: 'italic',
  color: '#42526E',
});

const SkillsList = styled('ul')({
  margin: '0 0 24px 0',
  paddingLeft: '20px',
  '& li': {
    color: '#42526E',
    marginBottom: '8px',
    lineHeight: 1.7,
  }
});

const LinkedInButton = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  color: '#0A66C2',
  textDecoration: 'none',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(10, 102, 194, 0.1)',
  }
});

const Founders = () => {
  return (
    <PageWrapper>
      <FounderContainer>
        <Title>Meet the Founders</Title>
        <Description sx={{ 
          textAlign: 'center', 
          mb: 6,
          px: { xs: 2, sm: 4 }
        }}>
          SphereX was founded by <strong>Shivang Kandoi</strong> and <strong>Madhav Varshney</strong>, 
          two visionary first-year BTech IT students at <strong>GGSIPU USICT</strong>. Sharing a deep 
          passion for technology and innovation, they created SphereX to connect tech enthusiasts, 
          showcase groundbreaking ideas, and inspire a global audience of creators and learners.
        </Description>

        <Section>
          <SubTitle>Shivang Kandoi</SubTitle>
          <Role>Founder & Chief Executive Officer (CEO)</Role>
          <Description>
            Shivang is the driving force behind SphereX's vision and strategy. A dynamic leader 
            and problem-solver, Shivang brings expertise in backend development, scalable architectures, 
            and system design. He is passionate about creating platforms that empower the tech community 
            and simplify access to innovative ideas and tools.
          </Description>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Key Skills:</Typography>
            <SkillsList>
              <li>Backend development and database management</li>
              <li>Scalable system design</li>
              <li>Leadership and strategic planning</li>
            </SkillsList>
          </Box>

          <Quote>
            "SphereX is my vision for a world where creators and innovators have a seamless platform 
            to share, learn, and inspire the next wave of technological advancements."
          </Quote>

          <LinkedInButton href="https://www.linkedin.com/in/shivang-kandoi" target="_blank">
            <LinkedIn /> Connect on LinkedIn
          </LinkedInButton>
        </Section>

        <Section>
          <SubTitle>Madhav Varshney</SubTitle>
          <Role>Co-Founder & Chief Technology Officer (CTO)</Role>
          <Description>
            Madhav plays a pivotal role in ensuring SphereX's technology is cutting-edge and user-centric. 
            With a passion for frontend development and modern UI/UX design, Madhav is responsible for 
            building a visually stunning and functional platform that resonates with its audience.
          </Description>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Key Skills:</Typography>
            <SkillsList>
              <li>Full-stack development</li>
              <li>Modern UI/UX design</li>
              <li>AI, cybersecurity, and web development</li>
            </SkillsList>
          </Box>

          <Quote>
            "SphereX is a space where creativity meets technology, enabling creators to showcase their 
            ideas and connect with a larger audience."
          </Quote>

          <LinkedInButton href="https://www.linkedin.com/in/madhav-varshney" target="_blank">
            <LinkedIn /> Connect on LinkedIn
          </LinkedInButton>
        </Section>

        <Section>
          <SubTitle>Our Mission</SubTitle>
          <Description>
            To create a platform where the global tech community can connect, share innovative ideas, 
            and discover groundbreaking tools and services that drive progress.
          </Description>
          <Description>
            Together, Shivang and Madhav are committed to building SphereX into a platform that 
            revolutionizes how technology enthusiasts interact, innovate, and inspire.
          </Description>
        </Section>
      </FounderContainer>
    </PageWrapper>
  );
};

export default Founders; 