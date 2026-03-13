import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaChalkboardTeacher, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const { data } = await api.get('/faculty');
      setFaculty(data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('bio', bio);
    if (file) {
      formData.append('image', file);
    }

    try {
      if (isEditing) {
        const { data } = await api.put(`/faculty/${currentId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFaculty(faculty.map(f => f._id === currentId ? data : f));
      } else {
        const { data } = await api.post('/faculty', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFaculty([...faculty, data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving faculty:', error);
      alert(error.response?.data?.message || 'Failed to save faculty member');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member) => {
    setIsEditing(true);
    setCurrentId(member._id);
    setName(member.name);
    setRole(member.role);
    setBio(member.bio);
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await api.delete(`/faculty/${id}`);
        setFaculty(faculty.filter(f => f._id !== id));
      } catch (error) {
        console.error('Error deleting faculty:', error);
        alert('Failed to delete faculty member');
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setName('');
    setRole('');
    setBio('');
    setFile(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaChalkboardTeacher className="mr-3 text-indigo-600" /> Manage Faculty
        </h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            {isEditing ? <FaEdit className="mr-2 text-blue-600" /> : <FaPlus className="mr-2 text-indigo-600" />}
            {isEditing ? 'Edit Faculty Member' : 'Add New Faculty Member'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Dr. Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Department</label>
              <input 
                type="text" 
                required 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Head of Science"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image {isEditing ? '(Optional)' : '(Required)'}</label>
            <input 
              type="file" 
              accept="image/*"
              required={!isEditing}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Information</label>
            <textarea 
              required
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Short professional biography..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className={`font-medium py-2 px-6 rounded-lg transition disabled:opacity-50 text-white ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {saving ? 'Saving...' : (isEditing ? 'Update Member' : 'Save Member')}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading faculty members...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.length > 0 ? faculty.map((member) => (
            <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="relative h-48">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="absolute top-2 right-2 space-x-2">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-50 transition" title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(member._id)}
                    className="bg-white text-red-600 p-2 rounded-full shadow hover:bg-red-50 transition" title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3 block">{member.role}</span>
                <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-lg border border-gray-100">
              No faculty members found. Add one above!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageFaculty;
