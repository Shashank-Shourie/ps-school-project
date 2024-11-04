const mongoose = require('mongoose');
const Blog = require('./models/Post'); 
const connectDB = require('./config/db');

async function updateTags() {
    try {
        connectDB();
        const result = await Blog.updateMany(
            { tags: { $size: 0 } }, 
            { $set: { 'tags.0': '#default' } } 
        );
        console.log(`${result.modifiedCount} blog(s) updated with default tags.`);
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error updating tags:', error);
    }
}
updateTags();