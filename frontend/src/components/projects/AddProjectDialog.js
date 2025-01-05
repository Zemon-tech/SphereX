import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  IconButton,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const categories = ['web', 'mobile', 'desktop', 'ai', 'blockchain', 'other'];

const AddProjectDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'web',
    imageUrl: '',
    githubUrl: '',
    demoUrl: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      content: '',
      category: 'web',
      imageUrl: '',
      githubUrl: '',
      demoUrl: '',
      tags: []
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
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
          Add New Project
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            name="title"
            label="Title"
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
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />
          <TextField
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
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
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />
          <TextField
            name="githubUrl"
            label="GitHub URL"
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
            name="demoUrl"
            label="Demo URL"
            value={formData.demoUrl}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />
          <TextField
            label="Add Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            fullWidth
            helperText="Press Enter to add tags"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                size="small"
                sx={{
                  borderRadius: '8px',
                  background: 'rgba(111, 157, 255, 0.1)',
                  color: '#6f9dff',
                  '& .MuiChip-deleteIcon': {
                    color: '#6f9dff'
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
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
          onClick={handleSubmit}
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
          Add Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectDialog; 