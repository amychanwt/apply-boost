
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase, LineChart, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthenticated = false; // This would be replaced with actual auth state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600">JobMatcher</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}>
                Dashboard
              </Link>
              <Link to="/jobs" className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/jobs' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}>
                Find Jobs
              </Link>
              <Link to="/applications" className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/applications' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}>
                Applications
              </Link>
              <Link to="/profile" className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}>
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}>
                Dashboard
              </Link>
              <Link to="/jobs" className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/jobs' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'}`}>
                Browse Jobs
              </Link>
            </>
          )}
          
          {isAuthenticated ? (
            <Button variant="outline" size="sm" className="ml-4">
              <User size={16} className="mr-2" />
              Account
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <LogIn size={16} className="mr-2" />
                Log In
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none" 
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-slide-down">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <LineChart size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/jobs" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <Briefcase size={18} />
                  <span>Find Jobs</span>
                </Link>
                <Link 
                  to="/applications" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <LineChart size={18} />
                  <span>Applications</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <LineChart size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/jobs" 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <Briefcase size={18} />
                  <span>Browse Jobs</span>
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <Button variant="outline" className="w-full" onClick={closeMenu}>
                <User size={16} className="mr-2" />
                Account
              </Button>
            ) : (
              <div className="space-y-2">
                <Button variant="outline" className="w-full" onClick={closeMenu}>
                  <LogIn size={16} className="mr-2" />
                  Log In
                </Button>
                <Button className="w-full" onClick={closeMenu}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
