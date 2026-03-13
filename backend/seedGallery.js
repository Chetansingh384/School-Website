const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Gallery = require('./models/Gallery');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');

dotenv.config();

const seedImages = async () => {
    try {
        await connectDB();
        
        // Clear existing gallery (optional, based on preference, I'll just add to it or clear it if it makes sense)
        // Let's clear it so we have a clean state of only the uploaded campus images
        await Gallery.deleteMany({});
        console.log('Cleared existing gallery images');

        const uploadsDir = path.join(__dirname, 'uploads');
        const files = fs.readdirSync(uploadsDir);
        
        const galleryItems = [];

        // Categories allowed: ['Sports', 'Events', 'Class Activities', 'Annual Day', 'Other']
        for (const file of files) {
            // Check if it's one of the images we just copied
            if (file.startsWith('campus') || file.startsWith('gallery-')) {
                // Determine a random or sequential category for variety
                const categories = ['Sports', 'Events', 'Class Activities', 'Annual Day', 'Other'];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                
                let desc = 'Campus Image';
                if (file.startsWith('gallery-')) desc = 'Gallery Highlight';
                else if (file.includes('campus10') || file.includes('campus20')) desc = 'Campus Event';

                galleryItems.push({
                    imageUrl: `/uploads/${file}`,
                    category: randomCategory,
                    description: desc
                });
            }
        }

        if (galleryItems.length > 0) {
            await Gallery.insertMany(galleryItems);
            console.log(`Successfully inserted ${galleryItems.length} images into the gallery`);
        } else {
            console.log('No matching images found in uploads directory');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding data: ', error);
        process.exit(1);
    }
}

seedImages();
