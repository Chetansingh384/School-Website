import React, { useState, useEffect } from 'react';
import { FaImages, FaTimes, FaFilter, FaSearchPlus } from 'react-icons/fa';
import api from '../services/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        setImages(data);
        const uniqueCategories = ['All', ...new Set(data.map(img => img.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching gallery", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate slight delay to keep the nice loading animation
    setTimeout(() => {
      fetchGallery();
    }, 500);
  }, []);

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">

      {/* Hero Header */}
      <div className="relative pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-overlay"></div>
          
          {/* Animated Glowing Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '3s'}}></div>

          {/* Fade to bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center animate-fade-in-up mt-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 ring-1 ring-white/20 shadow-[0_0_40px_rgba(99,102,241,0.3)] mb-8">
            <FaImages className="text-4xl text-indigo-400" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 animate-gradient-x">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            A visual journey through the vibrant life, achievements, and everyday miracles at SmartSchool.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        
        {/* Filter Bar */}
        {!loading && images.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 max-w-4xl mx-auto animate-fade-in-up">
            <FaFilter className="text-gray-400 mr-2 hidden sm:block" />
            {categories.map((cat, index) => (
              <button 
                key={index}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image, i) => (
              <div 
                key={image._id} 
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white dark:bg-slate-800"
                onClick={() => setFullscreenImage(image)}
              >
                {image.mediaType === 'video' ? (
                  <video 
                    src={image.imageUrl} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    muted
                    loop
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                  />
                ) : (
                  <img 
                    src={image.imageUrl} 
                    alt={image.description || image.category} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Gallery+Item"}}
                  />
                )}
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="self-end">
                    <span className="bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {image.category}
                    </span>
                  </div>
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-medium text-lg leading-snug drop-shadow-md">
                        {image.description || 'School Event'}
                      </p>
                      <button className="bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md transition-colors">
                        <FaSearchPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
            <FaImages className="text-6xl text-gray-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-white mb-2">No Images Found</h3>
            <p className="text-gray-500 dark:text-gray-400">There are no images available in this category.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in-up p-4">
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all z-[101]"
            onClick={() => setFullscreenImage(null)}
          >
            <FaTimes size={30} />
          </button>
          
          {fullscreenImage.mediaType === 'video' ? (
            <video 
              src={fullscreenImage.imageUrl} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 animate-[scaleIn_0.3s_ease-out_forwards]"
              controls
              autoPlay
            />
          ) : (
            <img 
              src={fullscreenImage.imageUrl} 
              alt="Fullscreen View" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 animate-[scaleIn_0.3s_ease-out_forwards]"
            />
          )}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleIn {
          to { transform: scale(1); }
        }
      `}} />
    </div>
  );
};

export default Gallery;
