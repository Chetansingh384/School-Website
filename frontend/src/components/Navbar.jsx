import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGraduationCap, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo1.jpeg';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const handleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [nav]);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Programs', path: '/programs' },
    { title: 'Fees', path: '/fees' },
    { title: 'Course Detail', path: '/course-detail' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Faculty', path: '/faculty' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img src={logoImg} alt="School Logo" className="h-12 w-auto object-contain rounded" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden xl:flex space-x-1 items-center">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-600/10 text-blue-600 shadow-sm backdrop-blur-sm' 
                        : scrolled 
                          ? (isDark ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-800 hover:text-blue-700 hover:bg-blue-50')
                          : 'text-white/95 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
            <li className="pl-4 flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  scrolled 
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
              <Link 
                to="/admin/login" 
                className={`inline-block whitespace-nowrap px-5 py-2.5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                  scrolled ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg' : 'bg-white text-blue-700 hover:bg-gray-50'
                }`}
              >
                Portal Login
              </Link>
            </li>
          </ul>

          {/* Hamburger Icon */}
          <div className="xl:hidden flex items-center">
            <button 
              onClick={handleNav} 
              className={`p-2 rounded-md focus:outline-none transition-colors ${
                scrolled 
                  ? (isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100') 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {nav ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out xl:hidden overflow-y-auto h-screen ${
          nav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col min-h-full pt-24 pb-12 px-6 relative">
          <button 
            onClick={closeNav} 
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white"
          >
            <FaTimes size={30} />
          </button>
          
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={index} className="transform transition-transform hover:translate-x-2">
                  <Link 
                    onClick={closeNav} 
                    to={link.path}
                    className={`block py-3 text-xl font-bold tracking-tight ${
                      isActive ? 'text-blue-400' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
            <li className="pt-8 space-y-4">
              <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/10 text-white">
                <span className="font-medium">Switch Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-blue-500 text-white shadow-lg"
                >
                  {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
                </button>
              </div>
              <Link 
                onClick={closeNav} 
                to="/admin/login" 
                className="block text-center w-full py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
              >
                Access Portal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
