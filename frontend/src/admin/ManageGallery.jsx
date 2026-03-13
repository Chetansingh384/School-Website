import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaTrash, FaPlus, FaImage } from 'react-icons/fa';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Events');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery');
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
            <input 
              type="file" 
              accept="image/*"
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
              <img 
                src={`http://localhost:5000${img.imageUrl}`} 
                alt="gallery" 
                className="w-full h-32 object-cover"
                onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/150"}}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  onClick={() => handleDelete(img._id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                  title="Delete Image"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white text-xs p-1 px-2 truncate">
                {img.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
