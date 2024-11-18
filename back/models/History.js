const mongoose = require('mongoose');

const histSchema = new mongoose.Schema({
    inputs: [{
        type: String,
        default:[]
    }],
    outputs: [{
        type: String,
        default:[]
    }],
    name: {
        type: String,
        required: true,
        default: "New Chat"
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chatId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString()
    },
}, { timestamps: true });

module.exports = mongoose.model('History', histSchema);
