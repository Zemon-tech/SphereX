import { useState, useEffect, useCallback } from 'react';
import { styled, Box, Container, Typography, Grid, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Alert, Button, InputAdornment } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import AddToolDialog from '../components/tools/AddToolDialog';
import api from '../services/api';
import ToolCard from '../components/tools/ToolCard';

const categories = ['all', 'development', 'productivity', 'design', 'testing', 'other'];

const StoreSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
  minHeight: '100vh',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(circle at 50% 0%, rgba(111, 157, 255, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4, 0, 8),
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-100px',
    left: 0,
    right: 0,
    height: '400px',
    background: 'radial-gradient(circle at 50% 50%, rgba(111, 157, 255, 0.1) 0%, transparent 50%)',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, #6f9dff 0%, #94b8ff 100%)',
    borderRadius: '4px',
    opacity: 0.7
  }
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  }
}));

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
  }, [fetchTools]);

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

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = category === 'all' || tool.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <StoreSection>
      <Container maxWidth="lg">
        <HeaderSection>
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              fontWeight: 800,
              fontSize: { xs: '2.75rem', md: '3.75rem' },
              background: 'linear-gradient(45deg, #1e1e2f 30%, #6f9dff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              position: 'relative',
              zIndex: 2
            }}
          >
            Web Store
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1.2rem', md: '1.35rem' },
              fontWeight: 400,
              mb: 6,
              position: 'relative',
              zIndex: 2,
              '& strong': {
                color: '#6f9dff',
                fontWeight: 600
              }
            }}
          >
            Discover <strong>premium tools</strong> and resources for your development journey
          </Typography>
        </HeaderSection>

        <FilterContainer>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flex: 1,
            '@media (max-width: 600px)': {
              flexDirection: 'column'
            }
          }}>
            <TextField
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: '#fff',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
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
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
              sx={{ 
                minWidth: 'fit-content',
                whiteSpace: 'nowrap'
              }}
            >
              Add Tool
            </Button>
          )}
        </FilterContainer>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: '12px',
              backgroundColor: 'rgba(211, 47, 47, 0.05)',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              '& .MuiAlert-icon': {
                color: 'error.main'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: 2
          }}>
            <CircularProgress 
              size={60}
              sx={{ 
                color: '#6f9dff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }}
            />
            <Typography color="text.secondary">Loading tools...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {filteredTools.map((tool) => (
              <Grid item xs={12} sm={6} md={4} key={tool._id}>
                <ToolCard tool={tool} onUpdate={fetchTools} />
              </Grid>
            ))}
            {filteredTools.length === 0 && (
              <Box sx={{ 
                width: '100%', 
                mt: 4, 
                textAlign: 'center',
                color: 'text.secondary'
              }}>
                <Typography variant="h6">
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
    </StoreSection>
  );
};

export default WebStore; 