import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaTrash, FaPlus, FaImage, FaEdit, FaTimes } from 'react-icons/fa';

const campusImageModules = import.meta.glob('../assets/campus*.{jpeg,jpg,png}', {
  eager: true,
  import: 'default',
});

const localCampusImages = Object.entries(campusImageModules)
  .sort((a, b) => {
    const aNum = Number((a[0].match(/campus(\d+)/i) || [])[1] || 999);
    const bNum = Number((b[0].match(/campus(\d+)/i) || [])[1] || 999);
    return aNum - bNum;
  })
  .map(([, url], index) => ({
    _id: `local-campus-${index + 1}`,
    imageUrl: url,
    category: 'Campus',
    description: `Campus Photo ${index + 1}`,
    mediaType: 'image',
    source: 'local',
  }));

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Events');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editCategory, setEditCategory] = useState('Events');
  const [editDescription, setEditDescription] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery');
      if (data && data.length > 0) {
        setImages(data.map((item) => ({ ...item, source: 'api' })));
      } else {
        setImages(localCampusImages);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setImages(localCampusImages);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');
    
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('description', description);

    try {
      await api.post('/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset form
      setFile(null);
      setCategory('Events');
      setDescription('');
      // Refresh grid
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/gallery/${id}`);
        setImages(images.filter(img => img._id !== id));
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image');
      }
    }
  };

  const openEditModal = (img) => {
    setEditingImage(img);
    setEditCategory(img.category || 'Events');
    setEditDescription(img.description || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingImage) return;

    setSavingEdit(true);
    try {
      const { data } = await api.put(`/gallery/${editingImage._id}`, {
        category: editCategory,
        description: editDescription,
      });

      setImages((prev) => prev.map((img) => (img._id === editingImage._id ? data : img)));
      setEditingImage(null);
    } catch (error) {
      console.error('Error updating image metadata:', error);
      alert(error.response?.data?.message || 'Failed to update picture details');
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaImage className="mr-3 text-blue-600" /> Manage Gallery
        </h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <FaPlus className="mr-2 text-green-600" /> Add New Image
        </h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Media File</label>
            <input 
              type="file" 
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Events">Events</option>
              <option value="Sports">Sports</option>
              <option value="Class Activities">Class Activities</option>
              <option value="Annual Day">Annual Day</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Science Fair 2024"
            />
          </div>
          <div className="col-span-1 md:col-span-1">
            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition disabled:bg-blue-300"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading images...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img._id} className="relative group rounded-lg overflow-hidden border border-gray-200">
              {img.mediaType === 'video' ? (
                <video 
                  src={img.imageUrl} 
                  className="w-full h-32 object-cover"
                  muted
                  preload="metadata"
                />
              ) : (
                <img 
                  src={img.imageUrl} 
                  alt={img.description || 'gallery'} 
                  className="w-full h-32 object-cover"
                  onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/150"}}
                />
              )}
              {img.source !== 'local' && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(img)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                      title="Edit Picture Name"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(img._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                      title="Delete Image"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-xs p-1 px-2 truncate">
                {img.description || 'Untitled'} • {img.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && images[0].source === 'local' && (
        <div className="mt-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Showing local campus fallback images. Upload media in admin to manage (edit/delete) cloud gallery items.
        </div>
      )}

      {editingImage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Picture Details</h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setEditingImage(null)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Picture Name</label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter picture name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Events">Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Class Activities">Class Activities</option>
                  <option value="Annual Day">Annual Day</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
