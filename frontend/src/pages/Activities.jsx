import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaRunning, FaArrowRight } from 'react-icons/fa';
import campus20 from '../assets/campus20.jpeg';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await api.get('/activities');
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      
      {/* Dramatic Dark Header */}
      <div className="relative pt-32 pb-24 overflow-hidden border-b-4 border-orange-500">
        <div className="absolute inset-0 z-0">
          <img 
            src={campus20} 
            alt="Sports Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <FaRunning className="text-6xl text-orange-500 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase italic">
            Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Classroom</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Forge character, develop leadership, and build lifelong friendships through our elite co-curricular programs.
          </p>
        </div>
      </div>

      {/* Activities Grid - Dark Mode Masonry Feel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : activities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div 
                key={activity._id} 
                className="group relative rounded-3xl overflow-hidden h-[450px] cursor-pointer shadow-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {activity.imageUrl ? (
                    <img 
                      src={`http://localhost:5000${activity.imageUrl}`} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/600x800?text=Activity"}}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <FaRunning className="text-6xl text-gray-700" />
                    </div>
                  )}
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <div className="w-12 h-1 bg-orange-500 mb-4 rounded-full"></div>
                  <h3 className="text-3xl font-black text-white mb-2">{activity.title}</h3>
                  <p className="text-gray-300 font-medium line-clamp-3 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {activity.description}
                  </p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <button className="flex items-center text-orange-400 font-bold hover:text-white transition-colors">
                      Discover More <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-800 rounded-3xl border border-gray-700">
            <FaRunning className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">Activities Roster</h3>
            <p className="text-gray-500">The events schedule is currently being finalized.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Activities;
