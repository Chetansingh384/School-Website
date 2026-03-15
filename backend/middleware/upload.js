const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists (Only needed locally)
const uploadDir = path.join(__dirname, '../uploads');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (error) {
  console.log('Skipping upload directory creation, likely on Vercel.');
}

const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  // Allow images and videos
  const filetypes = /jpg|jpeg|png|webp|gif|mp4|webm|mkv|mov|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only Images and Videos are allowed!');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
