import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const categories = ['development', 'productivity', 'design', 'testing', 'other'];

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
    color: '#fff',
    fontWeight: 600
  }
}));

const EditToolDialog = ({ open, onClose, onSubmit, tool }) => {
  const [formData, setFormData] = useState({
    name: tool?.name || '',
    description: tool?.description || '',
    category: tool?.category || 'development',
    imageUrl: tool?.imageUrl || '',
    link: tool?.link || '',
    tags: tool?.tags?.join(', ') || '',
    features: tool?.features || [],
    previewImages: tool?.previewImages?.join('\n') || '',
    creator: tool?.creator || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value
    };
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: '', description: '' }]
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      previewImages: formData.previewImages.split('\n').map(url => url.trim()).filter(Boolean),
      features: formData.features.filter(f => f.title || f.description)
    };
    onSubmit(submitData);
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Tool</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Tool Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Creator"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Tags (comma-separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              fullWidth
              helperText="Enter tags separated by commas"
            />
            <TextField
              label="Preview Images (one URL per line)"
              name="previewImages"
              value={formData.previewImages}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              helperText="Enter image URLs, one per line"
            />
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Features
              </Typography>
              <Stack spacing={2}>
                {formData.features.map((feature, index) => (
                  <Box 
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      position: 'relative'
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeFeature(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'error.main'
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Stack spacing={2}>
                      <TextField
                        label="Feature Title"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Feature Description"
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        multiline
                        rows={2}
                        fullWidth
                        size="small"
                      />
                    </Stack>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addFeature}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Add Feature
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2c2c44 0%, #1e1e2f 100%)',
              }
            }}
          >
            Update Tool
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default EditToolDialog; 