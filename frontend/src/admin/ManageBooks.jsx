import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaBook, FaTrash, FaPlus, FaEdit, FaSearch } from 'react-icons/fa';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    publisher: '',
    writer: '',
    price: '',
    isbn: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get('/books');
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
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
        const { data } = await api.put(`/books/${currentId}`, formData);
        setBooks(books.map(book => book._id === currentId ? data : book));
      } else {
        const { data } = await api.post('/books', formData);
        setBooks([...books, data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving book:', error);
      alert(error.response?.data?.message || 'Failed to save book detail');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (book) => {
    setIsEditing(true);
    setCurrentId(book._id);
    setFormData({
      className: book.className,
      subject: book.subject,
      publisher: book.publisher,
      writer: book.writer,
      price: book.price,
      isbn: book.isbn
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book record?')) {
      try {
        await api.delete(`/books/${id}`);
        setBooks(books.filter(book => book._id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book record');
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      className: '',
      subject: '',
      publisher: '',
      writer: '',
      price: '',
      isbn: ''
    });
  };

  const filteredBooks = books.filter(book => 
    book.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBook className="mr-3 text-blue-600" /> Manage Book List (Course Detail)
        </h1>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search class, subject..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          {isEditing ? <FaEdit className="mr-2 text-blue-600" /> : <FaPlus className="mr-2 text-blue-600" />}
          {isEditing ? 'Edit Book Record' : 'Add New Book Record'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Class</label>
              <input 
                type="text" name="className" required value={formData.className} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. LKG, 1st"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subject</label>
              <input 
                type="text" name="subject" required value={formData.subject} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Mathematics"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Publisher</label>
              <input 
                type="text" name="publisher" required value={formData.publisher} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Iconic"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Writer</label>
              <input 
                type="text" name="writer" value={formData.writer} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Rupesh Kirodiwal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
              <input 
                type="number" name="price" required value={formData.price} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ISBN No.</label>
              <input 
                type="text" name="isbn" required value={formData.isbn} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="978..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            {isEditing && (
              <button 
                type="button" onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" disabled={saving}
              className={`px-8 py-2 rounded-lg text-white font-bold transition shadow-lg ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} disabled:opacity-50`}
            >
              {saving ? 'Saving...' : (isEditing ? 'Update Record' : 'Save Record')}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-gray-500">Loading records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Class</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Publisher</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Writer</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">ISBN</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{book.className}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{book.subject}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{book.publisher}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{book.writer}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">₹{book.price}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{book.isbn}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => handleEdit(book)} className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg transition"><FaEdit /></button>
                      <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition"><FaTrash /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-10 text-center text-gray-400 font-medium">No book records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;
