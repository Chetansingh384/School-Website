const admin = require('../config/firebase');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // If Firebase Admin isn't initialized (missing credentials), bypass for dev (or fail secure in prod)
      if (!admin.apps.length) {
         console.warn("Firebase Admin SDK not initialized: Bypassing auth check for development.");
         // In a real app, you might want to return 401 here if strict security is needed
         req.adminId = "dev-bypassed-admin";
         return next();
      }

      const decodedToken = await admin.auth().verifyIdToken(token);
      req.adminId = decodedToken.uid;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
