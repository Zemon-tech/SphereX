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
  Avatar,
  Box,
  alpha
} from '@mui/material';
import { useState } from 'react';

// Enhanced styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #1e1e2f, #2c2c44)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  height: '60px',
  justifyContent: 'center',
}));

const StyledToolbar = styled(Toolbar)({
  minHeight: '60px !important',
  padding: '0 24px !important',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #ffffff, #6f9dff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '1.5px',
  fontSize: '1.5rem',
  fontFamily: "'Poppins', sans-serif",
  textTransform: 'uppercase',
  '&:hover': {
    background: 'linear-gradient(45deg, #ffffff, #94b8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  margin: '0 4px',
  padding: '6px 12px',
  borderRadius: '6px',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.3px',
  transition: 'all 0.2s ease-in-out',
  opacity: 0.85,
  '&:hover': {
    background: alpha('#fff', 0.08),
    transform: 'translateY(-1px)',
    opacity: 1,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  cursor: 'pointer',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    transform: 'scale(1.05)',
  },
}));

const NavLinks = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    marginTop: '8px',
    minWidth: '180px',
    background: '#1e1e2f',
    color: '#fff',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
    '& .MuiMenu-list': {
      padding: '4px',
    },
    '& .MuiMenuItem-root': {
      padding: '10px 16px',
      borderRadius: '6px',
      margin: '2px 0',
      fontSize: '0.9rem',
      transition: 'all 0.2s',
      color: '#fff',
      '&:hover': {
        backgroundColor: alpha('#fff', 0.08),
      },
    },
  },
}));

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
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <StyledLink to="/">
          <LogoTypography variant="h6">
            SphereX
          </LogoTypography>
        </StyledLink>

        <NavLinks>
          <NavButton component={StyledLink} to="/tech-news">
            Tech News
          </NavButton>
          <NavButton component={StyledLink} to="/projects">
            Projects
          </NavButton>
          <NavButton component={StyledLink} to="/webstore">
            WebStore
          </NavButton>

          {currentUser ? (
            <>
              {isAdmin && (
                <NavButton 
                  component={Link} 
                  to="/admin"
                  sx={{ 
                    background: alpha('#fff', 0.1),
                    '&:hover': {
                      background: alpha('#fff', 0.15),
                    }
                  }}
                >
                  Admin Panel
                </NavButton>
              )}
              <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
                <StyledAvatar 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName}
                >
                  {currentUser.displayName?.charAt(0)}
                </StyledAvatar>
              </IconButton>
              <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </StyledMenu>
            </>
          ) : (
            <NavButton 
              component={StyledLink} 
              to="/auth"
              sx={{
                border: '1px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  border: '1px solid rgba(255,255,255,0.5)',
                }
              }}
            >
              Login
            </NavButton>
          )}
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar; 