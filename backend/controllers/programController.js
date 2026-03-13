const Program = require('../models/Program');

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a program
// @route   POST /api/programs
// @access  Private
const addProgram = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newProgram = await Program.create({
      title,
      description,
      imageUrl
    });

    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a program
// @route   PUT /api/programs/:id
// @access  Private
const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const { title, description } = req.body;
    let imageUrl = program.imageUrl;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    program.title = title || program.title;
    program.description = description || program.description;
    program.imageUrl = imageUrl;

    const updatedProgram = await program.save();
    res.json(updatedProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
// @access  Private
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    await program.deleteOne();
    res.json({ message: 'Program removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPrograms,
  addProgram,
  updateProgram,
  deleteProgram
};
