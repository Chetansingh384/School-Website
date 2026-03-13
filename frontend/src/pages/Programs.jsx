import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaSpinner } from 'react-icons/fa';
import api from '../services/api';

// Fallback images
import campus7 from '../assets/campus7.jpeg';
import campus6 from '../assets/campus6.jpeg';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback Data
  const fallbackPrograms = [
    { _id: 'f1', title: 'Yoga and Mindfulness Programs', description: 'Enhance your physical and mental well-being with our expert-led yoga and mindfulness sessions.', imageUrl: campus7 },
    { _id: 'f2', title: 'Environmental Programs', description: 'Engage in sustainability initiatives and learn about environmental conservation.', imageUrl: campus7 },
    { _id: 'f3', title: 'Cultural Programs', description: 'Celebrate diversity with various cultural events, arts, and traditions.', imageUrl: campus6 }
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await api.get('/programs');
        // Combine API programs with fallbacks
        const combined = [...(data || []), ...fallbackPrograms];
        setPrograms(combined);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms(fallbackPrograms);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-24 transition-colors duration-300">
      
      {/* Dynamic Header */}
      <div className="relative pt-32 pb-24 bg-blue-950 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply opacity-50 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply opacity-30 blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <FaGraduationCap className="text-3xl text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            Co-Curricular <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Programs</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Discover comprehensive learning pathways engineered to challenge intellects and forge the innovators of tomorrow.
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white/80 rounded-3xl backdrop-blur-sm shadow-xl">
             <FaSpinner className="animate-spin text-5xl text-blue-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.length > 0 ? programs.map((program, index) => (
              <div 
                key={program._id || index} 
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col group transform transition-all duration-500 hover:-translate-y-3 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={program.imageUrl} 
                    alt={program.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-4 py-2 rounded-bl-2xl z-20 shadow-md">
                    Featured
                  </div>
                </div>
                
                <div className="p-6 pb-8 flex flex-col relative bg-white dark:bg-slate-800">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-blue-700 transition-colors">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {program.description}
                  </p>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 bg-white/80 rounded-3xl backdrop-blur-sm shadow-xl font-medium text-gray-500">
                No programs currently available.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Programs;
