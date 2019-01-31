const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuoteSchema = new Schema({
    // admin: { type: Schema.Types.ObjectId, ref: 'admins' },
    quotes: { type: String, required: true },
    author: { type: String, required: true }
})

module.exports = Quote = mongoose.model('quotes', QuoteSchema)

