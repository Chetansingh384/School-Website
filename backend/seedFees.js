const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Fee = require('./models/Fee'); // Using the updated Fee model

dotenv.config();

const feeData = [
  { className: 'LKG', fee2425: 8490, fee2526: 9300 },
  { className: 'UKG', fee2425: 8775, fee2526: 9600 },
  { className: '1st', fee2425: 8936, fee2526: 9800 },
  { className: '2nd', fee2425: 9111, fee2526: 10000 },
  { className: '3rd', fee2425: 9298, fee2526: 10200 },
  { className: '4th', fee2425: 9476, fee2526: 10400 },
  { className: '5th', fee2425: 9742, fee2526: 10700 },
  { className: '6th', fee2425: 9918, fee2526: 10900 },
  { className: '7th', fee2425: 10095, fee2526: 11000 },
  { className: '8th', fee2425: 10272, fee2526: 11200 },
  { className: '9th', fee2425: 14520, fee2526: 15900 },
  { className: '10th', fee2425: 16265, fee2526: 17800 },
];

const connectDB = require('./config/db');

const seedFees = async () => {
  try {
    await connectDB();
    console.log('MongoDB connection SUCCESS');

    await Fee.deleteMany({});
    console.log('Cleared existing fees');

    await Fee.insertMany(feeData);
    console.log('Fee data import success');

    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

seedFees();
