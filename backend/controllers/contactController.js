const admin = require('../config/firebase');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get contact info
// @route   GET /api/contact
// @access  Public
const getContactInfo = async (req, res) => {
  try {
    const db = getDb();
    // Use a single document ID for site contact info
    const contactRef = db.collection('settings').doc('contactInfo');
    const doc = await contactRef.get();
    
    if (doc.exists) {
      res.json(doc.data());
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update or create contact info
// @route   PUT /api/contact
// @access  Private
const updateContactInfo = async (req, res) => {
  try {
    const { address, phone, email, googleMapUrl } = req.body;
    const db = getDb();
    const contactRef = db.collection('settings').doc('contactInfo');
    const doc = await contactRef.get();

    const updateData = {};
    if (address !== undefined) updateData.address = address;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (googleMapUrl !== undefined) updateData.googleMapUrl = googleMapUrl;

    if (!doc.exists) {
      updateData.createdAt = admin.firestore.FieldValue.serverTimestamp();
      await contactRef.set(updateData);
    } else {
      updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await contactRef.update(updateData);
    }

    const updatedDoc = await contactRef.get();
    res.json(updatedDoc.data());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContactInfo,
  updateContactInfo
};
