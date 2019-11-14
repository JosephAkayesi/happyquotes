class Middleware {
    constructor() {
        this.cors = require('cors')
        this.bodyParser = require('body-parser')
        this.helmet = require('helmet')
        this.passport = require('passport')
    }

    Cors(){
        return {
            initialize: this.cors()
        }
    }

    BodyParser() {
        return {
            initialize: {
                urlEncoded: this.bodyParser.urlencoded({ limit: '60mb', extended: false }),
                json: this.bodyParser.json({ limit: '60mb', extended: false })
            }
        }
    }

    Helmet() {
        return {
            initialize: this.helmet()
        }
    }

    Passport() {
        return {
            getVariable: this.passport,
            initialize: this.passport.initialize()
        }
    }
}

module.exports = new Middleware()