import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { theme } from './styles/globalStyles';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import TechNews from './pages/TechNews';
import NewsDetail from './pages/NewsDetail';
import ProjectShowcase from './pages/ProjectShowcase';
import WebStore from './pages/WebStore';
import Auth from './pages/Auth';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import ProjectDetail from './pages/ProjectDetail';
import ToolDetail from './pages/ToolDetail';

// Create a wrapper component that uses useAuth
const AppRoutes = () => {
  return (
    <Router>
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tech-news" element={<TechNews />} />
            <Route path="/tech-news/:id" element={<NewsDetail />} />
            <Route path="/projects" element={<ProjectShowcase />} />
            <Route path="/webstore" element={<WebStore />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/webstore/:id" element={<ToolDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Main App component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 