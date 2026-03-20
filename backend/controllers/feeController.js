const admin = require('../config/firebase');

const getCurrentAcademicYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startYear = month >= 3 ? year : year - 1;
  const endYear = (startYear + 1).toString().slice(-2);
  return `${startYear}-${endYear}`;
};

// Utility to get firestore db safely
const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized. Please add FIREBASE_SERVICE_ACCOUNT to .env");
};

// @desc    Get all fees
// @route   GET /api/fees
// @access  Public
const getFees = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('fees').orderBy('order', 'asc').get();
    const fees = [];
    snapshot.forEach(doc => {
      fees.push({ _id: doc.id, ...doc.data() });
    });
    res.json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch fees' });
  }
};

// @desc    Add a single fee row
// @route   POST /api/fees
// @access  Private
const addFee = async (req, res) => {
  try {
    const { className, year, feeAmount, fee2425, fee2526, order } = req.body;
    
    if (!className) {
      return res.status(400).json({ message: 'Class name is required' });
    }

    const normalizedFeeAmount = feeAmount ?? fee2526 ?? fee2425 ?? '0';

    const db = getDb();
    const feeDoc = await db.collection('fees').add({
      className,
      year: year || getCurrentAcademicYear(),
      feeAmount: normalizedFeeAmount,
      // Keep old fields in sync for backward compatibility
      fee2425: normalizedFeeAmount,
      fee2526: normalizedFeeAmount,
      order: Number(order) || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await feeDoc.get();
    
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error('Error adding fee:', error);
    res.status(500).json({ message: error.message || 'Failed to add fee record' });
  }
};

// @desc    Update a fee row
// @route   PUT /api/fees/:id
// @access  Private
const updateFee = async (req, res) => {
  try {
    const { className, year, feeAmount, fee2425, fee2526, order } = req.body;
    const { id } = req.params;

    const db = getDb();
    const feeRef = db.collection('fees').doc(id);
    
    const doc = await feeRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Fee record not found' });
    }

    const existing = doc.data();
    const resolvedFeeAmount = feeAmount ?? fee2526 ?? fee2425 ?? existing.feeAmount ?? existing.fee2526 ?? existing.fee2425 ?? '0';

    await feeRef.update({
      className: className || existing.className,
      year: year || existing.year || getCurrentAcademicYear(),
      feeAmount: resolvedFeeAmount,
      // Keep old fields in sync for backward compatibility
      fee2425: resolvedFeeAmount,
      fee2526: resolvedFeeAmount,
      order: order !== undefined ? Number(order) : (existing.order || 0),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const updatedDoc = await feeRef.get();
    res.json({ _id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to update fee record' });
  }
};

// @desc    Delete a fee row
// @route   DELETE /api/fees/:id
// @access  Private
const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    
    await db.collection('fees').doc(id).delete();
    
    res.json({ message: 'Fee record removed' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete fee record' });
  }
};

module.exports = {
  getFees,
  addFee,
  updateFee,
  deleteFee
};
