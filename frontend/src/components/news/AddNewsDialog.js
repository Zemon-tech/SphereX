import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
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
  Stack
} from '@mui/material';

const categories = ['technology', 'development', 'ai', 'blockchain', 'other'];

const AddNewsDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'technology',
    imageUrl: '',
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
      category: 'technology',
      imageUrl: '',
      tags: []
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Article</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <TextField
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="imageUrl"
            label="Thumbnail URL"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            placeholder="Enter image URL"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Add Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            fullWidth
            helperText="Press Enter to add tags"
            sx={{ mb: 2 }}
          />
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Article
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewsDialog; 