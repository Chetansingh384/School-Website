import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import campusImg from '../assets/campusimage.png';
import { FaGraduationCap, FaBookOpen, FaLaptopCode, FaBasketballBall, FaArrowRight, FaAward, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await api.get('/announcements');
        setAnnouncements(data.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Advanced Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={campusImg}
            alt="School Campus" 
            className="w-full h-full object-cover object-center animate-pulse"
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-blue-900/40 to-purple-900/60 backdrop-blur-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center animate-fade-in-up mt-20 pb-24 md:pb-32">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/20 backdrop-blur-md">
            <span className="text-blue-200 font-semibold tracking-wide text-sm flex items-center">
              <FaAward className="mr-2 text-yellow-400" /> Voted #1 Innovative School 2024
            </span>
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter drop-shadow-2xl">
            Empower Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 animate-pulse">
              Brilliant Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl font-light leading-relaxed drop-shadow-md">
            Discover a world-class educational experience where innovation meets tradition. We shape the leaders, thinkers, and creators of tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/about" className="group relative px-8 py-4 bg-white text-blue-900 font-bold rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Explore Our Campus <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-yellow-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </Link>
            
            <Link to="/contact" className="px-8 py-4 border border-white/30 backdrop-blur-md bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl">
              Apply for Admissions
            </Link>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float opacity-70">
          <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Overlapping Feature Cards */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaGraduationCap size={44} />, title: 'Academic Excellence', desc: 'Rigorous curriculum designed to challenge and inspire.', color: 'from-blue-500 to-blue-700' },
            { icon: <FaBookOpen size={44} />, title: 'Modern Library', desc: 'Access to over 50,000 digital and physical resources.', color: 'from-emerald-500 to-teal-700' },
            { icon: <FaLaptopCode size={44} />, title: 'Smart Technology', desc: 'AI-integrated labs and 1:1 device programs.', color: 'from-purple-500 to-indigo-700' },
            { icon: <FaBasketballBall size={44} />, title: 'Dynamic Athletics', desc: 'Championship-winning sports teams and facilities.', color: 'from-orange-500 to-red-700' }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group">
              <div className={`h-2 w-full bg-gradient-to-r ${item.color}`}></div>
              <div className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with Parallax Feel */}
      <div className="my-24 bg-blue-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-center relative z-10">
          <div className="w-full sm:w-1/3 mb-8 sm:mb-0 transform hover:scale-105 transition-transform">
            <FaUsers className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-5xl font-black text-white mb-2">2,500+</h3>
            <p className="text-blue-200 font-semibold tracking-wider uppercase text-sm">Enrolled Students</p>
          </div>
          <div className="w-full sm:w-1/3 mb-8 sm:mb-0 transform hover:scale-105 transition-transform">
            <FaChalkboardTeacher className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-5xl font-black text-white mb-2">150+</h3>
            <p className="text-blue-200 font-semibold tracking-wider uppercase text-sm">Expert Instructors</p>
          </div>
          <div className="w-full sm:w-1/3 transform hover:scale-105 transition-transform">
            <FaAward className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-5xl font-black text-white mb-2">98%</h3>
            <p className="text-blue-200 font-semibold tracking-wider uppercase text-sm">College Acceptance</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
