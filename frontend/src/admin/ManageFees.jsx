import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaMoneyBillWave, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

const ManageFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    className: '',
    fee2425: '',
    fee2526: '',
    order: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const { data } = await api.get('/fees');
      setFees(data);
    } catch (error) {
      console.error('Error fetching fees:', error);
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

    try {
      if (isEditing) {
        const { data } = await api.put(`/fees/${currentId}`, formData);
        setFees(fees.map(fee => fee._id === currentId ? data : fee));
      } else {
        const { data } = await api.post('/fees', formData);
        setFees([...fees, data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving fee:', error);
      alert(error.response?.data?.message || 'Failed to save fee structure');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (fee) => {
    setIsEditing(true);
    setCurrentId(fee._id);
    setFormData({
      className: fee.className,
      fee2425: fee.fee2425,
      fee2526: fee.fee2526,
      order: fee.order || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class fee structure?')) {
      try {
        await api.delete(`/fees/${id}`);
        setFees(fees.filter(fee => fee._id !== id));
      } catch (error) {
        console.error('Error deleting fee:', error);
        alert('Failed to delete fee structure');
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ className: '', fee2425: '', fee2526: '', order: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaMoneyBillWave className="mr-3 text-green-700" /> Manage Fee Structure
        </h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            {isEditing ? <FaEdit className="mr-2 text-blue-600" /> : <FaPlus className="mr-2 text-green-600" />}
            {isEditing ? 'Edit Fee Structure' : 'Add New Fee Structure'}
          </h2>
          {isEditing && (
            <button onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700 underline">
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class / Grade</label>
            <input 
              type="text" 
              name="className"
              required 
              value={formData.className}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Grade 1"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fee 2024-25 (₹)</label>
            <input 
              type="number" 
              name="fee2425"
              required 
              value={formData.fee2425}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fee 2025-26 (₹)</label>
            <input 
              type="number" 
              name="fee2526"
              required 
              value={formData.fee2526}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input 
              type="number" 
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. 1"
            />
          </div>
          <div className="md:col-span-1">
            <button 
              type="submit" 
              disabled={saving}
              className={`w-full font-medium py-2 px-4 rounded-lg flex items-center justify-center transition disabled:opacity-50 ${isEditing ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              {saving ? 'Saving...' : (isEditing ? 'Update Fees' : 'Add Fees')}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading fee structures...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Class / Grade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fee 2024-25 (₹)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fee 2025-26 (₹)</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.length > 0 ? fees.map((fee) => (
                <tr key={fee._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{fee.className}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{fee.fee2425?.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{fee.fee2526?.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button 
                      onClick={() => handleEdit(fee)}
                      className="text-blue-600 hover:text-blue-900 py-1"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(fee._id)}
                      className="text-red-600 hover:text-red-900 py-1"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No fee structures found. Add one above!
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

export default ManageFees;
