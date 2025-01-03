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

const ToolSubmissionForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tools', formData);
      navigate('/webstore');
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting tool');
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
          Submit Your Tool
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Tool Name"
            value={formData.name}
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
            name="link"
            label="Tool Link"
            value={formData.link}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit Tool
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ToolSubmissionForm; 