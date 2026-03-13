import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaBookOpen, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

const ManagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data } = await api.get('/programs');
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('image', file);
    }

    try {
      if (isEditing) {
        const { data } = await api.put(`/programs/${currentId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPrograms(programs.map(prog => prog._id === currentId ? data : prog));
      } else {
        const { data } = await api.post('/programs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPrograms([...programs, data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving program:', error);
      alert(error.response?.data?.message || 'Failed to save program');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (program) => {
    setIsEditing(true);
    setCurrentId(program._id);
    setTitle(program.title);
    setDescription(program.description);
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await api.delete(`/programs/${id}`);
        setPrograms(programs.filter(prog => prog._id !== id));
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Failed to delete program');
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBookOpen className="mr-3 text-indigo-600" /> Manage Programs
        </h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            {isEditing ? <FaEdit className="mr-2 text-blue-600" /> : <FaPlus className="mr-2 text-indigo-600" />}
            {isEditing ? 'Edit Program' : 'Add New Program'}
          </h2>
          {isEditing && (
            <button onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700 underline">
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Primary Education"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image {isEditing ? '(Optional, leaves current if empty)' : '(Required)'}</label>
              <input 
                type="file" 
                accept="image/*"
                required={!isEditing}
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Description</label>
            <textarea 
              required
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Detailed description of the program curriculum..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className={`font-medium py-2 px-6 rounded-lg transition disabled:opacity-50 text-white ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {saving ? 'Saving...' : (isEditing ? 'Update Program' : 'Save Program')}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading programs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {programs.length > 0 ? programs.map((program) => (
            <div key={program._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition bg-gray-50">
              <div className="relative h-40">
                {program.imageUrl ? (
                  <img src={`http://localhost:5000${program.imageUrl}`} alt={program.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="absolute top-2 right-2 space-x-2">
                  <button 
                    onClick={() => handleEdit(program)}
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50 transition" title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(program._id)}
                    className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50 transition" title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{program.description}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-100">
              No programs found. Add one above!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePrograms;
