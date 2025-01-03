import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { useState } from 'react';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
});

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">SphereX</StyledLink>
        </Typography>

        <Button color="inherit" component={StyledLink} to="/tech-news">
          Tech News
        </Button>
        <Button color="inherit" component={StyledLink} to="/projects">
          Projects
        </Button>
        <Button color="inherit" component={StyledLink} to="/webstore">
          WebStore
        </Button>

        {currentUser ? (
          <>
            {isAdmin && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin"
                sx={{ mr: 2 }}
              >
                Admin Panel
              </Button>
            )}
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={currentUser.photoURL} alt={currentUser.displayName}>
                {currentUser.displayName?.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={StyledLink} to="/auth">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 