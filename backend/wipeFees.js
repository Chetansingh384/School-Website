require('dotenv').config();
const admin = require('./config/firebase');

async function deleteFees() {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('fees').get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('Successfully deleted all fees from Firebase!');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting fees:', error);
    process.exit(1);
  }
}

deleteFees();
