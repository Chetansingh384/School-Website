import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaImages, FaRunning, FaBullhorn, FaUserTie, FaMoneyBillWave, FaBookOpen, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <FaHome /> },
    { title: 'Manage Gallery', path: '/admin/gallery', icon: <FaImages /> },
    { title: 'Manage Activities', path: '/admin/activities', icon: <FaRunning /> },
    { title: 'Manage Announcements', path: '/admin/announcements', icon: <FaBullhorn /> },
    { title: 'Manage Principal Message', path: '/admin/principal-message', icon: <FaUserTie /> },
    { title: 'Manage Fees', path: '/admin/fees', icon: <FaMoneyBillWave /> },
    { title: 'Manage Programs', path: '/admin/programs', icon: <FaBookOpen /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-blue-900 text-white w-64 flex-shrink-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full absolute h-full z-20'}`}>
        <div className="h-16 flex items-center justify-center border-b border-blue-800">
          <h2 className="text-2xl font-bold text-yellow-500">Admin Panel</h2>
        </div>
        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
          <nav className="p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                  location.pathname === item.path ? 'bg-blue-800 text-yellow-400' : 'hover:bg-blue-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-blue-800">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-300 hover:bg-blue-800 hover:text-red-400 transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-4 justify-between z-10">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              Admin Status: Active
            </span>
            <Link to="/" className="text-blue-600 hover:underline text-sm font-medium" target="_blank">
              View Site ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-full p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
