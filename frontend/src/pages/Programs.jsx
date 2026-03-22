import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import aboutImg from '../assets/about.jpeg';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [campusBySourceFile, setCampusBySourceFile] = useState({});
  const [loading, setLoading] = useState(true);

  // Fallback Data
  const fallbackPrograms = [
    { _id: 'f1', title: 'Yoga and Mindfulness Programs', description: 'Enhance your physical and mental well-being with our expert-led yoga and mindfulness sessions.', imageUrl: '' },
    { _id: 'f2', title: 'Environmental Programs', description: 'Engage in sustainability initiatives and learn about environmental conservation.', imageUrl: '' },
    { _id: 'f3', title: 'Cultural Programs', description: 'Celebrate diversity with various cultural events, arts, and traditions.', imageUrl: '' }
  ];

  const getMappedSourceFile = (title = '') => {
    const normalized = title.toLowerCase();
    if (normalized.includes('yoga') || normalized.includes('mindfulness')) return 'campus1.jpeg';
    if (normalized.includes('environment')) return 'campus7.jpeg';
    if (normalized.includes('cultural')) return 'campus6.jpeg';
    return null;
  };

  const getProgramImage = (program) => {
    if (program?.imageUrl) return program.imageUrl;

    const mappedFile = getMappedSourceFile(program?.title);
    if (mappedFile && campusBySourceFile[mappedFile]) {
      return campusBySourceFile[mappedFile];
    }

    return aboutImg;
  };

  const headerImage = getProgramImage(programs[0]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const [{ data: programData }, { data: galleryData }] = await Promise.all([
          api.get('/programs'),
          api.get('/gallery'),
        ]);

        const campusMap = (galleryData || [])
          .filter((item) => item.mediaType === 'image')
          .filter((item) => (item.category || '').toLowerCase() === 'campus')
          .filter((item) => item.sourceFile && item.imageUrl)
          .reduce((acc, item) => {
            acc[item.sourceFile] = item.imageUrl;
            return acc;
          }, {});

        setCampusBySourceFile(campusMap);

        // Combine API programs with fallbacks
        const combined = [...(programData || []), ...fallbackPrograms];
        setPrograms(combined);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms(fallbackPrograms);
        setCampusBySourceFile({});
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
        {/* Beautiful Image Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={headerImage} 
            alt="Campus Background" 
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/65 via-blue-900/35 to-blue-950/60"></div>
          {/* Abstract glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen opacity-28 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen opacity-16 blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
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
                    src={getProgramImage(program)} 
                    alt={program.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = aboutImg;
                    }}
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
