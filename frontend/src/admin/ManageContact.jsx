import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaSave, FaCheckCircle } from 'react-icons/fa';

const ManageContact = () => {
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    googleMapUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data } = await api.get('/contact');
      if (data) {
        setFormData({
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          googleMapUrl: data.googleMapUrl || ''
        });
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setMessage({ type: 'error', text: 'Failed to load contact information.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put('/contact', formData);
      setMessage({ type: 'success', text: 'Contact information updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (error) {
      console.error('Error updating contact info:', error);
      setMessage({ type: 'error', text: 'Failed to update contact information.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Contact Info</h1>
          <p className="text-gray-500">Update school address, phone, email and location details.</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-xl flex items-center ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' && <FaCheckCircle className="mr-3" />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                <FaMapMarkerAlt className="text-blue-600 mr-2" /> School Address
              </label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Enter full school address..."
              ></textarea>
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                <FaPhoneAlt className="text-blue-600 mr-2" /> Phone Number
              </label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="+91 1234567890"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                <FaEnvelope className="text-blue-600 mr-2" /> Official Email
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="school@example.com"
              />
            </div>

            {/* Google Map URL */}
            <div className="md:col-span-2">
              <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                <FaGlobe className="text-blue-600 mr-2" /> Google Maps URL (Embed/Share Link)
              </label>
              <input 
                type="text" 
                name="googleMapUrl" 
                value={formData.googleMapUrl} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="flex items-center bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg transition-all disabled:opacity-70 group"
            >
              {saving ? 'Saving Changes...' : 'Save Information'}
              {!saving && <FaSave className="ml-3 group-hover:scale-110 transition-transform" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageContact;
