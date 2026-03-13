const PrincipalMessage = require('../models/PrincipalMessage');

// @desc    Get principal message
// @route   GET /api/principal-message
// @access  Public
const getPrincipalMessage = async (req, res) => {
  try {
    const message = await PrincipalMessage.findOne();
    res.json(message || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update or Create principal message
// @route   PUT /api/principal-message
// @access  Private
const updatePrincipalMessage = async (req, res) => {
  try {
    const { message } = req.body;
    let messageDoc = await PrincipalMessage.findOne();

    if (!messageDoc) {
      messageDoc = new PrincipalMessage({ message });
    } else {
      messageDoc.message = message || messageDoc.message;
    }

    if (req.file) {
      messageDoc.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMessage = await messageDoc.save();
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPrincipalMessage,
  updatePrincipalMessage
};
