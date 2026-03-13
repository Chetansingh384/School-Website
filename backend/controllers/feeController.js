const Fee = require('../models/Fee');

// @desc    Get all fees
// @route   GET /api/fees
// @access  Public
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a fee structure
// @route   POST /api/fees
// @access  Private
const addFee = async (req, res) => {
  try {
    const { className, fee2425, fee2526 } = req.body;

    const newFee = await Fee.create({
      className,
      fee2425,
      fee2526
    });

    res.status(201).json(newFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a fee structure
// @route   PUT /api/fees/:id
// @access  Private
const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({ message: 'Fee not found' });
    }

    const { className, fee2425, fee2526 } = req.body;

    fee.className = className || fee.className;
    fee.fee2425 = fee2425 || fee.fee2425;
    fee.fee2526 = fee2526 || fee.fee2526;

    const updatedFee = await fee.save();
    res.json(updatedFee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a fee structure
// @route   DELETE /api/fees/:id
// @access  Private
const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({ message: 'Fee not found' });
    }

    await fee.deleteOne();
    res.json({ message: 'Fee removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFees,
  addFee,
  updateFee,
  deleteFee
};
