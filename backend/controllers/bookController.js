const admin = require('../config/firebase');

const getDb = () => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }
  throw new Error("Firebase Admin SDK not initialized");
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection('books').orderBy('className', 'asc').get();
    const books = [];
    snapshot.forEach(doc => {
      books.push({ _id: doc.id, ...doc.data() });
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch books' });
  }
};

// @desc    Add a book
// @route   POST /api/books
// @access  Private
const addBook = async (req, res) => {
  try {
    const { className, subject, publisher, writer, price, isbn } = req.body;
    
    const db = getDb();
    const docRef = await db.collection('books').add({
      className,
      subject,
      publisher,
      writer: writer || '-',
      price: Number(price),
      isbn,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docSnapshot = await docRef.get();
    res.status(201).json({ _id: docSnapshot.id, ...docSnapshot.data() });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(400).json({ message: error.message || 'Failed to add book' });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { className, subject, publisher, writer, price, isbn } = req.body;
    
    const db = getDb();
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookRef.update({
      className: className || doc.data().className,
      subject: subject || doc.data().subject,
      publisher: publisher || doc.data().publisher,
      writer: writer || doc.data().writer,
      price: price ? Number(price) : doc.data().price,
      isbn: isbn || doc.data().isbn,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const updatedDoc = await bookRef.get();
    res.json({ _id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(400).json({ message: error.message || 'Failed to update book' });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await bookRef.delete();
    res.json({ message: 'Book removed' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: error.message || 'Failed to delete book' });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook
};
