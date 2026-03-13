import React, { useState, useEffect } from 'react';
import { FaImages, FaTimes, FaFilter, FaSearchPlus } from 'react-icons/fa';

const Gallery = () => {
  const imagesData = [
    { _id: '1', category: 'Campus Life', imageUrl: new URL('../assets/campus1.jpeg', import.meta.url).href, description: 'Campus View' },
    { _id: '2', category: 'Campus Life', imageUrl: new URL('../assets/campus3.jpeg', import.meta.url).href, description: 'Campus View' },
    { _id: '3', category: 'Campus Life', imageUrl: new URL('../assets/campus4.jpeg', import.meta.url).href, description: 'Campus View' },
    { _id: '4', category: 'Campus Life', imageUrl: new URL('../assets/campus5.jpeg', import.meta.url).href, description: 'Campus View' },
    { _id: '5', category: 'Campus Life', imageUrl: new URL('../assets/campus6.jpeg', import.meta.url).href, description: 'Campus View' },
    { _id: '6', category: 'Academics', imageUrl: new URL('../assets/campus7.jpeg', import.meta.url).href, description: 'Academics' },
    { _id: '7', category: 'Academics', imageUrl: new URL('../assets/campus8.jpeg', import.meta.url).href, description: 'Academics' },
    { _id: '8', category: 'Academics', imageUrl: new URL('../assets/campus9.jpeg', import.meta.url).href, description: 'Academics' },
    { _id: '9', category: 'Academics', imageUrl: new URL('../assets/campus10.jpeg', import.meta.url).href, description: 'Academics' },
    { _id: '10', category: 'Academics', imageUrl: new URL('../assets/campus12.jpeg', import.meta.url).href, description: 'Academics' },
    { _id: '11', category: 'Infrastructure', imageUrl: new URL('../assets/campus13.jpeg', import.meta.url).href, description: 'Infrastructure' },
    { _id: '12', category: 'Infrastructure', imageUrl: new URL('../assets/campus14.jpeg', import.meta.url).href, description: 'Infrastructure' },
    { _id: '13', category: 'Infrastructure', imageUrl: new URL('../assets/campus15.jpeg', import.meta.url).href, description: 'Infrastructure' },
    { _id: '14', category: 'Infrastructure', imageUrl: new URL('../assets/campus16.jpeg', import.meta.url).href, description: 'Infrastructure' },
    { _id: '15', category: 'Infrastructure', imageUrl: new URL('../assets/campus17.jpeg', import.meta.url).href, description: 'Infrastructure' },
    { _id: '16', category: 'Events', imageUrl: new URL('../assets/campus18.jpeg', import.meta.url).href, description: 'Events' },
    { _id: '17', category: 'Events', imageUrl: new URL('../assets/campus19.jpeg', import.meta.url).href, description: 'Events' },
    { _id: '18', category: 'Events', imageUrl: new URL('../assets/campus20.jpeg', import.meta.url).href, description: 'Events' },
    { _id: '19', category: 'Events', imageUrl: new URL('../assets/campus21.jpeg', import.meta.url).href, description: 'Events' },
    { _id: '20', category: 'Events', imageUrl: new URL('../assets/campus22.jpeg', import.meta.url).href, description: 'Events' }
  ];

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    // Simulate API fetch to keep loading animation that the user likes
    setTimeout(() => {
      setImages(imagesData);
      
      const uniqueCategories = ['All', ...new Set(imagesData.map(img => img.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    }, 800);
  }, []);

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-blue-950 border-b-8 border-indigo-500">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center animate-fade-in-up">
          <FaImages className="text-6xl text-indigo-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-lg">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-sky-300">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            A visual journey through the vibrant life, achievements, and everyday miracles at SmartSchool.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        
        {/* Filter Bar */}
        {!loading && images.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 bg-white p-4 rounded-full shadow-lg border border-gray-100 max-w-4xl mx-auto animate-fade-in-up">
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
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                onClick={() => setFullscreenImage(image.imageUrl)}
              >
                <img 
                  src={image.imageUrl} 
                  alt={image.description || image.category} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/400x300?text=Gallery+Item"}}
                />
                
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
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <FaImages className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Images Found</h3>
            <p className="text-gray-500">There are no images available in this category.</p>
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
          
          <img 
            src={fullscreenImage} 
            alt="Fullscreen View" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 animate-[scaleIn_0.3s_ease-out_forwards]"
          />
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
