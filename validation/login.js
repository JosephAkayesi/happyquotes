const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = validateLoginInput = data => {
    let errors = {}

    data.usernameOrEmail = !isEmpty(data.usernameOrEmail) ? data.usernameOrEmail : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (validator.isEmpty(data.usernameOrEmail)) {
        errors.userNameOrEmail = 'No user was found with the username or password'
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email field is invalid'
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email field is invalid'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 