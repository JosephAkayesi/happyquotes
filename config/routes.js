class Routes {
    constructor() {
        this.admins = require('../routes/api/admins')
        this.quotes = require('../routes/api/quotes')
    }

    Admin() {
        return {
            use: this.admins
        }
    }

    Quote() {
        return {
            use: this.quotes
        }
    }
}

module.exports = new Routes()