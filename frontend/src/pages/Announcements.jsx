import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaBullhorn, FaCalendarAlt, FaEnvelopeOpenText } from 'react-icons/fa';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await api.get('/announcements');
        setAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 opacity-5">
           <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="20" cy="20" r="2" fill="currentColor" className="text-blue-900"></circle>
             </pattern>
             <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
           </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-4 bg-purple-100 rounded-full mb-6">
            <FaBullhorn className="text-4xl text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">
            News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Notices</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            Stay in the loop with the latest administrative updates, campus news, and important notices.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-gray-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : announcements.length > 0 ? (
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-purple-200 before:to-transparent">
            {announcements.map((announcement, index) => (
              <div key={announcement._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                
                {/* Timeline Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-purple-600 group-hover:text-white">
                  <FaEnvelopeOpenText size={14} />
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-100 transition-all duration-300 transform group-odd:hover:-translate-x-2 group-even:hover:translate-x-2 z-20">
                  <div className="flex items-center text-sm font-bold text-purple-500 mb-3 uppercase tracking-wider">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(announcement.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{announcement.title}</h3>
                  <div className="prose prose-purple text-gray-600 max-w-none">
                    <p className="whitespace-pre-line leading-relaxed">{announcement.content}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <FaBullhorn className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Caught Up!</h3>
            <p className="text-gray-500">There are no new announcements at this time.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Announcements;
