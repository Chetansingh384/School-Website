import React, { useState } from 'react';
import { FaChalkboardTeacher, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import next_icon from '../assets/next-icon.png';
import back_icon from '../assets/back-icon.png';
import faculty1 from '../assets/faculty1.jpeg';
import faculty2 from '../assets/faculty2.jpeg';
import faculty3 from '../assets/faculty3.jpeg';
import faculty4 from '../assets/faculty4.jpeg';

const facultyMembers = [
  {
    name: "Dr. John Doe",
    role: "Mathematics Department",
    bio: "Dr. John Doe has over 10 years of experience in teaching Mathematics. He is known for his engaging teaching style and dedication to student success.",
    image: faculty1,
    color: "from-blue-500 to-indigo-600"
  },
  {
    name: "Prof. Jane Smith",
    role: "Science Department",
    bio: "Prof. Jane Smith specializes in Physics and has published several research papers in reputed journals. She is passionate about inspiring young minds.",
    image: faculty2,
    color: "from-purple-500 to-pink-600"
  },
  {
    name: "Mr. Alan Brown",
    role: "History Department",
    bio: "Mr. Alan Brown is a dedicated History teacher with a knack for making history come alive through storytelling and real-world connections.",
    image: faculty3,
    color: "from-emerald-400 to-teal-500"
  },
  {
    name: "Ms. Emily White",
    role: "Language Arts Department",
    bio: "Ms. Emily White has a passion for literature and writing, encouraging her students to express themselves creatively and critically.",
    image: faculty4,
    color: "from-orange-400 to-red-500"
  }
];

const Faculty = () => {
  const [tx, setTx] = useState(0);

  const slideForward = () => {
    if (tx > -50) {
      setTx(prev => prev - 25);
    }
  };

  const slideBackward = () => {
    if (tx < 0) {
      setTx(prev => prev + 25);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Modern Header */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-gray-900 border-b-4 border-amber-500">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-500/20 to-transparent blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-400/30 bg-blue-500/20 backdrop-blur-md mb-6 shadow-xl">
            <FaAward className="text-yellow-400" /> <span className="text-blue-100 font-bold tracking-widest uppercase text-sm">Award Winning Educators</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Faculty</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            The brilliant minds and passionate educators dedicated to shaping the future of our students.
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative my-20 mx-auto px-10 md:px-20 max-w-7xl">
        <img 
          src={next_icon} 
          alt="Next" 
          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-5 p-3 md:p-4 w-[40px] md:w-[50px] bg-[#219aa0] rounded-full cursor-pointer border-none z-10 hover:bg-[#1a7f84] transition shadow-lg" 
          onClick={slideForward} 
        />
        <img 
          src={back_icon} 
          alt="Back" 
          className="absolute top-1/2 -translate-y-1/2 left-2 md:left-5 p-3 md:p-4 w-[40px] md:w-[50px] bg-[#219aa0] rounded-full cursor-pointer border-none z-10 hover:bg-[#1a7f84] transition shadow-lg" 
          onClick={slideBackward} 
        />
        
        <div className="overflow-hidden">
          <ul className="flex w-[200%] transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${tx}%)` }}>
            {facultyMembers.map((member, idx) => (
              <li key={idx} className="list-none w-1/4 p-2 md:p-5">
                <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.05)] p-5 md:p-10 rounded-2xl text-[#676767] leading-relaxed h-full border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-5 md:mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full mb-3 sm:mb-0 sm:mr-4 border-4 border-[#219aa0] object-cover" 
                    />
                    <div>
                      <h3 className="text-[#219aa0] text-lg md:text-xl font-bold">{member.name}</h3>
                      <span className="text-gray-500 text-xs md:text-sm font-semibold uppercase">{member.role}</span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base">
                    {member.bio}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Join the Team CTA */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FaChalkboardTeacher className="text-6xl text-blue-300 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Passionate About Teaching?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            We are always looking for exceptional educators to join our renowned faculty and help shape the next generation.
          </p>
          <Link to="/contact" className="inline-block px-10 py-5 bg-white text-blue-900 font-black rounded-full uppercase tracking-widest hover:bg-transparent hover:text-white hover:border-white border-2 border-white transition-all duration-300 shadow-xl">
            Careers at SmartSchool
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Faculty;
