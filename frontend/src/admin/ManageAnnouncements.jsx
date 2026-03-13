import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaTrash, FaPlus, FaBullhorn } from 'react-icons/fa';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await api.get('/announcements');
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data } = await api.post('/announcements', { title, content });
      setTitle('');
      setContent('');
      setAnnouncements([data, ...announcements]);
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert(error.response?.data?.message || 'Failed to add announcement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await api.delete(`/announcements/${id}`);
        setAnnouncements(announcements.filter(ann => ann._id !== id));
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Failed to delete announcement');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBullhorn className="mr-3 text-purple-600" /> Manage Announcements
        </h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaPlus className="mr-2 text-purple-600" /> Post New Announcement
        </h2>
        <form onSubmit={handleAddAnnouncement} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title / Headline</label>
            <input 
              type="text" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g. School Closed due to Heavy Rain"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Content</label>
            <textarea 
              required
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Provide detailed information here..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition disabled:bg-purple-300"
            >
              {saving ? 'Posting...' : 'Post Announcement'}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading announcements...</div>
      ) : (
        <div className="space-y-4">
          {announcements.length > 0 ? announcements.map((ann) => (
            <div key={ann._id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition">
              <div>
                <div className="text-xs text-gray-500 mb-1 font-semibold">
                  {new Date(ann.date).toLocaleString()}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{ann.title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{ann.content}</p>
              </div>
              <div>
                <button 
                  onClick={() => handleDelete(ann._id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-100">
              No announcements found. Post one above!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncements;
