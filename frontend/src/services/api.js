import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api', // automatically resolves to production or local
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  async (config) => {
    let token = null;

    // Prefer live Firebase auth token; it auto-refreshes when needed.
    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken();

      // Keep local storage in sync for any legacy reads.
      const adminInfoRaw = localStorage.getItem('adminInfo');
      if (adminInfoRaw) {
        try {
          const adminInfo = JSON.parse(adminInfoRaw);
          localStorage.setItem('adminInfo', JSON.stringify({ ...adminInfo, token }));
        } catch {
          localStorage.setItem('adminInfo', JSON.stringify({ token }));
        }
      }
    }

    // Fallback to saved token when currentUser isn't immediately hydrated.
    if (!token) {
      const adminInfo = localStorage.getItem('adminInfo');
      if (adminInfo) {
        try {
          const parsed = JSON.parse(adminInfo);
          token = parsed?.token || null;
        } catch {
          token = null;
        }
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
