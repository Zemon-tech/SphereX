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

const categories = ['development', 'productivity', 'design', 'testing', 'other'];

const AddToolDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 'Free',
    category: 'development',
    link: '',
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
      name: '',
      description: '',
      price: 'Free',
      category: 'development',
      link: '',
      imageUrl: '',
      tags: []
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Tool</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Tool Name"
            value={formData.name}
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
            rows={3}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            placeholder="Free or enter price"
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
            name="link"
            label="Tool Link"
            value={formData.link}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
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
          Add Tool
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToolDialog; 