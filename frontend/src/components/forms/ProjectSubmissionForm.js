import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const ProjectSubmissionForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    imageUrl: '',
    tags: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/projects', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      });
      navigate('/projects');
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting project');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Submit Your Project
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            name="githubLink"
            label="GitHub Link"
            value={formData.githubLink}
            onChange={handleChange}
            required
          />
          <TextField
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <TextField
            name="tags"
            label="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
            helperText="Enter tags separated by commas"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit Project
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProjectSubmissionForm; 