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
  alpha,
  List,
  ListItem,
} from '@mui/material';
import {
  Article as ArticleIcon,
  Code as CodeIcon,
  Store as StoreIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useState } from 'react';

// Enhanced styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #1e1e2f, #2c2c44)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  height: '60px',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
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

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100vw',
    marginTop: 0,
    background: 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)',
    color: '#fff',
    padding: theme.spacing(2),
    borderRadius: '0 0 16px 16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    '& .MuiListItem-root': {
      padding: 0,
      marginBottom: theme.spacing(1)
    },
    left: '0 !important',
    right: '0 !important',
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 60px)',
    overflowY: 'auto',
    position: 'fixed',
    top: '60px !important'
  }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  display: 'none',
  padding: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex'
  }
}));

const MobileMenuItem = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  justifyContent: 'flex-start',
  color: '#fff',
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(4px)'
  }
}));

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    handleClose();
    handleMobileMenuClose();
  };

  const handleMobileMenuClick = (to) => {
    handleMobileMenuClose();
    if (to) navigate(to);
  };

  const mobileMenu = (
    <Box>
      <List>
        <ListItem>
          <MobileMenuItem 
            component={Link} 
            to="/tech-news"
            onClick={() => handleMobileMenuClick('/tech-news')}
            startIcon={<ArticleIcon />}
          >
            Tech News
          </MobileMenuItem>
        </ListItem>
        <ListItem>
          <MobileMenuItem 
            component={Link} 
            to="/projects"
            onClick={() => handleMobileMenuClick('/projects')}
            startIcon={<CodeIcon />}
          >
            Projects
          </MobileMenuItem>
        </ListItem>
        <ListItem>
          <MobileMenuItem 
            component={Link} 
            to="/webstore"
            onClick={() => handleMobileMenuClick('/webstore')}
            startIcon={<StoreIcon />}
          >
            WebStore
          </MobileMenuItem>
        </ListItem>
        {isAdmin && (
          <ListItem>
            <MobileMenuItem 
              component={Link} 
              to="/admin"
              onClick={() => handleMobileMenuClick('/admin')}
              startIcon={<AdminPanelSettingsIcon />}
            >
              Admin Panel
            </MobileMenuItem>
          </ListItem>
        )}
        {currentUser ? (
          <>
            <ListItem>
              <MobileMenuItem 
                component={Link} 
                to="/profile"
                onClick={() => handleMobileMenuClick('/profile')}
                startIcon={<PersonIcon />}
              >
                Profile
              </MobileMenuItem>
            </ListItem>
            <ListItem>
              <MobileMenuItem 
                onClick={() => {
                  handleLogout();
                  handleMobileMenuClick('/');
                }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </MobileMenuItem>
            </ListItem>
          </>
        ) : (
          <ListItem>
            <MobileMenuItem 
              component={Link} 
              to="/auth"
              onClick={() => handleMobileMenuClick('/auth')}
              startIcon={<LoginIcon />}
            >
              Login
            </MobileMenuItem>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <StyledLink to="/">
            <LogoTypography variant="h6">
              SphereX
            </LogoTypography>
          </StyledLink>

          <MobileMenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={(event) => setMobileOpen(event.currentTarget)}
            sx={{ ml: 'auto', display: { md: 'none' } }}
          >
            <MenuIcon />
          </MobileMenuButton>

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

          <StyledMenu
            anchorEl={mobileOpen}
            open={Boolean(mobileOpen)}
            onClose={() => setMobileOpen(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            BackdropProps={{
              invisible: true
            }}
            elevation={0}
            sx={{ display: { md: 'none' } }}
          >
            {mobileMenu}
          </StyledMenu>
        </StyledToolbar>
      </StyledAppBar>
      <Box sx={{ height: '60px' }} />
    </>
  );
};

export default Navbar; 