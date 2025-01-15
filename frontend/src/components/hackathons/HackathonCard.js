import { Card, CardContent, CardMedia, Typography, Box, Chip, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  CalendarToday, 
  LocationOn, 
  People, 
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowForward as ArrowForwardIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import api from '../../services/api';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  backgroundColor: '#fff',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    '& .card-media': {
      transform: 'scale(1.1)',
    }
  }
}));

const MediaWrapper = styled(Box)({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 aspect ratio
  overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
});

const StatusChip = styled(Chip)(({ status }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  fontWeight: 600,
  textTransform: 'capitalize',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  ...(status === 'upcoming' && {
    background: 'linear-gradient(45deg, #4caf50, #81c784)',
    color: '#fff',
  }),
  ...(status === 'ongoing' && {
    background: 'linear-gradient(45deg, #ff9800, #ffb74d)',
    color: '#fff',
  }),
  ...(status === 'ended' && {
    background: 'linear-gradient(45deg, #f44336, #e57373)',
    color: '#fff',
  }),
}));

const EditIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 72,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(4px)',
  '&:hover': {
    backgroundColor: '#fff',
    transform: 'scale(1.1)',
  }
}));

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(4px)',
  '&:hover': {
    backgroundColor: '#ffebee',
    transform: 'scale(1.1)',
  }
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem',
    color: theme.palette.primary.main,
  }
}));

const ViewButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  padding: '8px 16px',
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  fontWeight: 600,
  background: 'linear-gradient(45deg, #1e1e2f, #2c2c44)',
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #2c2c44, #1e1e2f)',
    transform: 'translateX(4px)',
  }
}));

const HackathonCard = ({ hackathon, hideActions, disableClick, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  const { title, description, startDate, endDate, location, maxParticipants, imageUrl, status } = hackathon;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      setDeleteDialogOpen(false);
      onDelete(hackathon._id);
    }
  };

  const handleCardClick = async () => {
    try {
      // Track the visit first
      await api.post(`/hackathons/${hackathon._id}/visit`);
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
    
    // Navigate after tracking attempt (whether it succeeds or fails)
    window.location.href = `/hackathons/${hackathon._id}`;
  };

  return (
    <>
      <Box>
        <StyledCard
          sx={{
            cursor: disableClick ? 'default' : 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: disableClick ? 'none' : 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            }
          }}
          onClick={handleCardClick}
        >
          <MediaWrapper>
            <StyledCardMedia
              className="card-media"
              image={imageUrl || 'https://via.placeholder.com/400x225?text=Hackathon'}
              title={title}
            />
            <StatusChip 
              label={status} 
              status={status}
              size="small"
            />
            {isAdmin && !hideActions && (
              <>
                {onEdit && (
                  <EditIconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(hackathon);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </EditIconButton>
                )}
                {onDelete && (
                  <DeleteIconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </DeleteIconButton>
                )}
              </>
            )}
          </MediaWrapper>

          <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
              <InfoBox>
                <CalendarToday />
                <Typography variant="body2">
                  {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </Typography>
              </InfoBox>
              
              <InfoBox>
                <LocationOn />
                <Typography variant="body2">{location}</Typography>
              </InfoBox>

              <InfoBox>
                <People />
                <Typography variant="body2">Max Participants: {maxParticipants}</Typography>
              </InfoBox>
            </Box>

            <ViewButton
              component={Link}
              to={`/hackathons/${hackathon._id}`}
              endIcon={<ArrowForwardIcon />}
              onClick={handleCardClick}
            >
              View Details
            </ViewButton>
          </CardContent>
        </StyledCard>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Hackathon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HackathonCard; 