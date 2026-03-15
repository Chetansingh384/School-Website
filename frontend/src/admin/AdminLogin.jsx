import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      
      // 2. Get the Firebase ID Token
      const token = await userCredential.user.getIdToken();
      
      // 3. Save to local storage for backward compatibility, but primarily rely on Firebase state
      localStorage.setItem('adminInfo', JSON.stringify({ 
        token, 
        uid: userCredential.user.uid,
        email: userCredential.user.email 
      }));
      
      navigate('/admin');
    } catch (err) {
      console.error("Firebase Login Error:", err);
      // Map common Firebase errors to user-friendly messages
      let errorMsg = 'Invalid credentials';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          errorMsg = 'Incorrect email or password.';
      } else if (err.code === 'auth/too-many-requests') {
          errorMsg = 'Too many failed login attempts. Please try again later.';
      } else if (err.message) {
          errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage the school website</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="admin@school.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-500">Secured Area. Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
