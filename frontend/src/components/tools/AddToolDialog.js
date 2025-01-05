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
  Typography,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const categories = ['development', 'productivity', 'design', 'testing', 'other'];

const AddToolDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'development',
    imageUrl: '',
    websiteUrl: '',
    pricing: 'free'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      category: 'development',
      imageUrl: '',
      websiteUrl: '',
      pricing: 'free'
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
          Add New Tool
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            name="name"
            label="Tool Name"
            value={formData.name}
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
            name="websiteUrl"
            label="Website URL"
            value={formData.websiteUrl}
            onChange={handleChange}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Pricing</InputLabel>
            <Select
              name="pricing"
              value={formData.pricing}
              label="Pricing"
              onChange={handleChange}
              sx={{
                borderRadius: '12px'
              }}
            >
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="freemium">Freemium</MenuItem>
            </Select>
          </FormControl>
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
          Add Tool
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToolDialog; 