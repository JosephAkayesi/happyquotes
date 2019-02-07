const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuoteSchema = new Schema({
    admin: { type: Schema.Types.ObjectId, ref: 'admins' },
    quote: { type: String, required: true },
    author: { type: String, required: true },
    dateAdded: { type: String, default: Date.now },
    lastModified: { type: String, default: Date.now }
})

module.exports = Quote = mongoose.model('quotes', QuoteSchema)

