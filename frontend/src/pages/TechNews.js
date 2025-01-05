import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Button,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import NewsCard from '../components/news/NewsCard';
import AddNewsDialog from '../components/news/AddNewsDialog';
import api from '../services/api';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: '#fff',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }
  }
}));

const AddButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
  borderRadius: '12px',
  padding: '10px 24px',
  color: '#fff',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    background: 'linear-gradient(135deg, #2c2c44 0%, #1e1e2f 100%)',
  }
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  }
}));

const NewsGrid = styled(Grid)(({ theme }) => ({
  '& .MuiGrid-item': {
    display: 'flex',
    transition: 'transform 0.3s ease',
  },
  minHeight: '200px',
  marginBottom: theme.spacing(4)
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const NewsSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(circle at 50% 0%, rgba(111, 157, 255, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4, 0, 8),
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-100px',
    left: 0,
    right: 0,
    height: '400px',
    background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.1) 0%, transparent 50%)',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #6f9dff 0%, #94b8ff 100%)',
    borderRadius: '4px',
    opacity: 0.7
  }
}));

const categories = [
  'technology',
  'development',
  'ai',
  'blockchain',
  'other'
];

const TechNews = () => {
  const { isAdmin } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await api.get('/news');
        console.log('News response:', response);
        
        let filteredResults = response || [];
        if (category !== 'all') {
          filteredResults = filteredResults.filter(item => 
            item.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        setNews(filteredResults);
        setError('');
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news');
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const handleAddNews = async (newsData) => {
    try {
      console.log('Submitting news:', newsData); // Debug log
      const response = await api.post('/news', newsData);
      console.log('Add news response:', response); // Debug log
      setNews(prev => [response, ...prev]);
      setOpenAddDialog(false);
    } catch (err) {
      console.error('Error adding news:', err);
      setError('Failed to add news article');
    }
  };

  const handleDeleteNews = (deletedId) => {
    setNews(prev => prev.filter(item => item._id !== deletedId));
  };

  const handleEditNews = (updatedNews) => {
    setNews(prev => prev.map(item => 
      item._id === updatedNews._id ? updatedNews : item
    ));
  };

  const filteredNews = news.filter(item =>
    (searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <NewsSection>
      <Container maxWidth="lg">
        <HeaderSection>
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              fontWeight: 800,
              fontSize: { xs: '2.75rem', md: '3.75rem' },
              background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              position: 'relative',
              zIndex: 2
            }}
          >
            Latest Tech News
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1.2rem', md: '1.35rem' },
              fontWeight: 400,
              mb: 6,
              position: 'relative',
              zIndex: 2,
              '& strong': {
                color: '#6f9dff',
                fontWeight: 600
              }
            }}
          >
            Stay updated with <strong>latest developments</strong> and trends in technology
          </Typography>
        </HeaderSection>

        <FilterContainer>
          <StyledFormControl fullWidth sx={{ flex: 2 }}>
            <TextField
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { background: 'rgba(255,255,255,0.8)' } }}
            />
          </StyledFormControl>

          <StyledFormControl sx={{ width: '180px' }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          {isAdmin && (
            <AddButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Article
            </AddButton>
          )}
        </FilterContainer>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: '12px',
              backgroundColor: 'rgba(211, 47, 47, 0.05)',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              '& .MuiAlert-icon': {
                color: 'error.main'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <LoadingContainer>
            <CircularProgress 
              size={60} 
              sx={{ 
                color: '#6f9dff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }} 
            />
            <Typography color="text.secondary">Loading articles...</Typography>
          </LoadingContainer>
        ) : (
          <NewsGrid container spacing={4}>
            {filteredNews.map((news) => (
              <Grid item xs={12} sm={6} md={4} key={news._id}>
                <NewsCard
                  news={news}
                  onDelete={handleDeleteNews}
                  onEdit={handleEditNews}
                  isAdmin={isAdmin}
                />
              </Grid>
            ))}
          </NewsGrid>
        )}

        <AddNewsDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          onSubmit={handleAddNews}
        />
      </Container>
    </NewsSection>
  );
};

export default TechNews; 