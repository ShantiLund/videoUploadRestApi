const mongoose = require('mongoose');
//Schema for video database.
const uploadVideo = mongoose.Schema({
    video: {
        type: String,
        required: true,
        trim: true
    }
    
});

module.exports = mongoose.model('UploadVideo', uploadVideo);