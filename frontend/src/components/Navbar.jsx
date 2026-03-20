import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import logoImg from '../assets/logo1.jpeg';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img 
                src={logoImg} 
                alt="School Logo" 
                className="h-12 md:h-14 w-auto object-contain" 
              />
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
                          ? 'text-slate-200 hover:text-white hover:bg-white/10'
                          : 'text-white/95 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger Icon */}
          <div className="xl:hidden flex items-center">
            <button 
              onClick={handleNav} 
              className={`p-2 rounded-md focus:outline-none transition-colors ${
                scrolled 
                  ? 'text-white hover:bg-white/10' 
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
