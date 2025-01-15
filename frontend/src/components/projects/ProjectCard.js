import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete as DeleteIcon, Edit as EditIcon, GitHub as GitHubIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';

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
  paddingTop: '56.25%',
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
  backgroundColor: 'rgba(0,0,0,0.02)',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(111, 157, 255, 0.9)',
  color: '#fff',
  fontWeight: 500,
  textTransform: 'capitalize',
  marginRight: theme.spacing(1),
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '8px',
  color: theme.palette.text.secondary,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(4px)',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const TagsContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const TagChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(111, 157, 255, 0.1)',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(111, 157, 255, 0.2)',
  }
}));

const ProjectCard = ({ project, onDelete, onEdit, isAdmin }) => {
  const { _id, title, description, imageUrl, category, tags, githubUrl, demoUrl } = project;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [naturalDimensions, setNaturalDimensions] = useState(null);

  const handleImageLoad = (event) => {
    const img = event.target;
    setNaturalDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setImageLoaded(true);
  };

  const handleVisitClick = async (event) => {
    event.stopPropagation();
    try {
      await api.post(`/projects/${project._id}/visit`);
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  const handleCardClick = async () => {
    try {
      await api.post(`/projects/${project._id}/visit`);
      
      window.location.href = `/projects/${project._id}`;
    } catch (error) {
      console.error('Error tracking visit:', error);
      window.location.href = `/projects/${project._id}`;
    }
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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMediaWrapper className={imageLoaded ? 'maintain-dimension' : ''}>
          <StyledCardMedia
            className="card-media"
            component="img"
            image={imageUrl || '/default-project.jpg'}
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
          <Stack direction="row" spacing={1}>
            {githubUrl && (
              <ActionButton
                size="small"
                component="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVisitClick(e);
                }}
              >
                <GitHubIcon fontSize="small" />
              </ActionButton>
            )}
            {demoUrl && (
              <ActionButton
                size="small"
                component="a"
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVisitClick(e);
                }}
              >
                <LaunchIcon fontSize="small" />
              </ActionButton>
            )}
            {isAdmin && (
              <>
                <ActionButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(project);
                  }}
                >
                  <EditIcon fontSize="small" />
                </ActionButton>
                <ActionButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(project._id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </ActionButton>
              </>
            )}
          </Stack>
        </CardHeader>

        <CardContent sx={{ flexGrow: 1, pt: 0 }}>
          <Button
            component={Link}
            to={`/projects/${_id}`}
            sx={{
              display: 'block',
              textAlign: 'left',
              p: 0,
              '&:hover': {
                background: 'none'
              }
            }}
          >
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
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.6,
                mb: 2
              }}
            >
              {description}
            </Typography>
          </Button>
          <TagsContainer direction="row">
            {tags?.map((tag, index) => (
              <TagChip
                key={index}
                label={tag}
                size="small"
              />
            ))}
          </TagsContainer>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

export default ProjectCard; 