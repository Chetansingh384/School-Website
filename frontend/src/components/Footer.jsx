import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGraduationCap } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10 border-t-8 border-blue-600 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-600 to-purple-800 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer">
              <FaGraduationCap className="text-5xl text-blue-500" />
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight leading-none">Smart<span className="text-blue-500">School</span></h2>
                <p className="text-xs text-blue-300 font-semibold tracking-widest uppercase mt-1">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Empowering the next generation with cutting-edge knowledge, strong moral values, and the character to shape a brighter future for the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-all duration-300 hover:-translate-y-1">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Academic Programs', 'Faculty', 'Admissions', 'Contact Us'].map((item, i) => (
                <li key={i}>
                  <Link to={item.toLowerCase().includes('home') ? '/' : `/${item.toLowerCase().split(' ')[0]}`} className="text-gray-400 hover:text-blue-400 flex items-center transition-colors duration-200">
                    <span className="text-blue-500 mr-2 text-xs">➽</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-purple-500 rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {['Student Portal', 'Parent Gateway', 'Fee Structure', 'Event Calendar', 'Admin Login'].map((item, i) => (
                <li key={i}>
                  <Link 
                    to={item === 'Admin Login' ? '/admin/login' : item === 'Fee Structure' ? '/fees' : '#'} 
                    className="text-gray-400 hover:text-purple-400 flex items-center transition-colors duration-200"
                  >
                    <span className="text-purple-500 mr-2 text-xs">➽</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 mr-4 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">123 Education Boulevard, Innovation District, Knowledge City 54321</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-indigo-400 mr-4 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-indigo-400 mr-4 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">admissions@smartschool.edu</span>
              </li>
            </ul>
            
            <div className="mt-6 bg-gray-900 rounded-lg p-1 border border-gray-800 flex">
              <input type="email" placeholder="Subscribe to newsletter" className="bg-transparent border-none outline-none text-sm text-gray-300 px-4 w-full" />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-4 py-2 text-sm font-semibold transition-colors">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SmartSchool. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
