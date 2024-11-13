const mongoose = require('mongoose');

const histSchema = new mongoose.Schema({
    inputs:[{
        type:String
    }],
    outputs:[{
        type:String
    }]
})