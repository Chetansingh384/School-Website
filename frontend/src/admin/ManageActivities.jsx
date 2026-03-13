import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaTrash, FaPlus, FaRunning } from 'react-icons/fa';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data } = await api.get('/activities');
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    
    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('image', file);
    }

    try {
      const { data } = await api.post('/activities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      // Update state directly or refetch
      setActivities([data, ...activities]);
    } catch (error) {
      console.error('Error adding activity:', error);
      alert(error.response?.data?.message || 'Failed to add activity');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await api.delete(`/activities/${id}`);
        setActivities(activities.filter(act => act._id !== id));
      } catch (error) {
        console.error('Error deleting activity:', error);
        alert('Failed to delete activity');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaRunning className="mr-3 text-green-600" /> Manage Activities
        </h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaPlus className="mr-2 text-green-600" /> Add New Activity
        </h2>
        <form onSubmit={handleAddActivity} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Annual Sports Meet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image (Optional)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              required
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Describe the activity..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition disabled:bg-green-300"
            >
              {uploading ? 'Saving...' : 'Save Activity'}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading activities...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.length > 0 ? activities.map((activity) => (
                <tr key={activity._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.imageUrl ? (
                      <img src={activity.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-xs">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{activity.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-1">{activity.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDelete(activity._id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                    No activities found. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageActivities;
