const mongoose = require('mongoose');
const History = require('./models/History');
const connectDB = require('./config/db');

async function insertHist() {
    try {
        await connectDB();

        const result = await History.create({
            by:new mongoose.Types.ObjectId('670b417a315e569c4709c3b4')
        });
        console.log(`Object Created:`, result);
    } catch (error) {
        console.error('Error inserting history:', error);
    } finally{
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

insertHist();
