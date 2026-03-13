const admin = require('firebase-admin');

// TODO: Replace this with the path to your downloaded Firebase Service Account key JSON file
// or use environment variables depending on your hosting provider
// For now, we will use a placeholder or check if the env var exists
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null; // Fallback if not provided yet

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK initialized successfully');
} else {
  console.warn('⚠️ Firebase Admin SDK not initialized: Missing service account credentials. Provide it in .env as FIREBASE_SERVICE_ACCOUNT');
}

module.exports = admin;
