const mongoose = require('mongoose');

const frndrequestschema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('friendreq', frndrequestschema);
