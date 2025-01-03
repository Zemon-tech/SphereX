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
  MenuItem,
  Link
} from '@mui/material';
import { MoreVert as MoreVertIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const ProjectCard = ({ project, onUpdate }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    navigate(`/projects/${project._id}`);
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
      await api.delete(`/projects/${project._id}`);
      onUpdate();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    handleMenuClose();
  };

  const imageUrl = project.imageUrl || 'https://via.placeholder.com/800x400?text=Project';

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
          alt={project.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=Project';
            e.target.onerror = null;
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {project.title}
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
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={project.category}
              color="primary"
              size="small"
            />
            {Array.isArray(project.tags) && project.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <GitHubIcon fontSize="small" />
              <Typography variant="body2">View on GitHub</Typography>
            </Link>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {new Date(project.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard; 