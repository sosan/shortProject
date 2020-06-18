const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shortSchema = new Schema({
    url: String,
    shortCode: String,
    creationDate: { type: Date, default: Date.now },
    clicks: [
        {
            country: String,
            sO: String,
            browser: String,
            clickDate: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('short', shortSchema)