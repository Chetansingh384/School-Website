const cloudinary = require('cloudinary').v2;

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD ||
  '';

const apiKey =
  process.env.CLOUDINARY_API_KEY ||
  process.env.CLOUDINARY_KEY ||
  '';

const apiSecret =
  process.env.CLOUDINARY_API_SECRET ||
  process.env.CLOUDINARY_SECRET ||
  '';

const cloudinaryUrl = process.env.CLOUDINARY_URL || '';

cloudinary.config(
  cloudinaryUrl
    ? { secure: true, cloudinary_url: cloudinaryUrl }
    : {
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      }
);

if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
  console.warn('Cloudinary is not fully configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.');
}

module.exports = cloudinary;
