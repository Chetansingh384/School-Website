import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api', // automatically resolves to production or local
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  async (config) => {
    let token = null;

    // Ensure Firebase restores persisted session before we decide token source.
    if (typeof auth.authStateReady === 'function') {
      await auth.authStateReady();
    }

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

// Retry once with a force-refreshed token when backend rejects with token failure.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error?.response?.data?.message || '';
    const isAuthFailure = error?.response?.status === 401 && /token failed|not authorized/i.test(message);

    if (isAuthFailure && originalRequest && !originalRequest._retry && auth.currentUser) {
      originalRequest._retry = true;
      try {
        const freshToken = await auth.currentUser.getIdToken(true);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${freshToken}`;

        const adminInfoRaw = localStorage.getItem('adminInfo');
        if (adminInfoRaw) {
          try {
            const adminInfo = JSON.parse(adminInfoRaw);
            localStorage.setItem('adminInfo', JSON.stringify({ ...adminInfo, token: freshToken }));
          } catch {
            localStorage.setItem('adminInfo', JSON.stringify({ token: freshToken }));
          }
        }

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
