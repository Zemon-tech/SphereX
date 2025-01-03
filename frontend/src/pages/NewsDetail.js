import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Divider
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import api from '../services/api';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/news/${id}`);
        setNews(response);
        setError('');
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch news article');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!news) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">News article not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/tech-news')}
        sx={{ mb: 3 }}
      >
        Back to News
      </Button>

      {news.imageUrl && (
        <Box
          component="img"
          src={news.imageUrl}
          alt={news.title}
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 1,
            mb: 3
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=News';
            e.target.onerror = null;
          }}
        />
      )}

      <Typography variant="h3" component="h1" gutterBottom>
        {news.title}
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label={news.category}
          color="primary"
          size="small"
        />
        {Array.isArray(news.tags) && news.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            size="small"
          />
        ))}
      </Box>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {new Date(news.createdAt).toLocaleDateString()}
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 3, fontStyle: 'italic' }}
      >
        {news.description}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="body1"
        sx={{ whiteSpace: 'pre-wrap' }}
      >
        {news.content}
      </Typography>
    </Container>
  );
};

export default NewsDetail; 