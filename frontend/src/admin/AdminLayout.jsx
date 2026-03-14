import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaImages, FaCalendarAlt, FaBullhorn, 
  FaUserTie, FaSignOutAlt, FaBars, FaTimes, FaMoneyBillWave, FaBookOpen,
  FaUsers, FaBook, FaEnvelope
} from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ManageBooks from './ManageBooks';
import ManageContact from './ManageContact';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('adminInfo'); // Clean up fallback
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on navigation only on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('adminInfo');
      navigate('/admin/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-900 font-bold">Loading Admin...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: FaImages },
    { name: 'Manage Activities', path: '/admin/activities', icon: FaCalendarAlt },
    { name: 'Manage Announcements', path: '/admin/announcements', icon: FaBullhorn },
    { name: 'Manage Principal Message', path: '/admin/principal-message', icon: FaUserTie },
    { name: 'Manage Fees', path: '/admin/fees', icon: FaMoneyBillWave },
    { name: 'Manage Programs', path: '/admin/programs', icon: FaBookOpen },
    { name: 'Manage Faculty', path: '/admin/faculty', icon: FaUsers },
    { name: 'Manage Books', path: '/admin/books', icon: FaBook },
    { name: 'Manage Contact', path: '/admin/contact', icon: FaEnvelope },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-blue-950 text-white w-64 flex-shrink-0 transition-all duration-300 ease-in-out fixed lg:static h-full z-30 shadow-2xl lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-blue-900/50">
          <h2 className="text-xl font-black text-yellow-500 tracking-tighter uppercase italic">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white p-1">
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <nav className="p-4 space-y-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all group ${
                  location.pathname === item.path 
                    ? 'bg-blue-800 text-yellow-400 shadow-lg scale-[1.02]' 
                    : 'hover:bg-white/10 hover:text-white text-blue-100'
                }`}
              >
                <item.icon className={`text-xl flex-shrink-0 transition-transform ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-semibold text-sm truncate">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5 bg-blue-900/20">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full p-3 rounded-xl text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold shadow-sm hover:shadow-red-500/20"
            >
              <FaSignOutAlt className="text-xl flex-shrink-0" />
              <span className="text-sm">Logout Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
        <header className="h-16 bg-white shadow-md flex items-center px-4 md:px-6 justify-between z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 bg-gray-50 Transition-colors"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <h1 className="hidden md:block text-lg font-bold text-gray-800">
              {navItems.find(n => n.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link to="/" className="hidden xs:block text-blue-600 hover:text-blue-800 text-xs md:text-sm font-bold bg-blue-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-blue-100 transition-all hover:shadow-sm" target="_blank">
              View Website ↗
            </Link>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-2 py-1 md:px-3 md:py-1.5">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs md:text-sm font-black shadow-md">
                AD
              </div>
              <span className="hidden sm:inline text-xs font-bold text-gray-700">Administrator</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 bg-gray-50/50">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 min-h-full p-4 sm:p-6 md:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
