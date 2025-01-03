import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import NewsCard from '../components/news/NewsCard';
import AddNewsDialog from '../components/news/AddNewsDialog';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const categories = [
  'all',
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
        let endpoint = '/news';
        if (category !== 'all') {
          endpoint += `?category=${category}`;
        }
        console.log('Fetching news from:', endpoint); // Debug log
        const response = await api.get(endpoint);
        console.log('News response:', response); // Debug log
        setNews(response || []);
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

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Tech News
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Article
          </Button>
        )}
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Search News"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredNews.map((newsItem) => (
            <Grid item key={newsItem._id} xs={12} sm={6} md={4}>
              <NewsCard news={newsItem} onDelete={handleDeleteNews} />
            </Grid>
          ))}
          {filteredNews.length === 0 && !loading && (
            <Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No news articles found
              </Typography>
            </Box>
          )}
        </Grid>
      )}

      <AddNewsDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddNews}
      />
    </Container>
  );
};

export default TechNews; 