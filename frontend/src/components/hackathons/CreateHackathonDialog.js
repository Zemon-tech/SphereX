import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../services/api';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
}));

const initialFormData = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  maxParticipants: '',
  imageUrl: '',
  status: 'upcoming',
  registrationLink: '',
  themes: [],
  eligibility: [],
  registration: {
    process: '',
    deadline: null,
    fee: '',
  },
  prizes: [],
  perks: [],
  judgingCriteria: [],
  sponsors: [],
  contact: [],
  socialMedia: [],
};

const CreateHackathonDialog = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleAddItem = (field) => {
    if (field === 'themes') {
      setFormData(prev => ({
        ...prev,
        themes: [...prev.themes, { name: '', description: '' }]
      }));
    } else if (field === 'prizes') {
      setFormData(prev => ({
        ...prev,
        prizes: [...prev.prizes, { position: '', prize: '', description: '' }]
      }));
    } else if (field === 'perks') {
      setFormData(prev => ({
        ...prev,
        perks: [...prev.perks, { title: '', description: '' }]
      }));
    } else if (field === 'judgingCriteria') {
      setFormData(prev => ({
        ...prev,
        judgingCriteria: [...prev.judgingCriteria, { criteria: '', weightage: '' }]
      }));
    } else if (field === 'sponsors') {
      setFormData(prev => ({
        ...prev,
        sponsors: [...prev.sponsors, { name: '', logo: '', website: '' }]
      }));
    } else if (field === 'contact') {
      setFormData(prev => ({
        ...prev,
        contact: [...prev.contact, { name: '', role: '', email: '', phone: '' }]
      }));
    } else if (field === 'socialMedia') {
      setFormData(prev => ({
        ...prev,
        socialMedia: [...prev.socialMedia, { platform: '', link: '' }]
      }));
    } else if (field === 'eligibility') {
      setFormData(prev => ({
        ...prev,
        eligibility: [...prev.eligibility, { criteria: '' }]
      }));
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (field, index, key, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };
      const response = await api.post('/hackathons', formattedData);
      onSuccess(response);
      onClose();
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating hackathon:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Hackathon</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Basic Information */}
            <StyledAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Basic Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <TextField
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />

                  <TextField
                    label="Start Date"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="End Date"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Maximum Participants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Rules"
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    multiline
                    rows={4}
                    fullWidth
                  />

                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      label="Status"
                      required
                    >
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                      <MenuItem value="ongoing">Ongoing</MenuItem>
                      <MenuItem value="ended">Ended</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    label="Image URL"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    fullWidth
                  />

                  <TextField
                    label="Registration Link"
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    placeholder="https://example.com/register"
                    fullWidth
                    helperText="External registration link for the hackathon"
                  />
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Themes */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Themes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.themes.map((theme, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Theme Name"
                          value={theme.name}
                          onChange={(e) => handleItemChange('themes', index, 'name', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Description"
                          value={theme.description}
                          onChange={(e) => handleItemChange('themes', index, 'description', e.target.value)}
                          multiline
                          rows={2}
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('themes', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('themes')}
                    variant="outlined"
                  >
                    Add Theme
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Eligibility */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Eligibility Criteria</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.eligibility.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <TextField
                        label="Eligibility Criteria"
                        value={item.criteria}
                        onChange={(e) => handleItemChange('eligibility', index, 'criteria', e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('eligibility', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('eligibility')}
                    variant="outlined"
                  >
                    Add Eligibility Criteria
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Prizes */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Prizes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.prizes.map((prize, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Position"
                          value={prize.position}
                          onChange={(e) => handleItemChange('prizes', index, 'position', e.target.value)}
                          placeholder="e.g., First Place, Runner Up"
                          fullWidth
                        />
                        <TextField
                          label="Prize"
                          value={prize.prize}
                          onChange={(e) => handleItemChange('prizes', index, 'prize', e.target.value)}
                          placeholder="e.g., $5000"
                          fullWidth
                        />
                        <TextField
                          label="Description"
                          value={prize.description}
                          onChange={(e) => handleItemChange('prizes', index, 'description', e.target.value)}
                          multiline
                          rows={2}
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('prizes', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('prizes')}
                    variant="outlined"
                  >
                    Add Prize
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Perks */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Perks & Benefits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.perks.map((perk, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Perk Title"
                          value={perk.title}
                          onChange={(e) => handleItemChange('perks', index, 'title', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Description"
                          value={perk.description}
                          onChange={(e) => handleItemChange('perks', index, 'description', e.target.value)}
                          multiline
                          rows={2}
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('perks', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('perks')}
                    variant="outlined"
                  >
                    Add Perk
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Judging Criteria */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Judging Criteria</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.judgingCriteria.map((criteria, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Criteria"
                          value={criteria.criteria}
                          onChange={(e) => handleItemChange('judgingCriteria', index, 'criteria', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Weightage (%)"
                          value={criteria.weightage}
                          onChange={(e) => handleItemChange('judgingCriteria', index, 'weightage', e.target.value)}
                          type="number"
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('judgingCriteria', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('judgingCriteria')}
                    variant="outlined"
                  >
                    Add Criteria
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Sponsors */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Sponsors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.sponsors.map((sponsor, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Sponsor Name"
                          value={sponsor.name}
                          onChange={(e) => handleItemChange('sponsors', index, 'name', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Logo URL"
                          value={sponsor.logo}
                          onChange={(e) => handleItemChange('sponsors', index, 'logo', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Website"
                          value={sponsor.website}
                          onChange={(e) => handleItemChange('sponsors', index, 'website', e.target.value)}
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('sponsors', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('sponsors')}
                    variant="outlined"
                  >
                    Add Sponsor
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Contact Information */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Contact Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.contact.map((contact, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Name"
                          value={contact.name}
                          onChange={(e) => handleItemChange('contact', index, 'name', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Role"
                          value={contact.role}
                          onChange={(e) => handleItemChange('contact', index, 'role', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Email"
                          value={contact.email}
                          onChange={(e) => handleItemChange('contact', index, 'email', e.target.value)}
                          type="email"
                          fullWidth
                        />
                        <TextField
                          label="Phone"
                          value={contact.phone}
                          onChange={(e) => handleItemChange('contact', index, 'phone', e.target.value)}
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('contact', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('contact')}
                    variant="outlined"
                  >
                    Add Contact
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            {/* Social Media */}
            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Social Media</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {formData.socialMedia.map((social, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Stack spacing={2} sx={{ flex: 1 }}>
                        <TextField
                          label="Platform"
                          value={social.platform}
                          onChange={(e) => handleItemChange('socialMedia', index, 'platform', e.target.value)}
                          fullWidth
                        />
                        <TextField
                          label="Link"
                          value={social.link}
                          onChange={(e) => handleItemChange('socialMedia', index, 'link', e.target.value)}
                          fullWidth
                        />
                      </Stack>
                      <IconButton onClick={() => handleRemoveItem('socialMedia', index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem('socialMedia')}
                    variant="outlined"
                  >
                    Add Social Media
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateHackathonDialog; 