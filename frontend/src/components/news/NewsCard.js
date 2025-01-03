import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const NewsCard = ({ news, onDelete }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    navigate(`/tech-news/${news._id}`);
  };

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await api.delete(`/news/${news._id}`);
      onDelete(news._id);
    } catch (error) {
      console.error('Error deleting news:', error);
    }
    handleMenuClose();
  };

  const imageUrl = news.imageUrl || 'https://via.placeholder.com/800x400?text=News';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {isAdmin && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <IconButton onClick={handleMenuOpen} sx={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      )}
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={news.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=News';
            e.target.onerror = null;
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {news.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              mb: 2
            }}
          >
            {news.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {Array.isArray(news.tags) && news.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {new Date(news.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard; 