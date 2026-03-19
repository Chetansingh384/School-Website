import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const FeeStructure = () => {
  const fees = [
    { className: 'Nursery', fee2627: 9300 },
    { className: 'LKG', fee2627: 9300 },
    { className: 'UKG', fee2627: 9600 },
    { className: '1st', fee2627: 9800 },
    { className: '2nd', fee2627: 10000 },
    { className: '3rd', fee2627: 10200 },
    { className: '4th', fee2627: 10400 },
    { className: '5th', fee2627: 10700 },
    { className: '6th', fee2627: 10900 },
    { className: '7th', fee2627: 11000 },
    { className: '8th', fee2627: 11200 },
    { className: '9th', fee2627: 16000 },
    { className: '10th', fee2627: 17800 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen text-gray-900 dark:text-gray-200 selection:bg-cyan-500/30 font-sans transition-colors duration-300">
      
      {/* Extreme Header Design */}
      <div className="relative pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 z-0 bg-gray-950">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px] animate-pulse-slow object-cover" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold tracking-widest uppercase text-sm mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <FaShieldAlt /> Transparent Investment
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">Tuition Table</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-6">
            Invest in a world-class education. Below is our comprehensive tuition structure.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20">
        


        {/* Dynamic Table Section matching the provided screenshot design */}
        <div className="relative rounded-2xl bg-slate-900/90 border border-blue-400/25 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-6 max-w-5xl mx-auto mt-10 transition-colors duration-300 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center mb-6 mt-2 text-white tracking-tight">Fee Details (2026–27)</h2>

          <div className="overflow-x-auto w-full border border-blue-400/30 rounded-lg bg-slate-950/60">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
                  <th className="py-4 px-4 font-bold border-r border-blue-500/70 w-1/2 text-[15px]">Class</th>
                  <th className="py-4 px-4 font-bold w-1/2 text-[15px]">2026–27 (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-300/10">
                {fees.map((fee, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-900/60 hover:bg-blue-900/30' : 'bg-slate-800/60 hover:bg-blue-900/25'}>
                    <td className="py-3 px-4 text-sm border-r border-blue-300/15 font-medium text-blue-100">{fee.className}</td>
                    <td className="py-3 px-4 text-sm text-slate-100">{fee.fee2627}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center max-w-5xl mx-auto">
          <p className="text-gray-500 text-[15px] font-normal">
            * Note: Additional one-time admission fee and transport fees may apply based on locality and availability.
          </p>
        </div>

      </div>
    </div>
  );
};

export default FeeStructure;
