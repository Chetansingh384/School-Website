import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data } = await api.get('/contact');
        if (data) setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending email
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Your message has been sent successfully! Our team will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSending(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-slate-900 border-b-4 border-sky-500">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle fill="white" cx="2" cy="2" r="2"></circle>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center animate-fade-in-up">
          <FaPaperPlane className="text-5xl text-sky-400 mx-auto mb-6 transform -rotate-12" />
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-widest drop-shadow-lg">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            We are always listening. Reach out for admissions, inquiries, or just to say hello!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-5 gap-0 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 bg-white">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-12 relative overflow-hidden">
            {/* Decorative background vectors */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="100" cy="100" r="99.5" stroke="white"/>
                 <circle cx="100" cy="100" r="79.5" stroke="white"/>
                 <circle cx="100" cy="100" r="59.5" stroke="white"/>
                 <circle cx="100" cy="100" r="39.5" stroke="white"/>
               </svg>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2 text-white">Contact Information</h2>
                <p className="text-indigo-200 font-light mb-12">Fill up the form and our team will get back to you within 24 hours.</p>

                <div className="space-y-10">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors duration-300 shadow-md">
                      <FaMapMarkerAlt className="text-sky-300 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-sm">Address</h4>
                      <p className="text-indigo-100 font-light leading-relaxed">
                        {contactInfo?.address || 'Khedi Road, Alot Dist. Ratlam, Madhya Pradesh, India'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors duration-300 shadow-md">
                      <FaPhoneAlt className="text-sky-300 group-hover:text-white transition-colors" size={18} />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-sm">Phone</h4>
                      <p className="text-indigo-100 font-light leading-relaxed">
                        {contactInfo?.phone || '+91 9977166947'}<br/>
                        <span className="text-xs text-indigo-300">Mon-Fri 8am to 5pm</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors duration-300 shadow-md">
                      <FaEnvelope className="text-sky-300 group-hover:text-white transition-colors" size={18} />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-white font-bold mb-1 tracking-wider uppercase text-sm">Email</h4>
                      <p className="text-indigo-100 font-light leading-relaxed">
                        {contactInfo?.email || 'kalidaschildrenshighschool@gmail.com'}<br/>
                        <span className="text-xs text-indigo-300">Online support 24/7</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-indigo-800/50">
                <p className="text-sm text-indigo-300 font-medium">Follow us on social media for live updates!</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 p-12 lg:p-16 bg-white relative">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Send us a Message</h2>
            
            {status.message && (
              <div className={`p-4 mb-8 text-sm font-bold uppercase tracking-wider rounded-xl ${
                status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full border-b-2 border-gray-200 bg-transparent py-2.5 outline-none focus:border-indigo-600 transition-colors font-medium text-gray-900 placeholder-transparent"
                    placeholder="Your Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 font-bold uppercase tracking-wider">
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full border-b-2 border-gray-200 bg-transparent py-2.5 outline-none focus:border-indigo-600 transition-colors font-medium text-gray-900 placeholder-transparent"
                    placeholder="Your Email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 font-bold uppercase tracking-wider">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  name="subject" 
                  id="subject"
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-gray-200 bg-transparent py-2.5 outline-none focus:border-indigo-600 transition-colors font-medium text-gray-900 placeholder-transparent"
                  placeholder="Subject"
                />
                <label htmlFor="subject" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 font-bold uppercase tracking-wider">
                  Subject
                </label>
              </div>

              <div className="relative group pt-4">
                <textarea 
                  name="message" 
                  id="message"
                  required 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-gray-200 bg-transparent py-2.5 outline-none focus:border-indigo-600 transition-colors font-medium text-gray-900 placeholder-transparent resize-none"
                  placeholder="Message"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigo-600 font-bold uppercase tracking-wider">
                  Your Message
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={sending}
                  className="relative overflow-hidden group bg-indigo-600 text-white font-bold py-4 px-12 rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center">
                    {sending ? 'Sending...' : 'Send Message'} <FaPaperPlane className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  {!sending && <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-sky-500 z-0"></div>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
