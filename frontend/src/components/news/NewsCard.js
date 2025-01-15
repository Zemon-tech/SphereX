import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import api from '../../services/api';
import { useState } from 'react';
import EditNewsDialog from './EditNewsDialog';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  background: '#fff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
    '& .card-media': {
      transform: 'scale(1.05)',
    }
  }
}));

const CardMediaWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '56.25%', // 16:9 aspect ratio by default
  overflow: 'hidden',
  '&.maintain-dimension': {
    paddingTop: 'unset',
    height: 'auto',
    '& .card-media': {
      position: 'relative',
      height: 'auto',
      maxHeight: '400px',
      minHeight: '200px',
    }
  }
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease',
  objectFit: 'contain',
  objectPosition: 'center',
  backgroundColor: 'rgba(0,0,0,0.02)', // Subtle background for transparent images
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(111, 157, 255, 0.9)',
  color: '#fff',
  fontWeight: 500,
  textTransform: 'capitalize',
  marginRight: theme.spacing(1),
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
  padding: '4px',
  '&:hover': {
    backgroundColor: theme.palette.error.light,
    color: '#fff',
  }
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 1, 2),
}));

const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: '4px'
});

const EditButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '4px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  }
}));

const NewsCard = ({ news, onDelete, onEdit, isAdmin }) => {
  const { _id, title, description, imageUrl, category, createdAt } = news;
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [naturalDimensions, setNaturalDimensions] = useState(null);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleImageLoad = (event) => {
    const img = event.target;
    setNaturalDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setImageLoaded(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.delete(`/news/${_id}`);
      onDelete(_id);
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      const response = await api.put(`/news/${news._id}`, updatedData);
      onEdit(response);
      setOpenEditDialog(false);
    } catch (err) {
      console.error('Error updating news:', err);
    }
  };

  const handleCardClick = async () => {
    try {
      // Track the visit first
      await api.post(`/news/${news._id}/visit`);
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
    
    // Navigate after tracking attempt (whether it succeeds or fails)
    window.location.href = `/tech-news/${news._id}`;
  };

  return (
    <StyledCard 
      onClick={handleCardClick}
      sx={{ 
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          '& .card-media': {
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      <CardMediaWrapper className={imageLoaded ? 'maintain-dimension' : ''}>
        <StyledCardMedia
          className="card-media"
          component="img"
          image={imageUrl || '/default-news.jpg'}
          title={title}
          onLoad={handleImageLoad}
          sx={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            ...(naturalDimensions && {
              objectFit: 'contain',
              maxHeight: '400px'
            })
          }}
        />
      </CardMediaWrapper>
      
      <CardHeader>
        <CategoryChip label={category} size="small" />
        {isAdmin && (
          <ButtonGroup>
            <EditButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenEditDialog(true);
              }}
              aria-label="edit"
            >
              <EditIcon fontSize="small" />
            </EditButton>
            <DeleteButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(e);
              }}
              aria-label="delete"
            >
              <DeleteIcon fontSize="small" />
            </DeleteButton>
          </ButtonGroup>
        )}
      </CardHeader>

      <CardContent sx={{ pt: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.3,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: 'right',
            mt: 'auto'
          }}
        >
          {formatDate(createdAt)}
        </Typography>
      </CardContent>

      <EditNewsDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleEdit}
        news={news}
      />
    </StyledCard>
  );
};

export default NewsCard; 