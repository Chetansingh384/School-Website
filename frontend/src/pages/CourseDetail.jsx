import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaSpinner, FaSearch } from 'react-icons/fa';
import api from '../services/api';

const CourseDetail = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group books by class for a cleaner look
  const groupedBooks = filteredBooks.reduce((acc, book) => {
    if (!acc[book.className]) acc[book.className] = [];
    acc[book.className].push(book);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-24 transition-colors duration-300">
      {/* Header Section */}
      <div className="relative pt-32 pb-16 bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 20" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center animate-fade-in">
          <FaBookOpen className="text-5xl text-white/40 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">
            Course <span className="text-yellow-300">Details</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto font-light">
            Comprehensive book list and study materials for Classes LKG to 10th. Find publishers, writers, and ISBN details below.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-slate-700">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12 transform -translate-y-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />
              <input 
                type="text" 
                placeholder="Search class or subject..." 
                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-slate-900 border-none rounded-2xl shadow-inner focus:ring-2 focus:ring-green-500 transition-all text-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSpinner className="animate-spin text-5xl text-green-600 mb-4" />
              <p className="text-gray-500 font-medium">Loading Course Details...</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="space-y-16">
              {Object.keys(groupedBooks).map(className => (
                <div key={className} className="animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-2 bg-green-600 rounded-full mr-4 shadow-[0_0_10px_rgba(22,163,74,0.5)]"></div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">{className}</h2>
                  </div>
                  
                  <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                      <thead className="bg-green-600">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Subject</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Publisher</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Writer</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Price</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">ISBN No.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {groupedBooks[className].map((book, idx) => (
                          <tr key={book._id} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/50'}>
                            <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{book.subject}</td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium italic">{book.publisher}</td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{book.writer}</td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm font-black text-green-700 dark:text-green-400">₹{book.price}</td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono tracking-tighter">{book.isbn}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700">
              <p className="text-gray-400 text-lg italic">No course records found matching your search.</p>
            </div>
          )}
          
          <div className="mt-20 p-8 rounded-3xl bg-blue-50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800">
             <p className="text-sm text-blue-900 dark:text-blue-200 font-medium text-center">
               <span className="font-black mr-2">Note:</span>
               5th to 10th: All Subjects (Publisher: Madhya Pradesh Pathya Pustak Nigam, Bhopal, Writer: SCERT)
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
