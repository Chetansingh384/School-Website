const Contact = require('../models/Contact');

// @desc    Get contact info
// @route   GET /api/contacts
// @access  Public
const getContactInfo = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update or create contact info
// @route   PUT /api/contacts
// @access  Private
const updateContactInfo = async (req, res) => {
  try {
    const { address, phone, email, googleMapUrl } = req.body;
    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact({ address, phone, email, googleMapUrl });
    } else {
      contact.address = address || contact.address;
      contact.phone = phone || contact.phone;
      contact.email = email || contact.email;
      contact.googleMapUrl = googleMapUrl !== undefined ? googleMapUrl : contact.googleMapUrl;
    }

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContactInfo,
  updateContactInfo
};
