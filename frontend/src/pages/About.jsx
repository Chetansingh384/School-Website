import React, { useState, useEffect, useRef } from 'react';
import { FaHistory, FaEye, FaTrophy, FaCheckCircle, FaGlobe, FaBrain, FaLeaf, FaPlay, FaPause } from 'react-icons/fa';
import aboutImg from '../assets/about.jpeg';
import campus1 from '../assets/campus1.jpeg';
import campus3 from '../assets/campus3.jpeg';
import campus4 from '../assets/campus4.jpeg';
import campus5 from '../assets/campus5.jpeg';
import campusvid from '../assets/campusvid.mp4';

const heroImages = [aboutImg, campus1, campus3, campus4, campus5];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-blue-900">
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform ${
                index === currentImage ? 'opacity-60 scale-105' : 'opacity-0 scale-100'
              }`} 
              alt="School Background" 
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            ABOUT OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">SCHOOL</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            Nurturing Tomorrow's Leaders Today.
          </p>
        </div>
      </div>

      {/* Vision & Mission Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-8 shadow-lg">
                <FaEye className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Kalidas Children High School is a premier educational school dedicated to fostering academic excellence, holistic development, and a love for learning in every student. Established with the vision of nurturing young minds and shaping future leaders, the school offers a stimulating and supportive environment that encourages curiosity, creativity, and critical thinking.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-8 shadow-lg">
                <FaCheckCircle className="text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Committed to the all-round development of its students, the school promotes a variety of co-curricular activities such as sports, arts, music, and community service. Kalidas Children High School is dedicated to creating a vibrant learning community where students are inspired to excel and contribute positively to society.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* History & Infrastructure Timeline */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
            <div 
              className="relative rounded-[3rem] shadow-2xl overflow-hidden aspect-video w-full cursor-pointer"
              onClick={togglePlay}
            >
              <video 
                ref={videoRef}
                src={campusvid}
                autoPlay 
                loop 
                muted 
                playsInline
                className="object-cover h-full w-full"
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-4xl hover:bg-white/40 transition-all transform hover:scale-110">
                  {isPlaying ? <FaPause /> : <FaPlay className="ml-2" />}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div>
              <h3 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">Our Heritage & Facilities</h3>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                State of the Art <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Infrastructure</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              The school prides itself on its state-of-the-art facilities, including well-equipped classrooms, modern laboratories, a vast library, and outdoor sports areas that support both academic and extracurricular activities. Emphasizing not only academic achievement but also character building, the school integrates moral values, leadership skills, and social responsibility into its curriculum.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: <FaGlobe />, text: "Global Curriculum Standards" },
                { icon: <FaBrain />, text: "Modern Laboratories & Libraries" },
                { icon: <FaHistorical />, text: "Moral Values & Leadership" },
                { icon: <FaSwimmer />, text: "Extracurricular Sports Areas" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-blue-600 text-xl">{feature.icon}</div>
                  <span className="font-semibold text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

// Dummy icons since some might not be imported above
const FaHistorical = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M468.9 330.4L337.8 153.2V48h22.2c13.3 0 24-10.7 24-24s-10.7-24-24-24H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h22.2v105.2L43.1 330.4c-22.3 30.2-22.8 71.9-1.2 102.6C63.6 463.6 97.4 480 133 480h246c35.6 0 69.4-16.4 91.1-47 21.6-30.7 21.1-72.4-1.2-102.6zM288 343.8v7.4c0 10.6-5.8 20.3-15.1 25.3l-24.8 13.5c-9.5 5.2-19.3.9-20.3-7.7-1-9 7.7-15.5 16.3-19.5l14.4-6.7c4.6-2.1 7.6-6.8 7.6-11.9v-6.9l-61.9-83.6c-4.9-6.6-4.9-15.6 0-22.3l12.4-16.8h112.5l20.8 28.1H243.6c-8.8 0-16 7.2-16 16s7.2 16 16 16h114.7l-9.8-13.3h-28.7c-8.8 0-16 7.2-16 16s7.2 16 16 16h40.5l-61.4 83z"></path></svg>;
const FaSwimmer = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M428.4 121.7c-26.4 18.5-62 7.7-77.9-16.4-11-16.5-12.7-36.9-3.7-52.6 15.6-27.2 59.8-21.6 77.9.6 17 21 17.5 50.1 3.7 68.4zm-144.1 61.2c-5.8-13-11.2-26.6-11.2-41 0-26.2 10-63.5 18-93.5-52.7 8.3-95 56.4-95 111.6 0 25.4 10.1 48 24.3 64-10-6.1-23.7-10.3-43.2-10.3C131 213.7 75.3 227.1 22 238c-12 2.5-22 12.8-22 25 0 13.8 11.2 25 25 25 58.7 0 167-21.7 186.1-9c16.3 10.9 22 17.6 24 23.3 1.3 4 5.2 6.7 9.4 6.7h136.6c6.4 0 11.2-5.9 9.6-12.1-4-15.6-32.9-76.4-106.4-114zM0 316v160c0 19.9 16.1 36 36 36h440c19.9 0 36-16.1 36-36V316H0zm256 16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16v-96c0-8.8 7.2-16 16-16zM64 348c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zm320-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16z"></path></svg>;

export default About;
