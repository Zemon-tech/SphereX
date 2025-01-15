import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  '& .MuiPaper-root': {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
  }
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .MuiTypography-h4': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1e1e2f',
  }
}));

const HeaderActions = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center'
});

const BackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: 'rgba(0,0,0,0.03)',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.06)',
  }
}));

const RefreshButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#fff',
  padding: '8px 24px',
  '&:hover': {
    background: theme.palette.primary.dark,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }
}));

const ContentSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const DataTable = styled(TableContainer)(({ theme }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: 'rgba(0,0,0,0.02)',
    '& .MuiTableCell-root': {
      color: theme.palette.text.secondary,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }
  },
  '& .MuiTableBody-root .MuiTableRow-root': {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.01)',
    }
  },
  '& .MuiTableCell-root': {
    padding: theme.spacing(2),
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
    '&:last-of-type': {
      paddingRight: theme.spacing(3),
    }
  }
}));

const LoadingState = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '40vh',
  flexDirection: 'column',
  gap: theme.spacing(2),
  '& .MuiCircularProgress-root': {
    color: theme.palette.primary.main
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem'
  }
}));

const ThumbnailBox = styled(Box)({
  width: 48,
  height: 32,
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundColor: 'rgba(0,0,0,0.03)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(0,0,0,0.06)',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.2s ease',
    backgroundColor: 'rgba(0,0,0,0.03)'
  }
});

const StatCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  '& .stat-title': {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  },
  '& .stat-value': {
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    lineHeight: 1.2
  },
  '& .stat-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginTop: 'auto'
  }
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4)
}));

