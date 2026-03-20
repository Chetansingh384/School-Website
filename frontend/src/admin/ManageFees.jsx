import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaMoneyBillWave, FaTrash, FaPlus, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const getCurrentAcademicYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startYear = month >= 3 ? year : year - 1;
  const endYear = (startYear + 1).toString().slice(-2);
  return `${startYear}-${endYear}`;
};

const toDisplayAmount = (value) => Number(value || 0).toLocaleString('en-IN');

const ManageFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(getCurrentAcademicYear());
  
  // Add Form State
  const [addFormData, setAddFormData] = useState({
    className: '',
    year: getCurrentAcademicYear(),
    feeAmount: '',
    order: ''
  });

  // Inline Edit State
  const [editingRowId, setEditingRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    className: '',
    year: getCurrentAcademicYear(),
    feeAmount: '',
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

  const handleAddChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data } = await api.post('/fees', addFormData);
      setFees([...fees, data]);
      setSelectedYear(addFormData.year);
      setAddFormData({ className: '', year: addFormData.year, feeAmount: '', order: '' });
    } catch (error) {
      console.error('Error saving fee:', error);
      alert(error.response?.data?.message || 'Failed to save fee structure');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (fee) => {
    const rowAmount = fee.feeAmount ?? fee.fee2526 ?? fee.fee2425 ?? '';
    setEditingRowId(fee._id);
    setEditFormData({
      className: fee.className,
      year: fee.year || selectedYear,
      feeAmount: rowAmount,
      order: fee.order || ''
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleInlineSave = async (id) => {
    setSaving(true);
    try {
      const { data } = await api.put(`/fees/${id}`, editFormData);
      setFees(fees.map((fee) => (fee._id === id ? data : fee)));
      setEditingRowId(null);
      setEditFormData({ className: '', year: selectedYear, feeAmount: '', order: '' });
    } catch (error) {
      console.error('Error updating fee:', error);
      alert(error.response?.data?.message || 'Failed to update fee structure');
    } finally {
      setSaving(false);
    }
  };

  const cancelInlineEdit = () => {
    setEditingRowId(null);
    setEditFormData({ className: '', year: selectedYear, feeAmount: '', order: '' });
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

  const visibleFees = fees.filter((fee) => {
    const rowYear = fee.year || selectedYear;
    return rowYear === selectedYear;
  });

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
            <FaPlus className="mr-2 text-green-600" /> Add New Fee Structure
          </h2>
        </div>

        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class / Grade</label>
            <input 
              type="text" 
              name="className"
              required 
              value={addFormData.className}
              onChange={handleAddChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. Grade 1"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
            <input 
              type="text"
              name="year"
              required 
              value={addFormData.year}
              onChange={handleAddChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. 2026-27"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fee Amount (₹)</label>
            <input 
              type="number" 
              name="feeAmount"
              required 
              value={addFormData.feeAmount}
              onChange={handleAddChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input 
              type="number" 
              name="order"
              value={addFormData.order}
              onChange={handleAddChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. 1"
            />
          </div>
          <div className="md:col-span-1">
            <button 
              type="submit" 
              disabled={saving}
              className="w-full font-medium py-2 px-4 rounded-lg flex items-center justify-center transition disabled:opacity-50 bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? 'Saving...' : 'Add Fees'}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading fee structures...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">Showing Fee Structure for: <span className="text-blue-700">{selectedYear}</span></p>
            <input
              type="text"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-800 bg-white"
              placeholder="e.g. 2026-27"
            />
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Class / Grade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fee ({selectedYear})</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visibleFees.length > 0 ? visibleFees.map((fee) => (
                <tr key={fee._id} className="hover:bg-gray-50">
                  {editingRowId === fee._id ? (
                    <>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <input
                          type="text"
                          name="className"
                          value={editFormData.className}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          name="feeAmount"
                          value={editFormData.feeAmount}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <button
                          onClick={() => handleInlineSave(fee._id)}
                          className="text-emerald-600 hover:text-emerald-800 py-1"
                          title="Save"
                          disabled={saving}
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={cancelInlineEdit}
                          className="text-gray-500 hover:text-gray-700 py-1"
                          title="Cancel"
                          disabled={saving}
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{fee.className}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{toDisplayAmount(fee.feeAmount ?? fee.fee2526 ?? fee.fee2425)}</td>
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
                    </>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                    No fee structures found for {selectedYear}. Add one above!
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
