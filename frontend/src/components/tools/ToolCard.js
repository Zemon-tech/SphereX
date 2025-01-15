import { Card, CardContent, Typography, Box, Stack, Chip, IconButton, Menu, MenuItem, Link, Button, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Launch as LaunchIcon, MoreVert as MoreVertIcon, Book as BookIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.06)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
    '& .tool-icon': {
      transform: 'scale(1.05)',
    }
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '20px',
  overflow: 'hidden',
  marginRight: theme.spacing(2.5),
  background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.3s ease',
  }
}));

const ToolHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3.5),
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  position: 'relative',
  background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(250,250,252,1) 100%)'
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(111, 157, 255, 0.08)',
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.75rem',
  height: '26px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(111, 157, 255, 0.12)',
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  '&.MuiButton-contained': {
    background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #2c2c44 0%, #1e1e2f 100%)',
    }
  }
}));

const TagChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  color: theme.palette.text.secondary,
  height: '26px',
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  }
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  padding: '4px 12px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 180, 0, 0.08)',
  width: 'fit-content',
  '& .MuiRating-icon': {
    color: 'rgba(255, 180, 0, 0.3)',
  },
  '& .MuiRating-iconFilled': {
    color: '#FFB400',
  }
}));

const ToolCard = ({ tool, onUpdate }) => {
  const { isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/webstore/${tool._id}`);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  const handleVisitClick = async (event) => {
    event.stopPropagation();
    try {
      await api.post(`/tools/${tool._id}/visit`);
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  return (
    <StyledCard 
      onClick={handleCardClick}
      sx={{ cursor: 'pointer' }}
    >
      {isAdmin && (
        <Box sx={{ 
          position: 'absolute', 
          top: 12,
          right: 12,
          zIndex: 2,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          '.MuiCard-root:hover &': {
            opacity: 1
          },
          '@media (max-width: 600px)': {
            opacity: 0.8,
            top: 8,
            right: 8,
          }
        }}>
          <IconButton 
            onClick={handleMenuOpen} 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '6px',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.95)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
            PaperProps={{
              sx: {
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                minWidth: '120px',
                mt: 1
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem 
              onClick={handleDelete}
              sx={{ 
                fontSize: '0.875rem',
                py: 1,
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.lighter'
                }
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      )}

      <ToolHeader>
        <IconWrapper>
          <img 
            src={tool.imageUrl || '/default-tool.png'} 
            alt={tool.name}
            className="tool-icon"
            onError={(e) => {
              e.target.src = '/default-tool.png';
              e.target.onerror = null;
            }}
          />
        </IconWrapper>
        <Box sx={{ flex: 1 }}>
          <Stack spacing={1.5}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              fontSize: '1.4rem',
              lineHeight: 1.3,
              color: '#1e1e2f',
              letterSpacing: '-0.01em'
            }}>
              {tool.name}
            </Typography>
            <RatingBox>
              <Rating 
                value={Number(tool.averageRating) || 0}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '0.875rem',
                  opacity: 0.7 
                }}
              >
                ({tool.ratings?.length || 0})
              </Typography>
            </RatingBox>
          </Stack>
        </Box>
      </ToolHeader>

      <CardContent sx={{ 
        pt: 3,
        pb: 3,
        px: 3.5,
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 3
      }}>
        <Box>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.7,
              mb: 2,
              fontSize: '0.9rem'
            }}
          >
            {tool.description}
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: 'wrap',
              '& > *': {
                mb: 1
              }
            }}
          >
            <CategoryChip label={tool.category} size="small" />
            {Array.isArray(tool.tags) && tool.tags.map((tag, index) => (
              <TagChip
                key={index}
                label={tag}
                size="small"
              />
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={1.5}>
          {tool.link && (
            <Link 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ flex: 1, textDecoration: 'none' }}
              onClick={(e) => {
                handleButtonClick(e);
                handleVisitClick(e);
              }}
            >
              <ActionButton
                fullWidth
                variant="contained"
                startIcon={<LaunchIcon />}
              >
                Visit Tool
              </ActionButton>
            </Link>
          )}
          <Link 
            onClick={handleButtonClick}
            sx={{ flex: 1, textDecoration: 'none', cursor: 'pointer' }}
          >
            <ActionButton
              fullWidth
              variant="outlined"
              startIcon={<BookIcon />}
              onClick={() => navigate(`/webstore/${tool._id}`)}
            >
              Dev Docs
            </ActionButton>
          </Link>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default ToolCard; 