const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = validateQuoteInput = data => {
    let errors = {}

    data.author = !isEmpty(data.author) ? data.author : ''
    data.quote = !isEmpty(data.quote) ? data.quote : ''

    if (!validator.isLength(data.quote, { min: 3, max: 140 })){
        errors.quote = 'Quote must be between 3 and 140 characters'
    }

    if (validator.isEmpty(data.author)) {
        errors.author = 'Author field is required'
    }

    if (validator.isEmpty(data.quote)) {
        errors.quote = 'Quote field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 