import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Link
} from '@mui/material';
import { MoreVert as MoreVertIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const ToolCard = ({ tool, onUpdate }) => {
  const { isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

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
      await api.delete(`/tools/${tool._id}`);
      onUpdate();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
    handleMenuClose();
  };

  const imageUrl = tool.imageUrl || 'https://via.placeholder.com/800x400?text=Tool';

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
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={tool.name}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/800x400?text=Tool';
          e.target.onerror = null;
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {tool.name}
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
          {tool.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            label={tool.category}
            color="primary"
            size="small"
          />
          {Array.isArray(tool.tags) && tool.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="primary">
            {tool.price}
          </Typography>
          {tool.link && (
            <Link
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <LaunchIcon fontSize="small" />
              <Typography variant="body2">Visit Tool</Typography>
            </Link>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {new Date(tool.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ToolCard; 