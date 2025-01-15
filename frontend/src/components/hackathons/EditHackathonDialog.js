import { useState, useEffect } from 'react';
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

const EditHackathonDialog = ({ open, onClose, onSuccess, hackathon }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: '',
    imageUrl: '',
    status: 'upcoming',
    rules: '',
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
    registrationLink: '',
  });

  useEffect(() => {
    if (hackathon) {
      setFormData({
        ...hackathon,
        startDate: hackathon.startDate ? new Date(hackathon.startDate).toISOString().slice(0, 16) : '',
        endDate: hackathon.endDate ? new Date(hackathon.endDate).toISOString().slice(0, 16) : '',
        registration: hackathon.registration || {
          process: '',
          deadline: null,
          fee: '',
        },
        themes: hackathon.themes || [],
        eligibility: hackathon.eligibility || [],
        prizes: hackathon.prizes || [],
        perks: hackathon.perks || [],
        judgingCriteria: hackathon.judgingCriteria || [],
        sponsors: hackathon.sponsors || [],
        contact: hackathon.contact || [],
        socialMedia: hackathon.socialMedia || [],
      });
    }
  }, [hackathon]);

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
      const response = await api.put(`/hackathons/${hackathon._id}`, formattedData);
      onSuccess(response);
      onClose();
    } catch (error) {
      console.error('Error updating hackathon:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Hackathon</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <StyledAccordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Basic Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
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

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Themes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.themes.map((theme, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Theme Name"
                        value={theme.name}
                        onChange={(e) => handleItemChange('themes', index, 'name', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Theme Description"
                        value={theme.description}
                        onChange={(e) => handleItemChange('themes', index, 'description', e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('themes', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('themes')}>
                    <AddIcon /> Add Theme
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Eligibility</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.eligibility.map((criteria, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Eligibility Criteria"
                        value={criteria.criteria}
                        onChange={(e) => handleItemChange('eligibility', index, 'criteria', e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('eligibility', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('eligibility')}>
                    <AddIcon /> Add Eligibility Criteria
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>Prizes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.prizes.map((prize, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Prize Position"
                        value={prize.position}
                        onChange={(e) => handleItemChange('prizes', index, 'position', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Prize"
                        value={prize.prize}
                        onChange={(e) => handleItemChange('prizes', index, 'prize', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Prize Description"
                        value={prize.description}
                        onChange={(e) => handleItemChange('prizes', index, 'description', e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('prizes', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('prizes')}>
                    <AddIcon /> Add Prize
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography>Perks</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.perks.map((perk, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Perk Title"
                        value={perk.title}
                        onChange={(e) => handleItemChange('perks', index, 'title', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Perk Description"
                        value={perk.description}
                        onChange={(e) => handleItemChange('perks', index, 'description', e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('perks', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('perks')}>
                    <AddIcon /> Add Perk
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography>Judging Criteria</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.judgingCriteria.map((criteria, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Judging Criteria"
                        value={criteria.criteria}
                        onChange={(e) => handleItemChange('judgingCriteria', index, 'criteria', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Weightage"
                        value={criteria.weightage}
                        onChange={(e) => handleItemChange('judgingCriteria', index, 'weightage', e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('judgingCriteria', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('judgingCriteria')}>
                    <AddIcon /> Add Judging Criteria
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel7a-content"
                id="panel7a-header"
              >
                <Typography>Sponsors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.sponsors.map((sponsor, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Sponsor Name"
                        value={sponsor.name}
                        onChange={(e) => handleItemChange('sponsors', index, 'name', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Sponsor Logo"
                        value={sponsor.logo}
                        onChange={(e) => handleItemChange('sponsors', index, 'logo', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Sponsor Website"
                        value={sponsor.website}
                        onChange={(e) => handleItemChange('sponsors', index, 'website', e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('sponsors', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('sponsors')}>
                    <AddIcon /> Add Sponsor
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel8a-content"
                id="panel8a-header"
              >
                <Typography>Contact Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.contact.map((contact, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Contact Name"
                        value={contact.name}
                        onChange={(e) => handleItemChange('contact', index, 'name', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Contact Role"
                        value={contact.role}
                        onChange={(e) => handleItemChange('contact', index, 'role', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Contact Email"
                        value={contact.email}
                        onChange={(e) => handleItemChange('contact', index, 'email', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Contact Phone"
                        value={contact.phone}
                        onChange={(e) => handleItemChange('contact', index, 'phone', e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('contact', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('contact')}>
                    <AddIcon /> Add Contact
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel9a-content"
                id="panel9a-header"
              >
                <Typography>Social Media</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {formData.socialMedia.map((media, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                      <TextField
                        label="Social Media Platform"
                        value={media.platform}
                        onChange={(e) => handleItemChange('socialMedia', index, 'platform', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Social Media Link"
                        value={media.link}
                        onChange={(e) => handleItemChange('socialMedia', index, 'link', e.target.value)}
                        fullWidth
                      />
                      <IconButton onClick={() => handleRemoveItem('socialMedia', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                  <Button onClick={() => handleAddItem('socialMedia')}>
                    <AddIcon /> Add Social Media
                  </Button>
                </Stack>
              </AccordionDetails>
            </StyledAccordion>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditHackathonDialog; 