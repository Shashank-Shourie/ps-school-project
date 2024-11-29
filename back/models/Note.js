const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true
    },
    text:{
        type:String
    }
});

module.exports = mongoose.model('Note', NoteSchema);
