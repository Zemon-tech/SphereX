import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import AddToolDialog from '../components/tools/AddToolDialog';
import api from '../services/api';
import ToolCard from '../components/tools/ToolCard';

const categories = ['all', 'development', 'productivity', 'design', 'testing', 'other'];

const WebStore = () => {
  const { isAdmin } = useAuth();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/tools');
      setTools(response || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch tools');
      console.error('Error:', err);
      setTools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTools();
  }, [fetchTools, category]);

  const handleAddTool = async (toolData) => {
    try {
      console.log('Submitting tool:', toolData);
      const response = await api.post('/tools', toolData);
      console.log('Add tool response:', response);
      setTools(prev => [response, ...prev]);
      setOpenAddDialog(false);
    } catch (err) {
      console.error('Error adding tool:', err);
      setError('Failed to add tool');
    }
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          WebStore
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Tool
          </Button>
        )}
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Tools"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredTools.map((tool) => (
            <Grid item key={tool._id} xs={12} sm={6} md={4}>
              <ToolCard tool={tool} onUpdate={fetchTools} />
            </Grid>
          ))}
          {filteredTools.length === 0 && !loading && (
            <Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No tools found
              </Typography>
            </Box>
          )}
        </Grid>
      )}

      <AddToolDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddTool}
      />
    </Container>
  );
};

export default WebStore; 