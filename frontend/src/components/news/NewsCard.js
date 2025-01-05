import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
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

const CardMediaWrapper = styled(Box)({
  position: 'relative',
  height: '280px',
  overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
  height: '100%',
  transition: 'transform 0.3s ease',
  objectFit: 'cover',
  objectPosition: 'center',
});

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

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

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

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
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

  return (
    <StyledCard>
      <StyledLink to={`/tech-news/${_id}`}>
        <CardMediaWrapper>
          <StyledCardMedia
            className="card-media"
            image={imageUrl || '/default-news.jpg'}
            title={title}
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
                  setOpenEditDialog(true);
                }}
                aria-label="edit"
              >
                <EditIcon fontSize="small" />
              </EditButton>
              <DeleteButton
                size="small"
                onClick={handleDelete}
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
      </StyledLink>

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