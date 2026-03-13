import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaUserTie, FaSave } from 'react-icons/fa';

const ManagePrincipalMessage = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const { data } = await api.get('/principal-message');
      if (data) {
        setMessage(data.message || '');
        setCurrentImage(data.imageUrl || '');
      }
    } catch (error) {
      console.error('Error fetching principal message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');

    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      formData.append('image', file);
    }

    try {
      const { data } = await api.put('/principal-message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('Message updated successfully!');
      setCurrentImage(data.imageUrl);
      setFile(null);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error updating message:', error);
      setStatus('Failed to update message.');
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaUserTie className="mr-3 text-blue-800" /> Manage Principal's Message
        </h1>
      </div>

      {status && (
        <div className={`p-4 mb-6 rounded-lg font-medium text-center ${status.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-700 mb-3 w-full">Current Photo</p>
              {currentImage ? (
                <img 
                  src={`http://localhost:5000${currentImage}`} 
                  alt="Principal" 
                  className="w-48 h-48 object-cover rounded-full border-4 border-gray-200 mb-4 shadow-md"
                  onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/200?text=Photo"}}
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gray-100 border-4 border-gray-200 mb-4 flex items-center justify-center text-gray-400">
                  No Photo
                </div>
              )}
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
              <textarea 
                required
                rows="12"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:border-blue-500 leading-relaxed"
                placeholder="Write the principal's message here..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={saving}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg flex items-center transition duration-200 disabled:bg-blue-300 shadow-md"
            >
              <FaSave className="mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagePrincipalMessage;
