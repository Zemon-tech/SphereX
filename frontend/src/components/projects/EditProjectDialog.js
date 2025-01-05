import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const categories = ['web', 'mobile', 'desktop', 'ai', 'blockchain', 'other'];

const EditProjectDialog = ({ open, onClose, onSubmit, project }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    content: project?.content || '',
    category: project?.category || 'web',
    imageUrl: project?.imageUrl || '',
    githubUrl: project?.githubUrl || '',
    demoUrl: project?.demoUrl || '',
    tags: project?.tags?.join(', ') || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    onSubmit(submitData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        px: 3,
        py: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Edit Project
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
            <TextField
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={6}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
                sx={{
                  borderRadius: '12px'
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: 2.5
            }}>
              <TextField
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
              <TextField
                label="Demo URL"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            </Box>
            <TextField
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              fullWidth
              helperText="Enter tags separated by commas"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
          borderTop: '1px solid rgba(0,0,0,0.08)'
        }}>
          <Button 
            onClick={onClose}
            sx={{ 
              borderRadius: '10px',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '10px',
              px: 3,
              background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
              boxShadow: '0 4px 12px rgba(111, 157, 255, 0.2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1e1e2f 60%, #6f9dff 90%)',
                boxShadow: '0 6px 16px rgba(111, 157, 255, 0.3)',
              }
            }}
          >
            Update Project
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProjectDialog; 