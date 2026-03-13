import React from 'react';
import { FaQuoteLeft, FaSignature } from 'react-icons/fa';
import principalImg from '../assets/principal2.png';

const PrincipalMessage = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-20 pb-20 overflow-hidden relative">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-indigo-900 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl animate-fade-in-up">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mix-blend-multiply opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-500"></div>
                <img 
                  src={principalImg} 
                  alt="Principal" 
                  className="relative z-10 w-full h-full object-cover rounded-full border-8 border-gray-800 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {e.target.onerror = null; e.target.src="https://via.placeholder.com/400?text=Principal"}}
                />
                {/* Decorative orbital ring */}
                <div className="absolute -inset-4 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              </div>
              
              <div className="text-center mt-8 space-y-2">
                <h3 className="text-3xl font-black text-white">Vishnu Singh Chouhan</h3>
                <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">Principal</p>
              </div>
            </div>

            {/* Message Column */}
            <div className="lg:col-span-7 relative">
              <FaQuoteLeft className="absolute -top-10 -left-10 text-8xl text-white/5 z-0" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
                  A Message from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Principal</span>
                </h2>
                
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6 leading-relaxed font-light">
                  <p>Wishing you all a wonderful and productive year ahead, filled with opportunities for personal growth.</p>
                  <p>I hope you enjoyed your time off with family and friends and are returning to school feeling refreshed and ready to learn.</p>
                  <p>At Kalidas Children High School, our goal is to instill strong values, a caring attitude towards others, and a solid foundation of knowledge. We aspire to prepare each of you to become responsible individuals who can lead and make a positive impact in our community and beyond.</p>
                  <p>In today's world, safety is more important than ever. Here at our school, we prioritize your security and dedicated staff to ensure a safe learning environment. While some of these protocols may feel strict, they are all designed to keep you safe, and I appreciate your understanding and cooperation.</p>
                  <p>If you have any suggestions for improving safety or any other aspects of our school, please don't hesitate to reach out to me at my email: kalidaschildrenshighschool@gmail.com</p>
                  <p>Take care of yourselves and look out for one another. Wishing you all the best this school year!</p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
                  <FaSignature className="text-6xl text-blue-400 opacity-80" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalMessage;
