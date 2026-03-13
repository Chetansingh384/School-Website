import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaImages, FaRunning, FaBullhorn, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalGallery: 0,
    totalActivities: 0,
    totalAnnouncements: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Gallery Images', value: stats.totalGallery, icon: <FaImages size={30} />, color: 'bg-blue-500', link: '/admin/gallery' },
    { title: 'Total Activities', value: stats.totalActivities, icon: <FaRunning size={30} />, color: 'bg-green-500', link: '/admin/activities' },
    { title: 'Total Announcements', value: stats.totalAnnouncements, icon: <FaBullhorn size={30} />, color: 'bg-purple-500', link: '/admin/announcements' },
    { title: 'System Status', value: 'Online', icon: <FaChartLine size={30} />, color: 'bg-yellow-500', link: '#' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
      <p className="text-gray-500 mb-8">Welcome to the SmartSchool Admin Panel. Manage your website content from here.</p>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center p-5">
                <div className={`p-4 rounded-lg ${card.color} text-white shadow-inner flex-shrink-0`}>
                  {card.icon}
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">{card.title}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">{card.value}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <Link to={card.link} className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-between">
                  <span>View Details</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/announcements" className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <FaBullhorn />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Post Announcement</p>
              <p className="text-sm text-gray-500">Create a new notice</p>
            </div>
          </Link>
          <Link to="/admin/gallery" className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <FaImages />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Upload to Gallery</p>
              <p className="text-sm text-gray-500">Add new school images</p>
            </div>
          </Link>
          <Link to="/admin/activities" className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
              <FaRunning />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Add Activity</p>
              <p className="text-sm text-gray-500">Log a new school event</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
