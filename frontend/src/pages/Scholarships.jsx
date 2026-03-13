import React from 'react';
import { FaGraduationCap, FaHandsHelping, FaFileSignature, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Scholarships = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-300 text-gray-900 dark:text-gray-200">
      
      <div className="relative pt-32 pb-24 overflow-hidden border-b border-indigo-500/30 bg-slate-900 dark:bg-slate-950 transition-colors duration-300">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="inline-flex p-4 rounded-full bg-indigo-900/50 border border-indigo-500/50 mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <FaHandsHelping className="text-4xl text-indigo-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Aid & Scholarships</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            We believe that financial barriers should never stand in the way of exceptional talent and boundless potential.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        
        {/* Intro Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { 
              icon: <FaGraduationCap />, 
              title: "Merit-Based", 
              desc: "Awarded to students demonstrating outstanding academic achievement and exceptional standardized test scores.",
              color: "from-blue-500 to-indigo-600"
            },
            { 
              icon: <FaHandsHelping />, 
              title: "Need-Based", 
              desc: "Comprehensive financial assistance packages designed to support families facing economic hardships.",
              color: "from-emerald-500 to-teal-600"
            },
            { 
              icon: <FaFileSignature />, 
              title: "Talent Grants", 
              desc: "Specialized scholarships for students excelling in athletics, performing arts, or technological innovation.",
              color: "from-purple-500 to-pink-600"
            }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/80 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Requirements & Process */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/80 border border-indigo-500/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">Application <span className="text-indigo-400">Process</span></h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Applying for a scholarship at SmartSchool is a straightforward process designed to identify your unique strengths and needs.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Submit the standard admission application.",
                  "Complete the Financial Aid Supplement form.",
                  "Provide the last two years of tax returns (for need-based).",
                  "Submit two letters of recommendation from former educators."
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 flex items-center justify-center font-bold mr-4 mt-1">
                      {idx + 1}
                    </div>
                    <span className="text-slate-200 text-lg">{step}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex gap-4">
                <Link to="/contact" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  Contact Financial Aid
                </Link>
                <Link to="/fees" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full transition-colors border border-slate-700">
                  Return to Fees
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl transform rotate-3 opacity-50 blur-sm"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students studying" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-slate-800 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scholarships;
