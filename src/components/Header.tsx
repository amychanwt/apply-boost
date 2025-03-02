import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase, LineChart, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Apply Boost
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
            <Link to="/jobs" className="text-gray-600 hover:text-gray-900">
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/applications" className="text-gray-600 hover:text-gray-900">
                  Applications
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={logout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <LogIn size={16} className="mr-2" />
                  Log In / Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/how-it-works"
              className="block text-gray-600 hover:text-gray-900"
              onClick={closeMenu}
            >
              How It Works
            </Link>
            
            <Link
              to="/jobs"
              className="block text-gray-600 hover:text-gray-900"
              onClick={closeMenu}
            >
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/applications"
                  className="block text-gray-600 hover:text-gray-900"
                  onClick={closeMenu}
                >
                  Applications
                </Link>
                <Link
                  to="/dashboard"
                  className="block text-gray-600 hover:text-gray-900"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Button
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/login" className="w-full">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" onClick={closeMenu}>
                  <LogIn size={16} className="mr-2" />
                  Log In / Sign Up
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