const Analytics = () => {
  const { type } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/analytics/${type}`);
      if (response) {
        setAnalytics(response);
        setError('');
      }
    } catch (err) {
      console.error(`Error fetching ${type} analytics:`, err);
      setError(err.response?.data?.message || `Failed to fetch ${type} analytics. Please try again later.`);
      setAnalytics(null); // Reset analytics on error
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchAnalytics();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [fetchAnalytics]);

  // Add manual refresh function
  const handleRefresh = () => {
    fetchAnalytics();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#6f9dff' }} />
      </Box>
    );
  }

  const renderContent = () => {
    const renderStats = () => {
      switch (type) {
        case 'news':
          return (
            <StatsGrid>
              <StatCard>
                <Typography className="stat-title">Most Viewed Article</Typography>
                <Typography className="stat-value">{analytics?.mostViewed?.visits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Average Views</Typography>
                <Typography className="stat-value">{analytics?.averageViews || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Views</Typography>
                <Typography className="stat-value">{analytics?.totalVisits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Articles</Typography>
                <Typography className="stat-value">{analytics?.articles?.length || 0}</Typography>
              </StatCard>
            </StatsGrid>
          );

        case 'tools':
          return (
            <StatsGrid>
              <StatCard>
                <Typography className="stat-title">Most Visited Tool</Typography>
                <Typography className="stat-value">{analytics?.mostVisited?.visits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Average Visits</Typography>
                <Typography className="stat-value">{analytics?.averageVisits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Visits</Typography>
                <Typography className="stat-value">{analytics?.totalVisits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Tools</Typography>
                <Typography className="stat-value">{analytics?.tools?.length || 0}</Typography>
              </StatCard>
            </StatsGrid>
          );

        case 'projects':
          return (
            <StatsGrid>
              <StatCard>
                <Typography className="stat-title">Most Visited Project</Typography>
                <Typography className="stat-value">{analytics?.mostVisited?.visits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Average Visits</Typography>
                <Typography className="stat-value">{analytics?.averageVisits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Visits</Typography>
                <Typography className="stat-value">{analytics?.totalVisits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Projects</Typography>
                <Typography className="stat-value">{analytics?.projects?.length || 0}</Typography>
              </StatCard>
            </StatsGrid>
          );

        case 'hackathons':
          return (
            <StatsGrid>
              <StatCard>
                <Typography className="stat-title">Most Visited Hackathon</Typography>
                <Typography className="stat-value">{analytics?.mostViewed?.visits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Average Views</Typography>
                <Typography className="stat-value">{analytics?.averageViews || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Views</Typography>
                <Typography className="stat-value">{analytics?.totalVisits || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Total Registrations</Typography>
                <Typography className="stat-value">
                  {analytics?.hackathons?.reduce((total, hackathon) => total + (hackathon.registrationClicks || 0), 0) || 0}
                </Typography>
              </StatCard>
            </StatsGrid>
          );

        case 'users':
          return (
            <StatsGrid>
              <StatCard>
                <Typography className="stat-title">Total Users</Typography>
                <Typography className="stat-value">{analytics?.totalUsers || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Active Users</Typography>
                <Typography className="stat-value">{analytics?.activeUsers || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">New Users (30 days)</Typography>
                <Typography className="stat-value">{analytics?.newUsers || 0}</Typography>
              </StatCard>
              <StatCard>
                <Typography className="stat-title">Verified Users</Typography>
                <Typography className="stat-value">{analytics?.verifiedUsers || 0}</Typography>
              </StatCard>
            </StatsGrid>
          );

        default:
          return null;
      }
    };

    const renderTable = () => {
      switch (type) {
        case 'news':
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="40%">Title</TableCell>
                  <TableCell align="center">Total Visits</TableCell>
                  <TableCell align="center">Last Visit</TableCell>
                  <TableCell align="right">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics?.articles?.map((article) => (
                  <TableRow key={article._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThumbnailBox>
                          <Box
                            component="a"
                            href={article.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'block',
                              backgroundImage: `url(${article.imageUrl || '/placeholder.jpg'})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        </ThumbnailBox>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {article.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{article.visits}</TableCell>
                    <TableCell align="center">
                      {article.lastVisit 
                        ? new Date(article.lastVisit).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={article.category}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.04)',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );

        case 'tools':
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="40%">Tool Name</TableCell>
                  <TableCell align="center">Total Visits</TableCell>
                  <TableCell align="center">Last Visit</TableCell>
                  <TableCell align="right">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics?.tools?.map((tool) => (
                  <TableRow key={tool._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThumbnailBox>
                          <Box
                            component="a"
                            href={tool.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'block',
                              backgroundImage: `url(${tool.imageUrl || '/placeholder.jpg'})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        </ThumbnailBox>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {tool.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{tool.visits}</TableCell>
                    <TableCell align="center">
                      {tool.lastVisit 
                        ? new Date(tool.lastVisit).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={tool.category}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.04)',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );

        case 'projects':
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="40%">Project Name</TableCell>
                  <TableCell align="center">Total Visits</TableCell>
                  <TableCell align="center">Last Visit</TableCell>
                  <TableCell align="right">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics?.projects?.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThumbnailBox>
                          <Box
                            component="a"
                            href={project.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'block',
                              backgroundImage: `url(${project.imageUrl || '/placeholder.jpg'})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        </ThumbnailBox>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {project.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{project.visits}</TableCell>
                    <TableCell align="center">
                      {project.lastVisit 
                        ? new Date(project.lastVisit).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={project.category}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(0,0,0,0.04)',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );

        case 'hackathons':
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="30%">Title</TableCell>
                  <TableCell align="center">Total Visits</TableCell>
                  <TableCell align="center">Registrations</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics?.hackathons?.map((hackathon) => (
                  <TableRow key={hackathon._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThumbnailBox>
                          <Box
                            component="a"
                            href={hackathon.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'block',
                              backgroundImage: `url(${hackathon.imageUrl || '/placeholder.jpg'})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        </ThumbnailBox>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {hackathon.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{hackathon.visits || 0}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${hackathon.registrationClicks || 0} clicks`}
                        size="small"
                        color={hackathon.registrationClicks > 0 ? "primary" : "default"}
                        sx={{ 
                          minWidth: '80px',
                          fontWeight: 500,
                          '& .MuiChip-label': {
                            px: 1
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={hackathon.status}
                        size="small"
                        color={
                          hackathon.status === 'ongoing' ? 'success' :
                          hackathon.status === 'upcoming' ? 'primary' : 'default'
                        }
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      {`${new Date(hackathon.startDate).toLocaleDateString()} - ${new Date(hackathon.endDate).toLocaleDateString()}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );

        case 'users':
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="30%">User</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Join Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Last Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics?.users?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ThumbnailBox>
                          <Box
                            component="img"
                            src={user.photoURL || '/default-avatar.png'}
                            alt={user.displayName}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </ThumbnailBox>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.displayName || 'Anonymous User'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.uid}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={user.emailVerified ? 'Verified' : 'Unverified'}
                        size="small"
                        color={user.emailVerified ? 'success' : 'default'}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      {user.lastLoginAt 
                        ? new Date(user.lastLoginAt).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );

        default:
          return null;
      }
    };

    return (
      <ContentSection>
        {renderStats()}
        <DataTable component={Paper}>
          {renderTable()}
        </DataTable>
      </ContentSection>
    );
  };

  return (
    <StyledContainer maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BackButton
            startIcon={<ArrowBackIcon />}
            onClick={() => window.location.href = '/admin'}
          >
            Back to Admin Panel
          </BackButton>
          <Typography variant="h4">
            {type.charAt(0).toUpperCase() + type.slice(1)} Analytics
          </Typography>
        </Box>
        <HeaderActions>
          <RefreshButton 
            onClick={handleRefresh}
            startIcon={<RefreshIcon />}
            variant="contained"
          >
            Refresh
          </RefreshButton>
        </HeaderActions>
      </PageHeader>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            '& .MuiAlert-message': {
              fontSize: '0.875rem'
            }
          }}
        >
          <Typography variant="body2">{error}</Typography>
          <Button 
            size="small" 
            onClick={handleRefresh}
            sx={{ mt: 1 }}
          >
            Try Again
          </Button>
        </Alert>
      )}

      {loading ? (
        <LoadingState>
          <CircularProgress size={36} thickness={4} />
          <Typography variant="body2">
            Loading analytics...
          </Typography>
        </LoadingState>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {renderContent()}
        </Box>
      )}
    </StyledContainer>
  );
};

export default Analytics; 